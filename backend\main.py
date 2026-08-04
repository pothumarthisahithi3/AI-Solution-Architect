from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
import os

from database import engine, Base, get_db
import models
import schemas
from services.gemini_service import analyze_project_with_gemini
from config import GEMINI_API_KEY

# Create DB tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI Solution Architect API",
    description="Backend API powered by FastAPI, SQLite, and Google Gemini AI for generating enterprise software architecture recommendations.",
    version="1.0.0"
)

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows local Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "gemini_api_configured": bool(GEMINI_API_KEY),
        "database": "SQLite connected"
    }

@app.post("/api/architect/analyze", response_model=schemas.ArchitectureResponse)
def analyze_project(request: schemas.ProjectRequest, db: Session = Depends(get_db)):
    """
    Analyzes project requirements using Google Gemini AI (or mock engine fallback)
    and saves the generated architecture report into the SQLite database.
    """
    try:
        # Generate Architecture Recommendation via AI
        architecture_result = analyze_project_with_gemini(
            project_name=request.project_name,
            description=request.description,
            domain=request.domain,
            expected_users=request.expected_users,
            budget=request.budget,
            required_features=request.required_features,
            preferred_cloud=request.preferred_cloud or "Any",
            security_requirements=request.security_requirements or "Standard"
        )

        # Save to Database
        db_project = models.ProjectArchitecture(
            project_name=request.project_name,
            description=request.description,
            domain=request.domain,
            expected_users=request.expected_users,
            budget=request.budget,
            required_features=", ".join(request.required_features) if isinstance(request.required_features, list) else str(request.required_features),
            architecture_data=architecture_result
        )
        db.add(db_project)
        db.commit()
        db.refresh(db_project)

        # Attach database ID to returned JSON
        architecture_result["id"] = db_project.id
        return architecture_result

    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error generating architecture analysis: {str(e)}"
        )

@app.get("/api/architect/projects", response_model=List[schemas.SaveProjectResponse])
def get_saved_projects(db: Session = Depends(get_db)):
    """
    Retrieves all saved architecture recommendations from SQLite database.
    """
    projects = db.query(models.ProjectArchitecture).order_by(models.ProjectArchitecture.created_at.desc()).all()
    return [
        {
            "id": p.id,
            "project_name": p.project_name,
            "domain": p.domain,
            "expected_users": p.expected_users,
            "created_at": p.created_at,
            "architecture_data": p.architecture_data
        }
        for p in projects
    ]

@app.get("/api/architect/projects/{project_id}", response_model=schemas.SaveProjectResponse)
def get_project_by_id(project_id: int, db: Session = Depends(get_db)):
    """
    Retrieves a single project architecture by ID.
    """
    project = db.query(models.ProjectArchitecture).filter(models.ProjectArchitecture.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project architecture not found")
    return {
        "id": project.id,
        "project_name": project.project_name,
        "domain": project.domain,
        "expected_users": project.expected_users,
        "created_at": project.created_at,
        "architecture_data": project.architecture_data
    }

@app.delete("/api/architect/projects/{project_id}")
def delete_project(project_id: int, db: Session = Depends(get_db)):
    """
    Deletes a saved project architecture by ID.
    """
    project = db.query(models.ProjectArchitecture).filter(models.ProjectArchitecture.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project architecture not found")
    db.delete(project)
    db.commit()
    return {"message": "Project architecture deleted successfully"}

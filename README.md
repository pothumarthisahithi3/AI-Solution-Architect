# AI Solution Architect 🚀

**AI Solution Architect** is a mini full-stack web application designed to help developers, project managers, and students synthesize optimal software technology stacks and enterprise system architectures using **Google Gemini AI**.

---

## 🌟 Key Features

- 📝 **Interactive Requirement Form**: Capture domain, user scale, budget tier, feature requirements, cloud preferences, and security compliance rules.
- 🧠 **Google Gemini AI Analysis**: Automatic architectural synthesis producing:
  - Software Architecture Pattern (e.g. Microservices, Clean Monolith, Serverless)
  - Frontend & Backend Stack recommendations with technical justifications
  - Database persistence & caching strategy
  - Authentication method (OAuth2 / JWT / OIDC)
  - Cloud deployment strategy
  - Interactive System Topology Flowchart (Mermaid)
  - Phased Execution Timeline Roadmap
  - Severity-rated Risk Assessment Matrix
- 💾 **SQLite History Persistence**: Automatic storage of generated blueprints using FastAPI & SQLAlchemy.
- 📊 **Executive Dashboard**: Clean multi-tab dashboard with interactive filters.
- 📤 **Export Capabilities**: Export blueprints as Markdown, raw JSON, or print-ready PDF reports.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React.js (Vite)
- **Styling**: Tailwind CSS + Custom Glassmorphism Theme
- **HTTP Client**: Axios
- **Diagrams**: Mermaid.js
- **Icons**: Lucide React

### Backend
- **Framework**: FastAPI (Python)
- **AI Integration**: Google Gemini API (`google-genai` SDK) with local heuristic fallback
- **Database**: SQLite (SQLAlchemy ORM)
- **Server**: Uvicorn

---

## 🚀 Quick Start Guide

### 1. Backend Setup (FastAPI)

```bash
cd backend
python -m venv venv
# Windows:
venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
```

*(Optional)* Create `.env` file in `backend/`:
```env
GEMINI_API_KEY=your_google_gemini_api_key_here
```

Start the FastAPI backend server:
```bash
uvicorn main:app --reload --port 8000
```
Backend API will be running at: `http://localhost:8000` (API Docs at `http://localhost:8000/docs`).

---

### 2. Frontend Setup (React + Vite)

```bash
cd frontend
npm install
npm run dev
```
Frontend will be running at: `http://localhost:5173`.

---

## 📁 Project Structure

```
ai_solution_architect/
├── backend/
│   ├── main.py               # FastAPI routes & endpoints
│   ├── config.py             # Settings & Gemini API key configuration
│   ├── database.py           # SQLite connection & session management
│   ├── models.py             # SQLAlchemy ORM models
│   ├── schemas.py            # Pydantic v2 schemas
│   ├── services/
│   │   ├── gemini_service.py # Gemini AI analysis & prompt engineering
│   │   └── mock_service.py   # Heuristic fallback generator
│   └── requirements.txt      # Python dependencies
└── frontend/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    └── src/
        ├── App.jsx
        ├── components/        # Navbar, Footer, TechStackBadge, Diagrams, Timeline, RiskMatrix
        ├── pages/             # Home, Form, Dashboard, SavedProjects, About
        └── services/          # Axios API client
```

---

## 🎓 College Project Presentation Highlights
1. Clean separation of concerns (React Frontend, FastAPI REST API, SQLite ORM).
2. Robust AI integration featuring fallback resilience.
3. Industry-standard software design methodology presentation.

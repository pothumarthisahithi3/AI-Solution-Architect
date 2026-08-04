from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime

class ProjectRequest(BaseModel):
    project_name: str = Field(..., example="FinTech Global Wallet")
    description: str = Field(..., example="A high-performance digital wallet app supporting instant P2P payments and multi-currency exchange.")
    domain: str = Field(..., example="FinTech & Banking")
    expected_users: str = Field(..., example="100k - 1M users")
    budget: str = Field(..., example="Mid-scale ($50k - $250k)")
    required_features: List[str] = Field(..., example=["Real-time transactions", "Multi-currency wallet", "OAuth2 & Biometrics", "Push Notifications"])
    preferred_cloud: Optional[str] = Field(default="Any", example="AWS")
    security_requirements: Optional[str] = Field(default="High compliance (PCI-DSS, GDPR)", example="PCI-DSS compliance")

class TechItem(BaseModel):
    name: str
    category: str
    description: str
    reasons: List[str]

class TimelinePhase(BaseModel):
    phase: str
    duration: str
    milestones: List[str]

class RiskItem(BaseModel):
    risk: str
    impact: str  # High, Medium, Low
    probability: str  # High, Medium, Low
    mitigation: str

class ArchitectureResponse(BaseModel):
    summary: str
    architecture_style: str
    frontend: TechItem
    backend: TechItem
    database: TechItem
    authentication: TechItem
    deployment: TechItem
    justifications: List[Dict[str, str]]
    timeline: List[TimelinePhase]
    risk_analysis: List[RiskItem]
    diagram_mermaid: str
    ai_generated: bool

class SaveProjectResponse(BaseModel):
    id: int
    project_name: str
    domain: str
    expected_users: str
    created_at: datetime
    architecture_data: Dict[str, Any]

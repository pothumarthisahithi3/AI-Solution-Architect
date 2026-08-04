from sqlalchemy import Column, Integer, String, Text, DateTime, JSON
from datetime import datetime
from database import Base

class ProjectArchitecture(Base):
    __tablename__ = "project_architectures"

    id = Column(Integer, primary_key=True, index=True)
    project_name = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    domain = Column(String(100), nullable=False)
    expected_users = Column(String(100), nullable=False)
    budget = Column(String(100), nullable=False)
    required_features = Column(Text, nullable=False)
    
    # Store complete AI recommendation output as JSON
    architecture_data = Column(JSON, nullable=False)
    
    created_at = Column(DateTime, default=datetime.utcnow)

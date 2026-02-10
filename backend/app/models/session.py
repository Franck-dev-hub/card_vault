from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime
from .database import Base

# Define session cookie
class Session(Base):
    __tablename__ = "sessions"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, unique=True)
    token = Column(String, unique=True, index=True)
    created_at = Column(DateTime, default=datetime.now)
    expires_at = Column(DateTime, index=True)
    ip_address = Column(String, nullable=True)
    user_agent = Column(String, nullable=True)

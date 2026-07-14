import uuid
from datetime import datetime
from sqlalchemy import Column, UUID, String, DateTime
from app.services.database.postgres.postgres import Base
from sqlalchemy.orm import relationship


# Define user table
class User(Base):
    __tablename__ = "users"
    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        nullable=False,
    )
    email = Column(String, unique=True, nullable=False)
    username = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)

    # Relation
    collections = relationship("Collection", back_populates="user")

from datetime import datetime
import uuid
from sqlalchemy import Column, String, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.services.database.postgres.postgres import Base

class Card(Base):
    __tablename__ = "cards"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    card_id = Column(String, unique=True, index=True, nullable=False)
    variant = Column(String, index=True, nullable=False)
    #condition = Column(String, nullable=False)
    added_at = Column( DateTime, default=datetime.now, nullable=False)

    # Relation
    collections = relationship("Collection", back_populates="card")

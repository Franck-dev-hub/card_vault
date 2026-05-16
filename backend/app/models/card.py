from datetime import datetime
import uuid
from sqlalchemy import Column, String, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.services.database.postgres.postgres import Base


class Card(Base):
    __tablename__ = "cards"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    card_id = Column(String, unique=True, index=True, nullable=False)  # External card ID (e.g. "pokemon-base1-1")
    variant = Column(String, nullable=False)
    card_image = Column(String, nullable=True)  # Full image URL stored at insert time
    extension_id = Column(String, nullable=True)  # Extension code (e.g. "base1", "lea")
    card_number = Column(String, nullable=True)  # Card number within the extension
    card_name = Column(String, nullable=True)  # Card name stored at insert time
    added_at = Column(DateTime, default=datetime.now, nullable=False)

    # Relationships
    collections = relationship("Collection", back_populates="card")

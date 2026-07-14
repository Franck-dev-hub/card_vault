from datetime import datetime
import uuid
from sqlalchemy import Column, Integer, DateTime, ForeignKey, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.services.database.postgres.postgres import Base


class Collection(Base):
    __tablename__ = "collections"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(
        UUID(as_uuid=True), ForeignKey("users.id"), nullable=False
    )
    card_id = Column(
        UUID(as_uuid=True), ForeignKey("cards.id"), nullable=False
    )
    variant = Column(String, nullable=False)
    quantity = Column(Integer, nullable=False, default=1)
    updated_at = Column(
        DateTime, default=datetime.now, onupdate=datetime.now, nullable=False
    )

    # Relations
    user = relationship("User", back_populates="collections")
    card = relationship("Card", back_populates="collections")

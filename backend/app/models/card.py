from datetime import datetime
import uuid
from sqlalchemy import String, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.collections import Collection
from app.services.database.postgres.postgres import Base


class Card(Base):
    __tablename__ = "cards"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    # External card ID (e.g. "pokemon-base1-1")
    card_id: Mapped[str] = mapped_column(
        String, unique=True, index=True, nullable=False
    )
    variant: Mapped[str] = mapped_column(String, nullable=False)
    # Full image URL stored at insert time
    card_image: Mapped[str | None] = mapped_column(String, nullable=True)
    # Extension code (e.g. "base1", "lea")
    extension_id: Mapped[str | None] = mapped_column(String, nullable=True)
    # Card number within the extension
    card_number: Mapped[str | None] = mapped_column(String, nullable=True)
    # Card name stored at insert time
    card_name: Mapped[str | None] = mapped_column(String, nullable=True)
    added_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.now, nullable=False
    )

    # Relationships
    collections: Mapped[list[Collection]] = relationship(
        "Collection", back_populates="card"
    )

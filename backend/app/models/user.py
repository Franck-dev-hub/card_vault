import uuid
from datetime import datetime
from sqlalchemy import UUID, String, DateTime
from app.services.database.postgres.postgres import Base
from app.models.collections import Collection
from sqlalchemy.orm import Mapped, mapped_column, relationship


# Define user table
class User(Base):
    __tablename__ = "users"
    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        nullable=False,
    )
    email: Mapped[str] = mapped_column(String, unique=True, nullable=False)
    username: Mapped[str] = mapped_column(
        String, unique=True, nullable=False
    )
    password: Mapped[str] = mapped_column(String, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.now
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.now, onupdate=datetime.now
    )

    # Relation
    collections: Mapped[list[Collection]] = relationship(
        "Collection", back_populates="user"
    )

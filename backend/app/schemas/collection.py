from datetime import datetime
from uuid import UUID
from pydantic import BaseModel


class CollectionCreate(BaseModel):
    card_id: str
    variant: str
    quantity: int = 1
    card_image: str | None = None  # Full image URL sent from frontend
    extension_id: str | None = None  # Extension code (e.g. "base1", "lea")
    card_number: str | None = None  # Card number within the extension
    card_name: str | None = None  # Card name sent from frontend


class CollectionRead(BaseModel):
    id: UUID
    user_id: UUID
    card_id: str
    quantity: int
    updated_at: datetime

    class Config:
        from_attributes = True


class CollectionUpdate(BaseModel):
    quantity: int


class CollectionDelete(BaseModel):
    id: UUID

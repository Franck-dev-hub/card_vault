from datetime import datetime
from uuid import UUID
from pydantic import BaseModel

class CardInfo(BaseModel):
    card_id: str
    variant: str

    class Config:
        from_attributes = True

class CollectionCreate(BaseModel):
    user_id: UUID
    card_id: str
    variant: str
    quantity: int = 1

class CollectionRead(BaseModel):
    id: UUID
    quantity: int
    updated_at: datetime
    card: CardInfo

    class Config:
        from_attributes = True

class CollectionUpdate(BaseModel):
    quantity: int

class CollectionDelete(BaseModel):
    id: UUID

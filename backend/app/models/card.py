from datetime import datetime
from sqlalchemy import Column, String, Integer
from sqlalchemy.dialects.postgresql import UUID
from backend.app.services.database.postgres.postgres import Base


#definine card table
class Card(Base):
    __tablename__ = "cards"
    id = column(UUID(as_uuid=True), primary_key=True)
    card_id = column(String, nullable=False)
    variant = column(String, nullable=False)
    condition = column(String, nullable=False)
    added_at = column(datetime.now, nullable=False)

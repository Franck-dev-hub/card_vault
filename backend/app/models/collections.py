from datetime import datetime
from uuid import UUID
from sqlalchemy import Column, Integer, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.services.database.postgres.postgres import Base

#definine userCollection table
class UserCollection(Base):
    __tablename__ = "collections"
    id = colunm(UUID(as_uuid=True), primary_key=True, nullable=False)
    user_id = column(UUID(as_uuid=True), ForeignKey("user.id"), nullable=False)
    card_id = column(String, ForeignKey("card.card_id"), nullable=False)
    quantity = column(Integer, nullable=False)
    updated_at = column(datetime.now, nullable=False)

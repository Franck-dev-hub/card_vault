from datetime import datetime
from uuid import UUID
from sqlalchemy.orm import Session
from app.models.card import Card
from app.models.collections import Collection

class CollectionService:
    def __init__(self, db: Session):
        self.db = db

    def add_card_to_collection(
        self,
        user_id: UUID,
        external_card_id: str,
        variant: str,
        quantity: int = 0
    ):
        card_obj = (
            self.db.query(Card)
            .filter(Card.card_id == external_card_id)
            .first()
        )

        if not card_obj:
            card_obj = Card(
                card_id=external_card_id,
                variant=variant,
            )
            self.db.add(card_obj)
            self.db.flush()

        existing = (
            self.db.query(Collection)
            .filter_by(
                user_id=user_id,
                card_id=card_obj.id,
                variant=variant
            )
            .first()
        )

        if existing:
            existing.quantity += quantity

            if existing.quantity > 0:
                existing.updated_at = datetime.now()

            elif existing.quantity == 0:
                self.db.delete(existing)

            else:
                raise ValueError("Quantity cannot be negative")

        else:
            if quantity > 0:
                existing = Collection(
                    user_id=user_id,
                    card_id=card_obj.id,
                    variant=variant,
                    quantity=quantity
                )
                self.db.add(existing)
            else:
                raise ValueError("Cannot remove a card that is not in collection")

        self.db.commit()

        if existing:
            self.db.refresh(existing)

        return existing
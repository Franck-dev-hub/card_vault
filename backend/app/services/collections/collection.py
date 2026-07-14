from datetime import datetime
from uuid import UUID
from sqlalchemy.orm import Session
from sqlalchemy import func
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
        quantity: int = 0,
        card_image: str | None = None,
        extension_id: str | None = None,
        card_number: str | None = None,
        card_name: str | None = None,
    ):
        # Find existing card or create it
        card_obj = (
            self.db.query(Card)
            .filter(Card.card_id == external_card_id)
            .first()
        )

        if not card_obj:
            card_obj = Card(
                card_id=external_card_id,
                variant=variant,
                card_image=card_image,
                extension_id=extension_id,
                card_number=card_number,
                card_name=card_name,
            )
            self.db.add(card_obj)
            self.db.flush()
        else:
            # Update missing fields if now available
            if card_image and not card_obj.card_image:
                card_obj.card_image = card_image
            if extension_id and not card_obj.extension_id:
                card_obj.extension_id = extension_id
            if card_number and not card_obj.card_number:
                card_obj.card_number = card_number
            if card_name and not card_obj.card_name:
                card_obj.card_name = card_name

        # Find existing collection entry for this user/card/variant
        existing = (
            self.db.query(Collection)
            .filter_by(user_id=user_id, card_id=card_obj.id, variant=variant)
            .first()
        )

        if existing:
            existing.quantity += quantity

            if existing.quantity > 0:
                existing.updated_at = datetime.now()
            elif existing.quantity == 0:
                # Remove entry when quantity reaches zero
                self.db.delete(existing)
            else:
                raise ValueError("Quantity cannot be negative")

        else:
            if quantity > 0:
                existing = Collection(
                    user_id=user_id,
                    card_id=card_obj.id,
                    variant=variant,
                    quantity=quantity,
                )
                self.db.add(existing)
            else:
                raise ValueError(
                    "Cannot remove a card that is not in collection"
                )

        self.db.commit()

        try:
            if existing:
                self.db.refresh(existing)
        except Exception:
            pass

        return existing

    def get_total_cards(self, user_id: UUID) -> int:
        # Return total number of cards owned by the user
        return (
            self.db.query(func.sum(Collection.quantity))
            .filter(Collection.user_id == user_id)
            .scalar()
        ) or 0

    def get_total_by_license(self, user_id: UUID) -> dict:
        # Return total card count grouped by license
        entries = (
            self.db.query(
                Card.card_id, func.sum(Collection.quantity).label("total")
            )
            .join(Collection, Collection.card_id == Card.id)
            .filter(Collection.user_id == user_id)
            .group_by(Card.card_id)
            .all()
        )

        counts: dict = {}
        for card_id, total in entries:
            license_name = card_id.split("-")[0]
            counts[license_name] = counts.get(license_name, 0) + total

        return counts

    def get_card_quantities(
        self, user_id: UUID, external_card_id: str
    ) -> dict:
        # Return owned quantities per variant for a specific card
        card_obj = (
            self.db.query(Card)
            .filter(Card.card_id == external_card_id)
            .first()
        )

        if not card_obj:
            return {"normal": 0, "reverse": 0, "holo": 0}

        entries = (
            self.db.query(Collection)
            .filter_by(user_id=user_id, card_id=card_obj.id)
            .all()
        )

        quantities = {"normal": 0, "reverse": 0, "holo": 0}
        for entry in entries:
            variant = entry.variant.lower()
            if variant in quantities:
                quantities[variant] = entry.quantity

        return quantities

    def get_owned_by_extension(self, user_id: UUID, extension_id: str) -> dict:
        # Return list of owned card_ids for a given extension
        prefix = f"%-{extension_id}-%"

        owned_cards = (
            self.db.query(Card.card_id)
            .join(Collection, Collection.card_id == Card.id)
            .filter(
                Collection.user_id == user_id,
                Collection.quantity > 0,
                Card.card_id.like(prefix),
            )
            .distinct()
            .all()
        )

        owned_card_ids = [row.card_id for row in owned_cards]

        return {
            "owned_card_ids": owned_card_ids,
            "total_owned": len(owned_card_ids),
        }

    def get_stats(self, user_id: UUID) -> dict:
        # Return comprehensive collection statistics for the user

        # Total cards owned
        total_cards = self.get_total_cards(user_id)

        # Cards grouped by license
        by_license = self.get_total_by_license(user_id)

        # Cards grouped by variant
        variant_entries = (
            self.db.query(
                Collection.variant,
                func.sum(Collection.quantity).label("total"),
            )
            .filter(Collection.user_id == user_id)
            .group_by(Collection.variant)
            .all()
        )
        by_variant = {v: int(t) for v, t in variant_entries}

        # Number of unique extensions owned
        unique_extensions = (
            self.db.query(Card.extension_id)
            .join(Collection, Collection.card_id == Card.id)
            .filter(
                Collection.user_id == user_id,
                Collection.quantity > 0,
                Card.extension_id.isnot(None),
            )
            .distinct()
            .count()
        )

        # Number of unique cards owned
        unique_cards = (
            self.db.query(Card.card_id)
            .join(Collection, Collection.card_id == Card.id)
            .filter(Collection.user_id == user_id, Collection.quantity > 0)
            .distinct()
            .count()
        )

        # Most recently added card
        recent = self.get_recent_cards(user_id, limit=1)
        last_card = recent[0] if recent else None

        return {
            "total_cards": total_cards,
            "unique_cards": unique_cards,
            "unique_extensions": unique_extensions,
            "by_license": by_license,
            "by_variant": by_variant,
            "last_card": last_card,
        }

    def get_all_owned_cards(self, user_id: UUID) -> list:
        # Return all cards owned by the user with their quantities
        entries = (
            self.db.query(Collection, Card)
            .join(Card, Card.id == Collection.card_id)
            .filter(Collection.user_id == user_id, Collection.quantity > 0)
            .order_by(Collection.updated_at.desc())
            .all()
        )

        seen = set()
        results = []

        for collection, card in entries:
            if card.card_id in seen:
                continue
            seen.add(card.card_id)

            license_name = card.card_id.split("-")[0]

            # Fallback for Pokémon cards
            if license_name == "pokemon" and not card.extension_id:
                parts = card.card_id.split("-")
                fallback_card_number = parts[-1]
                fallback_extension_id = "-".join(parts[1:-1])
            else:
                fallback_card_number = ""
                fallback_extension_id = ""

            results.append(
                {
                    "card_id": card.card_id,
                    "card_name": card.card_name or "",
                    "card_number": card.card_number or fallback_card_number,
                    "extension_id": card.extension_id or fallback_extension_id,
                    "license": license_name,
                    "card_image": card.card_image or "",
                    "quantity": collection.quantity,
                }
            )

        return results

    def get_recent_cards(self, user_id: UUID, limit: int = 10) -> list:
        # Return the most recent cards in the user's collection
        entries = (
            self.db.query(Collection, Card)
            .join(Card, Card.id == Collection.card_id)
            .filter(Collection.user_id == user_id)
            .order_by(Collection.updated_at.desc())
            .limit(limit)
            .all()
        )

        results = []
        seen = set()

        for collection, card in entries:
            if card.card_id in seen:
                continue
            seen.add(card.card_id)

            card_id = card.card_id
            license_name = card_id.split("-")[0]

            # Fallback for Pokémon cards
            if license_name == "pokemon" and not card.extension_id:
                parts = card_id.split("-")
                fallback_card_number = parts[-1]
                fallback_extension_id = "-".join(parts[1:-1])
            else:
                fallback_card_number = ""
                fallback_extension_id = ""

            results.append(
                {
                    "card_id": card_id,
                    "card_name": card.card_name or "",
                    "card_number": card.card_number or fallback_card_number,
                    "extension_id": card.extension_id or fallback_extension_id,
                    "license": license_name,
                    "card_image": card.card_image or "",
                    "updated_at": collection.updated_at.isoformat(),
                }
            )

        return results

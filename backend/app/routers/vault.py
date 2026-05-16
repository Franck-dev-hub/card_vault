from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.collection import CollectionCreate
from app.services.database.postgres.postgres import get_postgres
from app.routers.auth.get_user import get_current_user
from app.models import user as user_model
from app.services.collections.collection import CollectionService

router = APIRouter(prefix="", tags=["vault"])


@router.get("/vault")
async def get_vault(
        db: Session = Depends(get_postgres),
        user: user_model.User = Depends(get_current_user)
):
    """Return total card count for the current user."""
    service = CollectionService(db)
    total_cards = service.get_total_cards(user.id)
    return {"total_cards": total_cards}


@router.get("/vault/licenses")
async def get_vault_licenses(
        db: Session = Depends(get_postgres),
        user: user_model.User = Depends(get_current_user)
):
    """Return card count grouped by license."""
    service = CollectionService(db)
    return service.get_total_by_license(user.id)


@router.get("/vault/stats")
async def get_vault_stats(
        db: Session = Depends(get_postgres),
        user: user_model.User = Depends(get_current_user)
):
    """Return full collection statistics for the current user."""
    service = CollectionService(db)
    return service.get_stats(user.id)


@router.get("/vault/recent")
async def get_vault_recent(
        db: Session = Depends(get_postgres),
        user: user_model.User = Depends(get_current_user)
):
    """Return the 10 most recently added cards."""
    service = CollectionService(db)
    return service.get_recent_cards(user.id)


@router.get("/vault/cards")
async def get_vault_cards(
        db: Session = Depends(get_postgres),
        user: user_model.User = Depends(get_current_user)
):
    """Return all cards owned by the user."""
    service = CollectionService(db)
    return service.get_all_owned_cards(user.id)


async def get_vault_extension(
        extension_id: str,
        db: Session = Depends(get_postgres),
        user: user_model.User = Depends(get_current_user)
):
    """Return owned card IDs and count for a given extension."""
    service = CollectionService(db)
    return service.get_owned_by_extension(user.id, extension_id)


@router.get("/vault/{card_id:path}")
async def get_vault_card(
        card_id: str,
        db: Session = Depends(get_postgres),
        user: user_model.User = Depends(get_current_user)
):
    """Return owned quantities per variant for a specific card."""
    service = CollectionService(db)
    return service.get_card_quantities(user.id, card_id)


@router.post("/vault")
async def post_vault(
        collection_data: CollectionCreate,
        db: Session = Depends(get_postgres),
        user: user_model.User = Depends(get_current_user)
):
    """Add or update a card in the user's collection."""
    service = CollectionService(db)
    entry = service.add_card_to_collection(
        user_id=user.id,
        external_card_id=collection_data.card_id,
        variant=collection_data.variant,
        quantity=collection_data.quantity,
        card_image=collection_data.card_image,
        extension_id=collection_data.extension_id,
        card_number=collection_data.card_number,
        card_name=collection_data.card_name,
    )

    if not entry and collection_data.quantity > 0:
        raise HTTPException(
            status_code=404,
            detail=f"Card '{collection_data.card_id}' not found in database."
        )

    return {"message": "Success"}

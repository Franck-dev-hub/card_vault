from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.collection import CollectionCreate
from app.services.database.postgres.postgres import get_postgres
from app.routers.auth.get_user import get_current_user
from app.models import user as user_model
from app.services.collections.collection import CollectionService
from app.schemas.collection import CollectionRead

router = APIRouter(prefix="", tags=["vault"])


@router.get("/vault", response_model=List[CollectionRead])
async def get_vault(
        db: Session = Depends(get_postgres),
        user: user_model.User = Depends(get_current_user)
):
    service = CollectionService(db)
    collection = service.get_user_collection(user_id=user.id)
    return collection

@router.post("/vault")
async def post_vault(
        collection_data: CollectionCreate,
        db: Session = Depends(get_postgres),
        user: user_model.User = Depends(get_current_user)
):
    service = CollectionService(db)
    try:
        entry = service.add_card_to_collection(
            user_id=user.id,
            external_card_id=collection_data.card_id,
            variant=collection_data.variant,
            quantity=collection_data.quantity
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    if not entry:
        raise HTTPException(
            status_code=404,
            detail=f"Card '{collection_data.card_id}' not found in database."
        )

    return {"message": "Success", "id": str(entry.id)}

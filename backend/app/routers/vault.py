from fastapi import APIRouter, Depends, HTTPException
from datetime import datetime
from starlette.responses import JSONResponse
from sqlalchemy.orm import Session
from app.schemas.collection import CollectionCreate
from app.services.database.postgres.postgres import get_postgres
from app.routers.auth.get_user import get_current_user
from app.models import user as user_model
from app.models import collections as collection_model
from app.services.collections.collection import CollectionService

router = APIRouter(prefix="", tags=["vault"])


@router.get("/vault")
async def get_vault():
    return {
        "title": "Vault",
    }

@router.post("/vault")
async def post_vault(
        collection_data: CollectionCreate,
        db: Session = Depends(get_postgres),
        user: user_model.User = Depends(get_current_user)
):
    service = CollectionService(db)
    entry = service.add_card_to_collection(
        user_id=user.id,
        external_card_id=collection_data.card_id,
        variant=collection_data.variant,
        quantity=collection_data.quantity
    )

    if not entry:
        raise HTTPException(
            status_code=404,
            detail=f"Card '{collection_data.card_id}' not found in database."
        )

    return {"message": "Success", "id": str(entry.id)}

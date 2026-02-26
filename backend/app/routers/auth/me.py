from fastapi import APIRouter, Depends
from app.models import user as user_model
from app.routers.auth.get_user import get_current_user


router = APIRouter(prefix="", tags=["me"])


@router.get("/me")
async def get_me(user: user_model.User = Depends(get_current_user)):
    return {
        "user_id": user.id,
        "username": user.username,
        "email": user.email
    }

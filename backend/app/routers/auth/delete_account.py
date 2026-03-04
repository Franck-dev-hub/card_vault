from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models import user as user_model
from app.services.database.postgres.postgres import get_postgres
from starlette.responses import JSONResponse
from app.schemas.user import UserDelete
from app.routers.auth.password import verify_password
from app.routers.auth.get_user import get_current_user

router = APIRouter(prefix="", tags=["delete_account"])


@router.get("/delete_account")
async def get_delete_account():
    return {
        "title": "Delete account",
    }


@router.delete("/delete_account")
async def delete_account(
        credentials: UserDelete,
        current_user: user_model.User = Depends(get_current_user),
        db: Session = Depends(get_postgres)
):

    # Check user email
    if current_user.email != credentials.email:
        raise HTTPException(
            status_code=403,
            detail="You can only delete your own account"
        )

    # Check user password
    if not verify_password(credentials.password, current_user.password):
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    # Delete account
    try:
        user_id_str = str(current_user.id)
        db.delete(current_user)
        db.commit()
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Database error during deletion")

    # Build json response
    response = JSONResponse(
        status_code=200,
        content={
            "message": "User deleted successfully",
            "user_id": user_id_str
        }
    )

    # Delete cookie session
    response.delete_cookie("session_id")

    return response

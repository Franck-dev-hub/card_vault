from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models import user as user_model
from app.services.database.postgres.postgres import get_postgres
from starlette.responses import JSONResponse
from app.schemas.user import UserDelete
from app.routers.auth.password import verify_password

router = APIRouter(prefix="", tags=["delete_account"])


@router.get("/delete_account")
async def get_delete_account():
    return {
        "title": "Delete account",
    }


@router.delete("/delete_account")
async def delete_account(credentials: UserDelete, db: Session = Depends(get_postgres)):
    user = (db.query(user_model.User)
            .filter(user_model.User.email == credentials.email)
            .first())

    # Check if user email exists
    if not user.email or user.email != credentials.email:
        raise HTTPException(
            status_code=404,
            detail="User email not found"
        )

    if not verify_password(credentials.password, user.password):
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    # Save to Postgres
    db.delete(user)
    db.commit()

    # Create response with JSON
    response = JSONResponse(
        status_code=200,
        content={
            "message": "User deleted successfully",
            "user_id": user.id
        }
    )
    return response

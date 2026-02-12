import bcrypt, requests
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models import database, user as user_model
from app.models.database import get_db
from app.models.session import Session as SessionModel
from app.schemas.user import UserLogin
from app.services.session import SessionManager
from starlette.responses import JSONResponse
from datetime import datetime, timedelta

router = APIRouter(prefix="", tags=["login"])

def verify_password(plain_password: str, hashed_password: str) -> bool:
    # Verify password against bcrypt hash
    return bcrypt.checkpw(
        plain_password.encode("utf-8"),
        hashed_password.encode("utf-8")
    )


@router.get("/login")
async def get_login():
    return {
        "title": "Login",
    }

@router.post("/login")
def login_user(credentials: UserLogin, db: Session = Depends(get_db)):
    user = (db.query(user_model.User)
            .filter(user_model.User.email == credentials.email)
            .first())

    if not user or not verify_password(credentials.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    existing_session = db.query(SessionModel).filter(
        SessionModel.user_id == user.id,
        SessionModel.expires_at > datetime.now()
    ).first()

    if existing_session:
        existing_session.expires_at = datetime.now() + timedelta(hours=24)
        db.commit()
        token = existing_session.token
        message = "Session token refreshed"
    else:
        # Create session token
        token = SessionManager.create_session_token(user.id, db, expires_in_hours=24)
        message = "Login successful"

    # Create response with JSON
    response = JSONResponse(
        content={
            "message": message,
            "user_id": user.id
        }
    )

    # Set secure cookie with session token
    response.set_cookie(
        key="session_id",
        value=token,
        httponly=True,
        secure=False,
        samesite="lax",
        max_age=86400, # 24H
    )

    return response

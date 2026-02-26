import os
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models import user as user_model
from app.services.database.postgres.postgres import get_postgres
from app.schemas.user import UserLogin
from starlette.responses import JSONResponse
from app.routers.auth.password import verify_password
from app.services.cookies import session as session_manager

sm_instance = session_manager.SessionManager()

router = APIRouter(prefix="", tags=["login"])


@router.get("/login")
async def get_login():
    return {"title": "Login"}


@router.post("/login")
async def post_login(credentials: UserLogin, db: Session = Depends(get_postgres)):
    # Get user by email
    user = db.query(user_model.User).filter(user_model.User.email == credentials.email).first()

    if not user or not verify_password(credentials.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # Create new session
    try:
        session_data = sm_instance.create_session(user.id)
        session_id = session_data["session_id"]
        message = "Login successful"
        status_code = 201
    except Exception:
        raise HTTPException(status_code=500, detail="Error creating session")

    if getattr(credentials, "remember_me", False):
        max_age = os.environ.get("SESSION_COOKIE_TIME_LONG")
    else:
        max_age = os.environ.get("SESSION_COOKIE_TIME_DEFAULT")

    # Build response
    response = JSONResponse(
        status_code=status_code,
        content={
            "message": message,
            "user_id": user.id
        }
    )

    # Set secure cookie with session token
    secure_mode = os.environ.get("SESSION_COOKIE_SECURE", "").lower() == "true"
    response.set_cookie(
        key="session_id",
        value=session_id,
        httponly=True,
        secure=secure_mode,
        samesite="lax",
        max_age=max_age,
    )

    return response
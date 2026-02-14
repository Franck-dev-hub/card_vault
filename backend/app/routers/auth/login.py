import app.services.cookies.session as session_manager
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models import user as user_model
from app.services.database.postgres.postgres import get_postgres
from app.schemas.user import UserLogin
from starlette.responses import JSONResponse
from app.routers.auth.password import verify_password

sm_instance = session_manager.SessionManager()

router = APIRouter(prefix="", tags=["login"])


@router.get("/login")
async def get_login():
    return {"title": "Login"}


@router.post("/login")
async def post_login(credentials: UserLogin, db: Session = Depends(get_postgres)):
    user = (db.query(user_model.User)
            .filter(user_model.User.email == credentials.email)
            .first())

    # Check if user exists and password is correct
    if not user or not verify_password(credentials.password, user.password):
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    # Check if user already has an active session
    existing_session = sm_instance.read_session(user.id)
    if existing_session:
        session_id = existing_session["session_id"]
        sm_instance.update_session(session_id)
        message = "Login refreshed"
        status_code = 200
    else:

        # Create new session
        try:
            session_data = sm_instance.create_session(user.id)
            session_id = session_data["session_id"]
            message = "Login successful"
            status_code = 201
        except Exception:
            raise HTTPException(
                status_code=500,
                detail="Error creating session"
            )

    # Create response with JSON
    response = JSONResponse(
        status_code=status_code,
        content={
            "message": message,
            "user_id": user.id
        }
    )

    # Set secure cookie with session token
    response.set_cookie(
        key="session_id",
        value=session_id,
        httponly=True,
        secure=False,
        samesite="lax",
        max_age=3600 * 24 * 30,
    )

    return response

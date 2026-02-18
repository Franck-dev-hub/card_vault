import app.services.cookies.session as session_manager
from fastapi import APIRouter, HTTPException, Request
from app.models import user as user_model
from app.services.database.postgres.postgres import get_postgres
from app.schemas.user import UserLogin
from starlette.responses import JSONResponse

session_manager_instance = session_manager.SessionManager()

router = APIRouter(prefix="", tags=["logout"])


@router.get("/logout")
async def get_logout():
    return {
        "title": "Logout",
    }


@router.post("/logout")
async def post_logout(request: Request):
    # Get the session token from the cookie
    session_token = request.cookies.get("session_id")

    if not session_token:
        raise HTTPException(
            status_code=400,
            detail="No session found"
        )

    # Delete session
    try:
        session_manager_instance.delete_session(session_token)
    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Error deleting session"
        )

    # Create response with JSON
    response = JSONResponse(
        status_code=200,
        content={
            "message": "Logout successful",
        }
    )
    response.delete_cookie(key="session_id")
    return response

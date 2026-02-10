from fastapi import APIRouter, Depends, Cookie
from sqlalchemy.orm import Session
from app.services.session import SessionManager
from starlette.responses import JSONResponse
from app.models.database import get_db

router = APIRouter(prefix="", tags=["logout"])

@router.get("/logout")
async def get_logout():
    return {
        "title": "Logout",
    }

@router.post("/logout")
def logout_user(session_id: str = Cookie(None), db: Session = Depends(get_db)):
    if session_id:
        SessionManager.invalidate_session_token(session_id, db)

        response = JSONResponse(content={"message": "Logged out successfully"})

        # Clear the cookie
        response.delete_cookie(
            key="session_id",
            secure=True,
            httponly=True,
            samesite="lax"
        )

        return response

    return JSONResponse(content={"message": "No active session"}, status_code=400)

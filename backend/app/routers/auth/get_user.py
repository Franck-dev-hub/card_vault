from fastapi import Depends, HTTPException, Request
from uuid import UUID
from sqlalchemy.orm import Session
from app.models import user as user_model
from app.services.database.postgres.postgres import get_postgres
from app.services.cookies import session as session_manager

sm_instance = session_manager.SessionManager()


def get_current_user(
        request: Request,
        db: Session = Depends(get_postgres)
):

    # Get session id
    session_id = request.cookies.get("session_id")
    if not session_id:
        raise HTTPException(status_code=401, detail="Not authenticated" )

    # Get session data
    session = sm_instance.read_session(session_id)
    if not session:
        raise HTTPException(status_code=401, detail="Session not found")

    user_id_val = session["user_id"]

    try:
        if isinstance(user_id_val, int):
            clean_user_id = UUID(int=user_id_val)
        else:
            clean_user_id = UUID(str(user_id_val))
    except ValueError:
        raise HTTPException(status_code=401, detail="Invalid user ID format")

    user = (
        db.query(user_model.User)
        .filter(user_model.User.id == clean_user_id)
        .first()
    )

    if not user:
        raise HTTPException(status_code=401, detail="User not found")

    return user

import bcrypt
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models import database, user as user_model
from app.models.database import get_db
from app.schemas.user import UserLogin

router = APIRouter(prefix="", tags=["login"])

def verify_password(plain_password: str, hashed_password: str) -> bool:
    # Verify password against bcrypt hash
    return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))


@router.get("/login")
async def get_login():
    return {
        "title": "Login",
    }

@router.post("/login")
def login_user(credentials: UserLogin, db: Session = Depends(get_db)):
    user = db.query(user_model.User).filter(user_model.User.email == credentials.email).first()

    if not user or not verify_password(credentials.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {"message": "Login successful", "user_id": user.id}

from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models import database, user as user_model
from app.schemas.user import UserCreate

router = APIRouter(prefix="", tags=["register"])

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/register")
async def get_register():
    return {
        "title": "Register",
    }

@router.post("/register")
def register_user(user_data: UserCreate, db: Session = Depends(get_db)):
    # Check if user already exists
    db_user = db.query(user_model.User).filter(user_model.User.email == user_data.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Create a new user
    new_user = user_model.User(
        username=user_data.username,
        email=user_data.email,
        password = user_data.password,
        created_at=datetime.now().isoformat(),
        updated_at=datetime.now().isoformat()
    )

    # Save to Postgres
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User created successfully", "user_id": new_user.id}

import bcrypt
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models import user as user_model
from app.services.database.postgres.postgres import get_postgres
from app.schemas.user import UserCreate
from starlette.responses import JSONResponse

router = APIRouter(prefix="", tags=["register"])


# Function to hash passwords
def hash_password(password: str) -> str:
    salt = bcrypt.gensalt(rounds=12)
    return bcrypt.hashpw(password.encode("utf-8"), salt).decode("utf-8")


@router.get("/register")
async def get_register():
    return {
        "title": "Register",
    }


@router.post("/register")
def register_user(user_data: UserCreate, db: Session = Depends(get_postgres)):
    # Check if user already exists
    db_username = db.query(user_model.User).filter(user_model.User.username == user_data.username).first()
    db_user_email = db.query(user_model.User).filter(user_model.User.email == user_data.email).first()
    if db_username:
        raise HTTPException(
            status_code=409,
            detail="Username already registered"
        )

    if db_user_email:
        raise HTTPException(
            status_code=409,
            detail="Email already registered"
        )

    # Hash the password
    hashed_password = hash_password(user_data.password)

    # Create a new user
    new_user = user_model.User(
        username=user_data.username,
        email=user_data.email,
        password=hashed_password,
        created_at=datetime.now().isoformat(),
        updated_at=datetime.now().isoformat()
    )

    # Save to Postgres
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Create response with JSON
    response = JSONResponse(
        status_code=201,
        content={
            "message": "User created successfully",
            "user_id": new_user.id
        }
    )
    return response

from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str
    remember_me: bool


class UserDelete(BaseModel):
    email: EmailStr
    password: str

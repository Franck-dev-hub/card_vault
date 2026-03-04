from pydantic import BaseModel


class UserCreate(BaseModel):
    username: str
    email: str
    password: str


class UserLogin(BaseModel):
    email: str
    password: str
    remember_me: bool = False


class UserDelete(BaseModel):
    email: str
    password: str

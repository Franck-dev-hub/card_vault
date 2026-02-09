from fastapi import APIRouter

router = APIRouter(prefix="", tags=["login"])

@router.get("/login")
async def get_login():
    return {
        "title": "Login",
    }

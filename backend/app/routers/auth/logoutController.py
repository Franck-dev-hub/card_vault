from fastapi import APIRouter

router = APIRouter(prefix="", tags=["logout"])

@router.get("/logout")
async def get_logout():
    return {
        "title": "Logout",
    }

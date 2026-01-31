from fastapi import APIRouter

router = APIRouter(prefix="", tags=["register"])

@router.get("/register")
async def get_register():
    return {
        "title": "Register",
    }

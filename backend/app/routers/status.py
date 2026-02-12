from fastapi import APIRouter

router = APIRouter(prefix="", tags=["status"])

@router.get("/status")
async def get_status():
    return {
        "title": "Status",
    }
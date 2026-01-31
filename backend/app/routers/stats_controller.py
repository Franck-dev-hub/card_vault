from fastapi import APIRouter

router = APIRouter(prefix="", tags=["stats"])

@router.get("/stats")
async def get_stats():
    return {
        "title": "Stats",
    }
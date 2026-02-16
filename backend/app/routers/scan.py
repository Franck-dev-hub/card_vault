from fastapi import APIRouter

router = APIRouter(prefix="", tags=["scan"])


@router.get("/scan")
async def get_scan():
    return {
        "title": "Scan",
    }

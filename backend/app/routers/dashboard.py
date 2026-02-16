from fastapi import APIRouter

router = APIRouter(prefix="", tags=["dashboard"])


@router.get("/dashboard")
async def get_dashboard():
    return {
        "title": "Dashboard",
    }

# Routes debug
# for route in router.routes:
#     print(f"{route.path} - {route.methods}")

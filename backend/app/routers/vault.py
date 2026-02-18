from fastapi import APIRouter

router = APIRouter(prefix="", tags=["vault"])


@router.get("/vault")
async def get_vault():
    return {
        "title": "Vault",
    }

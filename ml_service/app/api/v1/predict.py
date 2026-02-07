from fastapi import APIRouter, HTTPException
from app.models.model import search_card


router = APIRouter(tags=["predict"])

@router.get("/predict")
async def get_prediction():
    try:
        result = search_card()
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

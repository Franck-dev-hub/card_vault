from typing import Optional, Any
from app.services.external.magic import magic_api_services
from app.services.standardized.magic import magic_standardized
from fastapi import HTTPException

async def fetch(extension: Optional[str] = None, collector_number: Optional[str] = None) -> Any:
    if extension and collector_number:
        response = await magic_api_services.fetch_card(extension, collector_number)
    elif extension:
        response = await magic_api_services.fetch_cards(extension)
    elif extension:
        response = await magic_api_services.fetch_extension(extension)
    else:
        response = await magic_api_services.fetch_extensions()

    if not response or response.status_code != 200:
        return None

    return response.json()


async def fetch_and_standardized(extension: Optional[str] = None, data_card: Optional[str] = None):
    try:
        raw_data = await fetch(extension, data_card)
        if not raw_data:
            return None

        return magic_standardized.standardized(raw_data, extension, data_card)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Fail to fetch extension or  data: {str(e)}")

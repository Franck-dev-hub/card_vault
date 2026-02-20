from typing import Optional, Any
from app.services.external.pokemon import pokemon_api_services
from app.services.standardized.pokemon import pokemon_standardized

async def fetch(extension: Optional[str] = None, card: Optional[str] = None) -> Any:
    if extension and card:
        response = await pokemon_api_services.fetch_card(extension, card)
    elif extension:
        response = await pokemon_api_services.fetch_cards(extension)
    else:
        response = await pokemon_api_services.fetch_extension()

    if not response or response.status_code != 200:
        return None

    return response.json()


async def fetch_and_standardized(extension: Optional[str] = None, card: Optional[str] = None):
    raw_data = await fetch(extension, card)
    if not raw_data:
        return None

    return pokemon_standardized.standardized(raw_data, extension, card)
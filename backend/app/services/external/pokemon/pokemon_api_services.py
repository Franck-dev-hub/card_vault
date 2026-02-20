import httpx

LANGUAGE = "en"
BASE_URL = "https://api.tcgdex.net/v2/"


async def fetch_extension():
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{BASE_URL}{LANGUAGE}/sets/")
    return response

async def fetch_cards(extension: str):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{BASE_URL}{LANGUAGE}/sets/{extension}")
    return response


async def fetch_card(extension: str, card: str):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{BASE_URL}{LANGUAGE}/sets/{extension}/{card}")
    return response

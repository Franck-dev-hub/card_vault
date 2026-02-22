import httpx

BASE_URL = "https://api.scryfall.com/"

async def fetch_extensions():
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{BASE_URL}/sets")
    return response

async def fetch_extension(extension_name: str):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{BASE_URL}/sets/{extension_name}")
    return response

async def fetch_cards(extension_name: str):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{BASE_URL}/cards/search", params={"q": f"set:{extension_name}"})
    return response

async def fetch_card(extension_name: str, collector_number: str):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{BASE_URL}/cards/{extension_name}/{collector_number}")
    return response

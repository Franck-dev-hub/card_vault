import json
from pathlib import Path
from fastapi import APIRouter, HTTPException
from app.services import pokemon_service
from app.services import magic_service

router = APIRouter(tags=["search"])

BASE_DIR = Path(__file__).resolve().parent.parent
LICENSE_FILE = BASE_DIR / "resources" / "licenses.json"

try:
    with open(LICENSE_FILE, "r") as f:
        license_data = json.load(f)
except FileNotFoundError:
    license_data = {}

service_map = {
    "pokemon": pokemon_service,
    "magic": magic_service,
}

@router.get("/search")
async def get_licenses():
    return license_data


@router.get("/search/{license}")
@router.get("/search/{license}/{extension}")
@router.get("/search/{license}/{extension}/{card}")
async def search(
    license: str,
    extension: str | None = None,
    card: int | None = None,
):
    license_key = license.lower()

    # Validate license
    if license_key not in license_data:
        raise HTTPException( status_code=400, detail=f"Unknown license: {license}")

    # Get service name from license.json
    service_name = license_data[license_key].get("id")
    service = service_map.get(service_name)

    if not service:
        raise HTTPException(status_code=500, detail=f"Service not configured for license: {license}")

    # Fetch + standardise
    try:

        result = await service.fetch_and_standardized(extension, card)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal error: {str(e)}")

    # Handle empty result
    if not result:
        raise HTTPException(status_code=404, detail="No data found")

    return result

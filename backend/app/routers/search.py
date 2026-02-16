import json
from pathlib import Path
from fastapi import APIRouter, HTTPException

from app.services.external.pokemon import pokemon_api_services
from app.services.external.magic import magic_api_services
from app.services.normalizers import pokemon_normalizer, magic_normalizer

router = APIRouter(prefix="", tags=["search"])

# Format json file path
app_dir = Path(__file__).resolve().parent.parent
file_path = app_dir / "resources" / "licenses.json"

# Open and load license data
with open(file_path, "r") as f:
    license_data = json.load(f)

# Map service names to service instances
service_map = {
    "pokemon": pokemon_api_services,
    "magic": magic_api_services
}

# Map service names to normalizers
normalizer_map = {
    "pokemon": pokemon_normalizer,
    "magic": magic_normalizer
}


@router.get("/search/{license}/{extension}/{card}")
@router.get("/search/{license}/{extension}")
@router.get("/search/{license}")
async def get_cards(
        license: str,
        extension: str | None = None,
        card: str | None = None
):
    license_key = license.lower()

    # Validate license
    if license_key not in license_data:
        raise HTTPException(status_code=400, detail="Unknown license")

    # Get the appropriate service and normalizer
    service_name = license_data[license_key]["id"]
    service = service_map.get(service_name)
    normalizer = normalizer_map.get(service_name)

    if not service or not normalizer:
        raise HTTPException(status_code=400, detail="Service not configured")

    # Fetch raw data from API
    if extension and card:
        response = service.fetch_card(extension, card)
    elif extension:
        response = service.fetch_cards(extension)
    else:
        response = service.fetch_extension()

    if not response or response.status_code != 200:
        raise HTTPException(status_code=404, detail="Failed to fetch data")

    raw_data = response.json()

    # Normalize data
    if extension and card:
        result = normalizer.normalize_cards(raw_data)
    elif extension:
        result = normalizer.normalize_cards(raw_data)
    else:
        result = normalizer.normalize_sets(raw_data)

    return result


@router.get("/search")
async def get_licenses():
    """Return list of licenses"""
    try:
        return license_data
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"License not found. Exception: {e}")

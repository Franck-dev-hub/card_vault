from typing import List, Dict, Any

# ---------- build card data ---------- #

def _build_card_id(api_id: str) -> str:
    return f"magic-{api_id}"


def _extract_image(data_card: Dict[str, Any]) -> Dict[str, Any] | None:
    if "image_uris" in data_card:
        return {
            "small_image": data_card["image_uris"].get("small"),
            "medium_image": data_card["image_uris"].get("normal"),
        }
    return None


def _extract_variant(data_card: Dict[str, Any]) -> str | None:
    finishes = data_card.get("finishes", [])
    if "foil" in finishes and "nonfoil" in finishes:
        return "foil, nonfoil"
    if "foil" in finishes:
        return "foil"
    if "nonfoil" in finishes:
        return "nonfoil"
    return None

def _extract_price(data_card: Dict[str, Any]) -> Dict[str, str]:
    prices = data_card.get("prices")

    if not isinstance(prices, dict):
        return {}

    eur_prices = {}

    for key, value in prices.items():
        if "eur" in key and value is not None:
            eur_prices[key] = value
    return eur_prices

def standardized(raw_data: dict, extension: str = None, data_card: str = None):
    if data_card:
        return standardized_data_card(raw_data)
    elif extension:
        return standardized_data_cards(raw_data)
    else:
        return standardized_data_extensions(raw_data)


# ---------- build standardized data ---------- #


def standardized_data_card(card: Dict[str, Any]) -> Dict[str, Any]:
    return {
        "license": "Magic",
        "card_id": _build_card_id(card.get("id")),
        "card_number": card.get("collector_number"),
        "card_name": card.get("name"),
        "extension_name": card.get("set_name"),
        "extension_id": card.get("set"),
        "illustrator": card.get("artist"),
        "card_image": _extract_image(card),
        "avg_prices": _extract_price(card),
        "rarity": card.get("rarity"),
        "variant": _extract_variant(card),
    }


def standardized_data_cards(data: Dict[str, Any]) -> List[Dict[str, Any]]:
    """standardise les cartes Magic"""
    if "data" not in data or not isinstance(data["data"], list):
        return []
    standardized = []
    for data_card in data["data"]:
        if data_card.get("object") == "card":
            standardized.append(standardized_data_card(data_card))
    return standardized


def standardized_data_extension(extension: Dict[str, Any]) -> Dict[str, Any]:
    """Normalise une extension Magic"""
    return {
            "license": "Magic",
            "extension_id": extension.get("id"),
            "extension_name": extension.get("name"),
            "extension_total_card": extension.get("card_count"),
            "extension_icon": extension.get("icon_svg_uri"),
        }

def standardized_data_extensions(data: Dict[str, Any]) -> List[Dict[str, Any]]:
    """Normalise une liste d'extension Magic"""
    if "data" not in data or not isinstance(data["data"], list):
        return []
    standardized = []
    for extension in data["data"]:
        standardized.append({
            "license": "Magic",
            "extension_id": extension.get("code"),
            "extension_name": extension.get("name"),
            "extension_total_card": extension.get("card_count")
        })
    return standardized

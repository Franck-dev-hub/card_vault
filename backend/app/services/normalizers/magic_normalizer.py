from typing import List, Dict, Any


def _build_card_id(api_id: str) -> str:
    return f"magic-{api_id}"


def _extract_image(card: Dict[str, Any]) -> str | None:
    if "image_uris" in card:
        return card["image_uris"].get("normal")
    if "card_faces" in card and card["card_faces"]:
        return card["card_faces"][0].get("image_uris", {}).get("normal")
    return None


def _extract_variant(card: Dict[str, Any]) -> str | None:
    finishes = card.get("finishes", [])
    if "foil" in finishes and "nonfoil" in finishes:
        return "foil, nonfoil"
    if "foil" in finishes:
        return "foil"
    if "nonfoil" in finishes:
        return "nonfoil"
    return None


def normalize_card(card: Dict[str, Any]) -> Dict[str, Any]:
    return {
        "card_id": _build_card_id(card.get("id")),
        "api_id": card.get("id"),
        "set_name": card.get("set_name"),
        "set_id": card.get("set"),
        "card_number": card.get("collector_number"),
        "license": "magic",
        "illustrator": card.get("artist"),
        "image_url": _extract_image(card),
        "name": card.get("name"),
        "rarity": card.get("rarity"),
        "variant": _extract_variant(card),
        "condition": None,
    }


def normalize_cards(data: Dict[str, Any]) -> List[Dict[str, Any]]:
    """Normalise les cartes Magic depuis Scryfall"""
    if "data" not in data or not isinstance(data["data"], list):
        return []
    normalized = []
    for card in data["data"]:
        if card.get("object") == "card":
            normalized.append(normalize_card(card))
    return normalized


def normalize_sets(data: Dict[str, Any]) -> List[Dict[str, Any]]:
    """Normalise la liste des sets Magic"""
    if "data" not in data or not isinstance(data["data"], list):
        return []
    normalized = []
    for s in data["data"]:
        normalized.append({
            "set_id": s.get("code"),
            "set_name": s.get("name"),
            "license": "magic"
        })
    return normalized

from typing import List, Dict, Any


def _build_card_id(api_id: str) -> str:
    return f"pokemon-{api_id}"


def normalize_card(card: Dict[str, Any]) -> Dict[str, Any]:
    """Normalise une carte Pokémon"""
    return {
        "card_id": _build_card_id(card.get("id")),
        "api_id": card.get("id"),
        "set_name": card.get("set", {}).get("name"),
        "set_id": card.get("set", {}).get("id"),
        "card_number": card.get("localId"),
        "license": "pokemon",
        "illustrator": card.get("illustrator"),
        "image_url": card.get("image"),
        "name": card.get("name"),
        "rarity": card.get("rarity"),
        "variant": (
            card.get("variants_detailed", [{}])[0].get("type")
            if card.get("variants_detailed")
            else None
        ),
        "condition": None,
    }


def normalize_cards(data: Dict[str, Any]) -> List[Dict[str, Any]]:
    """Normalise les réponses Pokémon (carte unique ou set avec cartes)"""
    # Carte unique
    if "category" in data and "set" in data:
        return [normalize_card(data)]

    # Set avec liste de cartes
    if "cards" in data and isinstance(data["cards"], list):
        normalized = []
        for card in data["cards"]:
            normalized.append({
                "card_id": _build_card_id(card.get("id")),
                "api_id": card.get("id"),
                "set_name": None,
                "set_id": None,
                "card_number": card.get("localId"),
                "license": "pokemon",
                "illustrator": None,
                "image_url": card.get("image"),
                "name": card.get("name"),
                "rarity": None,
                "variant": None,
                "condition": None,
            })
        return normalized

    # ❌ liste de sets ou inconnue
    return []


def normalize_sets(data: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """Normalise la liste des sets Pokémon"""
    result = []
    for s in data:
        result.append({
            "set_id": s.get("id"),
            "set_name": s.get("name"),
            "license": "pokemon"
        })
    return result
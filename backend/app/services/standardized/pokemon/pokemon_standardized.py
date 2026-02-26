from typing import Dict, Any, List


def standardized(
    data: Any,
    extension: str | None = None,
    card: str | None = None
) -> Any:

    if card:
        return [standardized_data_card(data)]

    if extension :
        if isinstance(data, dict) and "cards" in data:
            return [standardized_data_cards(c) for c in data["cards"]]
        return [standardized_data_cards(data)]

    if isinstance(data, list):
        return [standardized_data_extension(d) for d in data]
    return [standardized_data_extension(data)]


def standardized_data_card(card: Dict[str, Any]) -> Dict[str, Any]:
    set_data = card.get("set") or {}
    card_count = set_data.get("cardCount") or {}
    pricing = card.get("pricing") or {}
    cardmarket = pricing.get("cardmarket") or {}
    variants = card.get("variants") or {}

    """Normalised data, for one card display"""
    return {
        "license": "Pokemon",
        "card_id": f"pokemon-{card.get('id')}",
        "card_number": card.get("localId"),
        "card_name": card.get("name"),
        "extension_id": card.get("id"),
        "extension_name": set_data.get("name"),
        "extension_total_card": card_count.get("official"),
        "extension_total_extended": card_count.get("total"),
        "illustrator": card.get("illustrator"),
        "card_image": card.get("image"),
        "rarity": card.get("rarity"),
        "description": card.get("description"),
        "euro": pricing.get("unit"),
        "avg_prices": cardmarket.get("avg"),
        "low_prices": cardmarket.get("low"),
        "trend_prices": cardmarket.get("trend"),
        "avg_holo_prices": cardmarket.get("avg-holo"),
        "low_holo_prices": cardmarket.get("low-holo"),
        "trend_holo_prices": cardmarket.get("trend-holo"),
        "variant": [v for v, status in variants.items() if status],
    }

def standardized_data_cards(cards: Dict[str, Any]) -> Dict[str, Any]:
    """Standardized data, for all cards display"""
    return {
        "license": "Pokemon",
        "card_id": f"pokemon-{cards.get('id')}",
        "card_number": cards.get("localId"),
        "card_name": cards.get("name"),
        "extension_id": cards.get("id"),
        "card_image": cards.get("image"),
    }

def standardized_data_extension(extension: Dict[str, Any]) -> Dict[str, Any]:
    """Standardized data, for all displayed extensions"""
    return {
            "license": "Pokemon",
            "extension_id": extension.get("id"),
            "extension_name": extension.get("name"),
            "extension_logo": extension.get("logo"),
            "extension_symbol": extension.get("symbol"),
            "extension_total_card": extension.get("cardCount", {}).get("official"),
        }

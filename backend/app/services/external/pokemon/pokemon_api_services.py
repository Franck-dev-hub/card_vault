import requests

LANGUAGE = "en"
BASE_URL = "https://api.tcgdex.net/v2/"


def fetch_extension():
    return requests.get(f"{BASE_URL}{LANGUAGE}/sets/")


def fetch_cards(extension: str):
    return requests.get(f"{BASE_URL}{LANGUAGE}/sets/{extension}")


def fetch_card(extension: str, card: str):
    return requests.get(f"{BASE_URL}{LANGUAGE}/sets/{extension}/{card}")

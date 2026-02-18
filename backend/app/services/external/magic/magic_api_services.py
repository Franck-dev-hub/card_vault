import httpx
import requests

BASE_URL = "https://api.scryfall.com/"

<<<<<<< HEAD
def fetch_extension():
    return requests.get(f"{BASE_URL}/sets")

def fetch_cards(extension: str):
    return requests.get(f"{BASE_URL}/cards/search", params={"q": f"set:{extension}"})

=======

def fetch_extension():
    return requests.get(f"{BASE_URL}/sets")


def fetch_cards(extension: str):
    return requests.get(f"{BASE_URL}/cards/search", params={"q": f"set:{extension}"})


>>>>>>> feat/ml
def fetch_card(extension: str, card: str):
    return requests.get(f"{BASE_URL}/cards/search", params={"q": f"set:{extension} name:\"{card}\""})

import requests

LANGUAGE = "en"
BASE_URL = "https://api.tcgdex.net/v2/"

<<<<<<< HEAD
def fetch_extension():
    return requests.get(f"{BASE_URL}{LANGUAGE}/sets/")

def fetch_cards(extension: str):
    return requests.get(f"{BASE_URL}{LANGUAGE}/sets/{extension}")

def fetch_card(extension: str, card: str):
    return requests.get(f"{BASE_URL}{LANGUAGE}/sets/{extension}/{card}")








=======

def fetch_extension():
    return requests.get(f"{BASE_URL}{LANGUAGE}/sets/")


def fetch_cards(extension: str):
    return requests.get(f"{BASE_URL}{LANGUAGE}/sets/{extension}")


def fetch_card(extension: str, card: str):
    return requests.get(f"{BASE_URL}{LANGUAGE}/sets/{extension}/{card}")
>>>>>>> feat/ml

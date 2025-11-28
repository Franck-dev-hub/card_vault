import requests
from PIL import Image
from io import BytesIO

API_URL = "https://api.tcgdex.net/v2/fr/cards"

# Fetch all cards
response = requests.get(f"{API_URL}")
cards = response.json()
iter = 0
error = 0
found = "Found"

for card in cards:
    # Download image
    try :
        image_url = card["image"]
        image_url += "/low.webp"
        img_response = requests.get(image_url)
        img = Image.open(BytesIO(img_response.content))
        # Save it locally
        img.save(f"images/{card["id"]}.webp")
        found = "Found"
    except KeyError:
        error += 1
        found = "Not found"
    iter += 1
    if found == "Found":
        print(f"Card no {iter} /// {found} /// Total not found {error}", end='\r')
    elif found == "Not found":
        print(f"Card no {iter} /// {found} /// Total not found {error}      ", end='\r')

print(f"Total images saved : {iter}")
print(f"Images not found : {error}")
print(f"Total time spent : {global_spent}")

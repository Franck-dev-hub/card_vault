import requests
from PIL import Image
from io import BytesIO
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed

API_URL = "https://api.tcgdex.net/v2/fr/cards"
OUTPUT_DIR = Path("scrapping/images")
OUTPUT_DIR.mkdir(exist_ok=True)

# Configuration
MAX_WORKERS = 5
TIMEOUT = 60

def download_card(card):
    # Download & save cards
    try:
        image_url = card["image"] + "/low.webp"
        img_response = requests.get(image_url, timeout=TIMEOUT)
        img_response.raise_for_status()

        img = Image.open(BytesIO(img_response.content))
        img.save(OUTPUT_DIR / f"{card['id']}.webp")
        return True, None
    except KeyError:
        return False, "Missing image field"
    except requests.RequestException as e:
        return False, f"Download error: {str(e)}"
    except Exception as e:
        return False, f"Processing error: {str(e)}"

def main():
    # Fetch all cards
    print("Fetch card list ...")
    response = requests.get(API_URL, timeout=TIMEOUT)
    response.raise_for_status()
    cards = response.json()

    total_cards = len(cards)
    print(f"Cards total: {total_cards}\n")

    success_count = 0
    error_count = 0
    errors_detail = {}

    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
        futures = {executor.submit(download_card, card): i for i, card in enumerate(cards)}

        for completed_future in as_completed(futures):
            index = futures[completed_future]
            success, error_msg = completed_future.result()

            if success:
                success_count += 1
            else:
                error_count += 1
                errors_detail[cards[index]["id"]] = error_msg

            # Display progression
            progress = success_count + error_count
            percentage = (progress / total_cards) * 100
            print(f"Progression: {progress}/{total_cards} ({percentage:.1f}%) - "
                  f"Success: {success_count} | Errors: {error_count}", end='\r')

    # Result
    print("\n" + "="*60)
    print(f"Images download : {success_count}")
    print(f"Errors : {error_count}")
    print("="*60)

    if errors_detail and error_count <= 10:
        print("\nErrors details:")
        for card_id, error in list(errors_detail.items())[:10]:
            print(f"  - {card_id}: {error}")

if __name__ == "__main__":
    main()

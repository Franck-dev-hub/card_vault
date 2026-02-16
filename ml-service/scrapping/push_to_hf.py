import os
from datasets import Dataset, Features, Image, Value

# Path to images
IMAGE_DIR = "images"

def create_and_upload():
    # List images
    images_files = [f for f in os.listdir(IMAGE_DIR)
                    if f.lower().endswith((".webp"))]

    # Prepare datas
    # Store full path and card name
    data = {
        "image": [os.path.join(IMAGE_DIR, f) for f in images_files],
        "name": [os.path.splitext(f)[0] for f in images_files]
    }

    # Define columns
    features = Features({
        "image": Image(),
        "name": Value("string")
    })

    # Create dataset
    print(f"Create dataset with {len(images_files)} images...")
    ds = Dataset.from_dict(data, features=features)

    # Send to Hugging Face
    ds.push_to_hub("Franck-dev/CardVault")
    print("Upload done !")

if __name__ == "__main__":
    create_and_upload()

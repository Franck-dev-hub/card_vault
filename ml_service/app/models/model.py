import os
import numpy as np
import torch
from pathlib import Path
from PIL import Image
from fastapi import HTTPException
from transformers import AutoImageProcessor, AutoModel
from datasets import load_dataset
from huggingface_hub import hf_hub_download
import faiss

# Configuration
BASE_DIR = Path(__file__).parent.absolute()
MODEL_NAME = "facebook/dinov2-small"
HF_DATASET_ID = "Franck-dev/CardVault"
DATA_DIR = BASE_DIR / "data_cache"
INDEX_FILE = DATA_DIR / "cards_index.faiss"
NAMES_FILE = DATA_DIR / "cards_metadata.npy"
BATCH_SIZE = 128
CONFIDENCE = 0.6
QUERY_PATH = BASE_DIR / "query.webp"

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

print(f"Loading {MODEL_NAME} on {device}")
processor = AutoImageProcessor.from_pretrained(MODEL_NAME, use_fast=True)
model = AutoModel.from_pretrained(MODEL_NAME).to(device)
model.eval()

def build_index():
    try:
        print("Research index on HF")
        hf_hub_download(
            repo_id=HF_DATASET_ID,
            filename="cards_index.faiss",
            repo_type="dataset",
            local_dir=str(DATA_DIR)
        )
        hf_hub_download(
            repo_id=HF_DATASET_ID,
            filename="cards_metadata.npy",
            repo_type="dataset",
            local_dir=str(DATA_DIR)
        )
        print("Index loaded from HF")
        return
    except Exception as e:
        print(f"No index found online ({e}). Building local index")

    # Fallback if construction not found
    ds = load_dataset(HF_DATASET_ID, split="train", streaming=True)

    # Fetch dimension dynamicly
    index = faiss.IndexFlatIP(model.config.hidden_size)
    metadata = []
    processed_count = 0

    print("Indexing cards")
    for batch in ds.iter(batch_size=BATCH_SIZE):
        try:
            images = [img.convert("RGB") for img in batch["image"]]
            inputs = processor(images=images, return_tensors="pt").to(device)

            with torch.no_grad():
                outputs = model(**inputs)
                embeddings = outputs.last_hidden_state[:, 0, :].float().cpu().numpy()

            embeddings = np.ascontiguousarray(embeddings.astype("float32"))
            faiss.normalize_L2(embeddings)
            index.add(embeddings)

            # Store Name + ID
            for name, id_card in zip(batch["name"], batch["id_card"]):
                metadata.append({"name": name, "id": id_card})

            processed_count += len(images)
            print(f"Indexed cards : {processed_count}", end='\r')

        except Exception as e:
            print(f"\nBatch error : {e}")
            continue

    if index.ntotal == 0 or len(metadata) == 0:
        print("\nError : Empty index. Check HF dataset")
        return

    print(f"\nSaving index in : {DATA_DIR}")
    os.makedirs(str(DATA_DIR), exist_ok=True)
    faiss.write_index(index, str(INDEX_FILE))
    np.save(str(NAMES_FILE), np.array(metadata, dtype=object))

def search_card():
    try:
        # If index doesn't exist, we build it
        if not os.path.exists(str(INDEX_FILE)) or not os.path.exists(str(NAMES_FILE)):
            build_index()

        # Load index and names
        index = faiss.read_index(str(INDEX_FILE))
        metadata = np.load(str(NAMES_FILE), allow_pickle=True)

        if index.ntotal == 0 or len(metadata) == 0:
            print("Empty index detected locally. Rebuilding...")
            build_index()
            # Reload after rebuild
            index = faiss.read_index(str(INDEX_FILE))
            metadata = np.load(str(NAMES_FILE), allow_pickle=True)

        # Prepare image to test
        query_img = Image.open(str(QUERY_PATH)).convert("RGB")
        inputs = processor(images=query_img, return_tensors="pt").to(device)

        with torch.no_grad():
            outputs = model(**inputs)
            query_emb = outputs.last_hidden_state[:, 0, :].cpu().numpy()

        faiss.normalize_L2(query_emb)

        # Get 3 best matches
        scores, indices = index.search(query_emb, 3)
        results = []

        for i in range(3):
            idx = indices[0][i]
            if idx == -1:
                print(f"#{i+1} : No match found.")
                continue
            score = scores[0][i]
            card_info = metadata[idx]
            results.append({
                "name": card_info["name"],
                "id": card_info["id"],
                "score": float(score)
            })

        return results

    except Exception as e:
        print(f"Search error: {type(e).__name__}: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    search_card()

import os
import numpy as np
import torch
from PIL import Image
from transformers import ViTImageProcessor, ViTModel
from datasets import load_dataset, load_dataset_builder
from huggingface_hub import hf_hub_download
import faiss

# Configuration
MODEL_NAME = "google/vit-base-patch16-224"
HF_DATASET_ID = "Franck-dev/CardVault"
DATA_DIR = "ml-service/data"
INDEX_FILE = os.path.join(DATA_DIR, "cards_index.faiss")
NAMES_FILE = os.path.join(DATA_DIR, "cards_names.npy")
BATCH_SIZE = 128
CONFIDENCE_THRESHOLD = 0.60

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
DEFAULT_QUERY = os.path.join(SCRIPT_DIR, "query.webp")

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

print(f"Initializing model on {device}")
processor = ViTImageProcessor.from_pretrained(MODEL_NAME)
model = ViTModel.from_pretrained(MODEL_NAME).to(device)
model.eval()

def get_total_rows():
    try:
        builder = load_dataset_builder(HF_DATASET_ID)
        return builder.info.splits['train'].num_examples
    except:
        return 0

def download_index_files():
    # Checks and downloads the index files from HF if missing
    os.makedirs(DATA_DIR, exist_ok=True)
    files_to_download = ["cards_index.faiss", "cards_names.npy"]

    for filename in files_to_download:
        dest_path = os.path.join(DATA_DIR, filename)
        if not os.path.exists(dest_path):
            print(f"Downloading {filename} from Hugging Face")
            hf_hub_download(
                repo_id=HF_DATASET_ID,
                filename=filename,
                repo_type="dataset",
                local_dir=DATA_DIR,
                local_dir_use_symlinks=False
            )

def build_index():
    # Fallback: Rebuilds the index from the streaming dataset
    print(f"Building index from dataset: {HF_DATASET_ID}")
    ds = load_dataset(HF_DATASET_ID, split="train", streaming=True)
    total_rows = get_total_rows()

    index = faiss.IndexFlatIP(768)
    all_names = []
    processed_count = 0

    for batch in ds.iter(batch_size=BATCH_SIZE):
        try:
            images = [img.convert("RGB") for img in batch["image"]]
            inputs = processor(images=images, return_tensors="pt").to(device)

            with torch.no_grad():
                with torch.cuda.amp.autocast():
                    outputs = model(**inputs)
                    embeddings = outputs.last_hidden_state[:, 0, :].float().cpu().numpy()

            faiss.normalize_L2(embeddings)
            index.add(embeddings)
            all_names.extend(batch["name"])

            processed_count += len(images)
            print(f"⚡ Progress: {processed_count} cards indexed", end='\r')

        except Exception as e:
            print(f"\nBatch Error: {e}")
            continue

    print(f"\nSaving index to: {DATA_DIR}")
    faiss.write_index(index, INDEX_FILE)
    np.save(NAMES_FILE, np.array(all_names))

def search_card(query_path):
    if not os.path.exists(query_path):
        print(f"Error: File not found at {query_path}")
        return

    # Attempt HF download
    try:
        download_index_files()
    except Exception as e:
        print(f"Could not download from HF: {e}")

    # Build if still missing
    if not os.path.exists(INDEX_FILE) or not os.path.exists(NAMES_FILE):
        build_index()

    # Perform Search
    index = faiss.read_index(INDEX_FILE)
    filenames = np.load(NAMES_FILE)

    query_img = Image.open(query_path).convert("RGB")
    inputs = processor(images=query_img, return_tensors="pt").to(device)

    with torch.no_grad():
        outputs = model(**inputs)
        query_emb = outputs.last_hidden_state[:, 0, :].cpu().numpy()

    faiss.normalize_L2(query_emb)
    scores, indices = index.search(query_emb, 1)

    best_idx = indices[0][0]
    score = scores[0][0]

    print("\n" + "="*50)
    if score > CONFIDENCE_THRESHOLD:
        print(f"Result: {filenames[best_idx]}")
        print(f"Confidence: {score:.4f}")
    else:
        print(f"Low confidence match")
        print(f"Best match found : {filenames[best_idx]}")
        print(f"Best score: {score:.4f}")
    print("="*50 + "\n")

if __name__ == "__main__":
    search_card(DEFAULT_QUERY)

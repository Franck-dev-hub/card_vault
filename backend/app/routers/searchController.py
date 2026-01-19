import os
import numpy as np
import torch
import faiss
from fastapi import FastAPI, UploadFile, File
from PIL import Image
from transformers import ViTImageProcessor, ViTModel

app = FastAPI()

# --- Global Warm-up ---
MODEL_NAME = "google/vit-base-patch16-224"
INDEX_FILE = "ml-service/data/cards_index.faiss"
NAMES_FILE = "ml-service/data/cards_names.npy"
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Load everything into RAM once on startup
print("Loading Model and Index...")
processor = ViTImageProcessor.from_pretrained(MODEL_NAME)
model = ViTModel.from_pretrained(MODEL_NAME).to(device).eval()
index = faiss.read_index(INDEX_FILE)
filenames = np.load(NAMES_FILE)

@app.post("/search")
async def search_card(file: UploadFile = File(...)):
    # 1. Read and Process Image
    img = Image.open(file.file).convert("RGB")
    inputs = processor(images=img, return_tensors="pt").to(device)

    # 2. Fast Inference
    with torch.no_grad():
        outputs = model(**inputs)
        # Use Pooler Output for slightly better semantic matching
        query_emb = outputs.last_hidden_state[:, 0, :].cpu().numpy()

    faiss.normalize_L2(query_emb)

    # 3. Vector Search
    scores, indices = index.search(query_emb, 1)

    score = float(scores[0][0])
    best_idx = int(indices[0][0])

    return {
        "filename": filenames[best_idx],
        "confidence": score,
        "is_match": score > 0.60
    }

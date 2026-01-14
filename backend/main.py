from fastapi import FastAPI
from app.routers import dashboardController
from fastapi.middleware.cors import CORSMiddleware
from app.routers import scan
from app.routers import search

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Port Vite
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(dashboardController.router)
app.include_router(scan.router)
app.include_router(search.router)

@app.get("/health")
def health():
    return {"status": "ok"}

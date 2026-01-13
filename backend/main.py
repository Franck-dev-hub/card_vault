from fastapi import FastAPI
from app.routers import dashboardController
from app.routers import scan
from app.routers import search

app = FastAPI()

app.include_router(dashboardController.router)
app.include_router(scan.router)
app.include_router(search.router)

@app.get("/health")
def health():
    return {"status": "ok"}

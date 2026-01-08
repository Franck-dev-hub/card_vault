from fastapi import FastAPI
from backend.app.routers import dashboardController

app = FastAPI()

app.include_router(dashboardController.router)

@app.get("/health")
def health():
    return {"status": "ok"}

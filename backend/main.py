from fastapi import FastAPI
from app.routers import dashboardController
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(redirect_slashes=True)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(dashboardController.router, prefix="/api")


@app.get("/api/health")
def health():
    return {"status": "ok"}

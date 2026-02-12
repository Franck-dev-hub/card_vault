from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.models.database import engine, Base
from app.models.user import User

#------------- routers -------------#
from app.routers import dashboard
from app.routers import scan
from app.routers import status
from app.routers import stats
from app.routers import search
from app.routers import vault
from app.routers.auth import login
from app.routers.auth import logout
from app.routers.auth import register

app = FastAPI(redirect_slashes=True)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables in the database
try:
    Base.metadata.create_all(engine)
except Exception as e:
    print(f"Warning: Could not create tables at startup: {e}")

#----------------------- router -----------------------#
app.include_router(dashboard.router, prefix="/api")
app.include_router(scan.router, prefix="/api")
app.include_router(search.router, prefix="/api")
app.include_router(stats.router, prefix="/api")
app.include_router(status.router, prefix="/api")
app.include_router(vault.router, prefix="/api")
app.include_router(login.router, prefix="/api")
app.include_router(logout.router, prefix="/api")
app.include_router(register.router, prefix="/api")


@app.get("/api/health")
def health():
    return {"status": "ok"}

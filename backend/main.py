from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import dashboardController
from app.routers import scanController
from app.routers import statusController
from app.routers import statsController
from app.routers import searchController
from app.routers import vaultController
from app.routers.auth import loginController
from app.routers.auth import logoutController
from app.routers.auth import registerController



app = FastAPI(redirect_slashes=True)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(dashboardController.router, prefix="/api")
app.include_router(scanController.router, prefix="/api")
app.include_router(searchController.router, prefix="/api")
app.include_router(statsController.router, prefix="/api")
app.include_router(statusController.router, prefix="/api")
app.include_router(vaultController.router, prefix="/api")
app.include_router(loginController.router, prefix="/api")
app.include_router(logoutController.router, prefix="/api")
app.include_router(registerController.router, prefix="/api")



@app.get("/api/health")
def health():
    return {"status": "ok"}

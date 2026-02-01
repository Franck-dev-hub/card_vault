from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
#------------- routers -------------#
from app.routers import dashboard_controller
from app.routers import scan_controller
from app.routers import status_controller
from app.routers import stats_controller
from app.routers import search_controller
from app.routers import vault_controller
from app.routers.auth import login_controller
from app.routers.auth import logout_controller
from app.routers.auth import register_controller
app = FastAPI(redirect_slashes=True)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#----------------------- router -----------------------#
app.include_router(dashboard_controller.router, prefix="/api")
app.include_router(scan_controller.router, prefix="/api")
app.include_router(search_controller.router, prefix="/api")
app.include_router(stats_controller.router, prefix="/api")
app.include_router(status_controller.router, prefix="/api")
app.include_router(vault_controller.router, prefix="/api")
app.include_router(login_controller.router, prefix="/api")
app.include_router(logout_controller.router, prefix="/api")
app.include_router(register_controller.router, prefix="/api")


@app.get("/api/health")
def health():
    return {"status": "ok"}

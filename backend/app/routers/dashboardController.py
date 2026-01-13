from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
router = APIRouter(prefix="/dashboard", tags=["dashboard"])
template = Jinja2Templates(directory="templates")

@router.get("/", response_class=HTMLResponse)
async def get_dashboard(request: Request):
    return template.TemplateResponse(
        request=request,
        name="dashboard.html",
    )

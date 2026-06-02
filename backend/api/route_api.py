from typing import Literal

from fastapi import APIRouter, Depends, Query

from app.dependencies import get_route_service
from services.route_service import RouteService
from utils.response import success_response


router = APIRouter(prefix="/api/v1")


@router.get("/routes/feed")
def get_route_feed(
    page: int = Query(ge=1),
    size: int = Query(ge=1, le=50),
    activity_type: Literal["RUN"] = Query(),
    route_service: RouteService = Depends(get_route_service),
):
    return success_response(route_service.get_feed(page, size, activity_type))

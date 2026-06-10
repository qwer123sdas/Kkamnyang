from typing import Literal

from fastapi import APIRouter, Depends, Header, Query
from pydantic import BaseModel, Field

from app.dependencies import (
    get_auth_service,
    get_bearer_token,
    get_current_auth_user,
    get_route_service,
)
from services.auth_service import AuthUser
from services.route_service import RouteService
from utils.response import success_response


router = APIRouter(prefix="/api/v1")


class RouteCommentCreateRequest(BaseModel):
    content: str = Field(min_length=1, max_length=1000)


class RouteCommentUpdateRequest(BaseModel):
    content: str = Field(min_length=1, max_length=1000)


class ActivityStartRequest(BaseModel):
    activity_type: Literal["RUN"]


class GeoPointRequest(BaseModel):
    lat: float
    lng: float


class RouteGeoJsonRequest(BaseModel):
    type: Literal["LineString"]
    coordinates: list[list[float]]


class ActivityFinishRequest(BaseModel):
    title: str = Field(min_length=1, max_length=100)
    description: str = Field(max_length=1000)
    visibility: Literal["PUBLIC", "PRIVATE"]
    encoded_polyline: str = Field(min_length=1)
    route_geojson: RouteGeoJsonRequest
    start_point: GeoPointRequest
    end_point: GeoPointRequest
    distance_km: float = Field(ge=0)
    duration_sec: int = Field(ge=0)


@router.get("/routes/feed")
def get_route_feed(
    page: int = Query(ge=1),
    size: int = Query(ge=1, le=50),
    activity_type: Literal["RUN"] = Query(),
    route_service: RouteService = Depends(get_route_service),
):
    return success_response(route_service.get_feed(page, size, activity_type))


def get_optional_auth_user(
    authorization: str | None = Header(default=None),
) -> AuthUser | None:
    if not authorization:
        return None

    access_token = get_bearer_token(authorization)
    return get_auth_service().verify_access_token(access_token)


@router.get("/routes/me")
def get_my_routes(
    page: int = Query(ge=1),
    size: int = Query(ge=1, le=50),
    auth_user: AuthUser = Depends(get_current_auth_user),
    route_service: RouteService = Depends(get_route_service),
):
    return success_response(
        route_service.get_my_routes(page, size, auth_user.user_id),
    )


@router.get("/bookmarks/me")
def get_bookmarks(
    page: int = Query(ge=1),
    size: int = Query(ge=1, le=50),
    auth_user: AuthUser = Depends(get_current_auth_user),
    route_service: RouteService = Depends(get_route_service),
):
    return success_response(
        route_service.get_bookmarks(page, size, auth_user.user_id),
    )


@router.get("/routes/{route_id}/similar")
def get_similar_routes(
    route_id: int,
    route_service: RouteService = Depends(get_route_service),
):
    return success_response(route_service.get_similar_routes(route_id))


@router.get("/routes/{route_id}/history")
def get_route_history(
    route_id: int,
    page: int = Query(ge=1),
    size: int = Query(ge=1, le=50),
    route_service: RouteService = Depends(get_route_service),
):
    return success_response(route_service.get_route_history(route_id, page, size))


@router.post("/activities/start")
def start_activity(
    body: ActivityStartRequest,
    auth_user: AuthUser = Depends(get_current_auth_user),
    route_service: RouteService = Depends(get_route_service),
):
    return success_response(
        route_service.start_activity(auth_user.user_id, body.activity_type),
    )


@router.post("/activities/{activity_id}/finish")
def finish_activity(
    activity_id: int,
    body: ActivityFinishRequest,
    auth_user: AuthUser = Depends(get_current_auth_user),
    route_service: RouteService = Depends(get_route_service),
):
    return success_response(
        route_service.finish_activity(
            activity_id,
            auth_user.user_id,
            body.model_dump(),
        ),
    )


@router.get("/routes/{route_id}")
def get_route_detail(
    route_id: int,
    auth_user: AuthUser | None = Depends(get_optional_auth_user),
    route_service: RouteService = Depends(get_route_service),
):
    viewer_user_id = auth_user.user_id if auth_user else None
    return success_response(route_service.get_detail(route_id, viewer_user_id))


@router.post("/routes/{route_id}/like")
def like_route(
    route_id: int,
    auth_user: AuthUser = Depends(get_current_auth_user),
    route_service: RouteService = Depends(get_route_service),
):
    return success_response(route_service.like(route_id, auth_user.user_id))


@router.delete("/routes/{route_id}/like")
def unlike_route(
    route_id: int,
    auth_user: AuthUser = Depends(get_current_auth_user),
    route_service: RouteService = Depends(get_route_service),
):
    return success_response(route_service.unlike(route_id, auth_user.user_id))


@router.post("/routes/{route_id}/bookmark")
def bookmark_route(
    route_id: int,
    auth_user: AuthUser = Depends(get_current_auth_user),
    route_service: RouteService = Depends(get_route_service),
):
    return success_response(route_service.bookmark(route_id, auth_user.user_id))


@router.delete("/routes/{route_id}/bookmark")
def unbookmark_route(
    route_id: int,
    auth_user: AuthUser = Depends(get_current_auth_user),
    route_service: RouteService = Depends(get_route_service),
):
    return success_response(route_service.unbookmark(route_id, auth_user.user_id))


@router.get("/routes/{route_id}/comments")
def get_route_comments(
    route_id: int,
    page: int = Query(ge=1),
    size: int = Query(ge=1, le=50),
    route_service: RouteService = Depends(get_route_service),
):
    return success_response(route_service.get_comments(route_id, page, size))


@router.post("/routes/{route_id}/comments")
def create_route_comment(
    route_id: int,
    body: RouteCommentCreateRequest,
    auth_user: AuthUser = Depends(get_current_auth_user),
    route_service: RouteService = Depends(get_route_service),
):
    return success_response(
        route_service.create_comment(route_id, auth_user.user_id, body.content),
    )


@router.patch("/routes/{route_id}/comments/{comment_id}")
def update_route_comment(
    route_id: int,
    comment_id: int,
    body: RouteCommentUpdateRequest,
    auth_user: AuthUser = Depends(get_current_auth_user),
    route_service: RouteService = Depends(get_route_service),
):
    return success_response(
        route_service.update_comment(
            route_id,
            comment_id,
            auth_user.user_id,
            body.content,
        ),
    )


@router.delete("/routes/{route_id}/comments/{comment_id}")
def delete_route_comment(
    route_id: int,
    comment_id: int,
    auth_user: AuthUser = Depends(get_current_auth_user),
    route_service: RouteService = Depends(get_route_service),
):
    return success_response(
        route_service.delete_comment(route_id, comment_id, auth_user.user_id),
    )

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

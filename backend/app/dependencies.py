from fastapi import Header

from app.config import get_settings
from repositories.route_repository import RouteRepository
from repositories.user_repository import UserRepository
from services.auth_service import AuthService
from services.route_service import RouteService
from services.user_service import UserService
from utils.response import ApiError


def get_bearer_token(authorization: str | None = Header(default=None)) -> str:
    if not authorization or not authorization.startswith("Bearer "):
        raise ApiError(401, "Authentication required", "AUTH_REQUIRED")

    token = authorization.removeprefix("Bearer ").strip()

    if not token:
        raise ApiError(401, "Authentication required", "AUTH_REQUIRED")

    return token


def get_auth_service() -> AuthService:
    return AuthService(get_settings())


def get_current_auth_user(
    token: str = Header(default=None, alias="Authorization"),
):
    access_token = get_bearer_token(token)
    return get_auth_service().verify_access_token(access_token)


def get_user_service() -> UserService:
    settings = get_settings()
    return UserService(UserRepository(settings))


def get_route_service() -> RouteService:
    settings = get_settings()
    return RouteService(RouteRepository(settings))

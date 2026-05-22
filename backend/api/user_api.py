from fastapi import APIRouter, Depends

from app.dependencies import get_current_auth_user, get_user_service
from services.auth_service import AuthUser
from services.user_service import UserService
from utils.response import success_response


router = APIRouter(prefix="/api/v1")


@router.get("/users/me")
def get_me(
    auth_user: AuthUser = Depends(get_current_auth_user),
    user_service: UserService = Depends(get_user_service),
):
    user = user_service.get_or_create_user(auth_user)
    return success_response(user)

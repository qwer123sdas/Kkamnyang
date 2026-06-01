from fastapi.testclient import TestClient

from app.dependencies import get_current_auth_user, get_user_service
from app.main import app
from services.auth_service import AuthUser


class FakeUserService:
    def get_or_create_user(self, auth_user: AuthUser):
        assert auth_user.user_id == "00000000-0000-0000-0000-000000000001"
        return {
            "user_id": auth_user.user_id,
            "login_id": None,
            "email": auth_user.email,
            "nickname": auth_user.nickname,
            "profile_image_url": auth_user.profile_image_url,
        }


def override_current_auth_user():
    return AuthUser(
        user_id="00000000-0000-0000-0000-000000000001",
        email="user@test.com",
        nickname="Runner",
        profile_image_url=None,
        auth_provider="GOOGLE",
    )


def override_user_service():
    return FakeUserService()


def test_users_me_returns_user_from_verified_bearer_token():
    app.dependency_overrides[get_current_auth_user] = override_current_auth_user
    app.dependency_overrides[get_user_service] = override_user_service
    client = TestClient(app)

    response = client.get(
        "/api/v1/users/me",
        headers={"Authorization": "Bearer access-token"},
    )

    assert response.status_code == 200
    assert response.json() == {
        "success": True,
        "data": {
            "user_id": "00000000-0000-0000-0000-000000000001",
            "login_id": None,
            "email": "user@test.com",
            "nickname": "Runner",
            "profile_image_url": None,
        },
        "message": None,
    }
    app.dependency_overrides.clear()


def test_users_me_requires_bearer_token():
    client = TestClient(app)

    response = client.get("/api/v1/users/me")

    assert response.status_code == 401
    assert response.json() == {
        "success": False,
        "data": None,
        "message": "Authentication required",
        "error_code": "AUTH_REQUIRED",
    }

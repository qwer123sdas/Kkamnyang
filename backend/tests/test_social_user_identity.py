from app.config import Settings
from repositories.user_repository import UserRepository
from services.auth_service import AuthService, AuthUser


USER_ID = "00000000-0000-0000-0000-00000000abcd"
SETTINGS = Settings(
    supabase_url="",
    supabase_anon_key="",
    supabase_service_role_key="",
)


class CapturingUserRepository(UserRepository):
    def __init__(self):
        super().__init__(SETTINGS)
        self.request = None

    def _request(self, method, path, body=None, extra_headers=None):
        self.request = {
            "method": method,
            "path": path,
            "body": body,
            "extra_headers": extra_headers,
        }
        return [
            {
                "user_id": USER_ID,
                "login_id": "social_00000000000000000000000",
                "email": "user@test.com",
                "nickname": "Runner",
                "profile_image_url": None,
            }
        ]


def test_auth_user_parses_social_provider():
    auth_user = AuthService(SETTINGS)._parse_auth_user(
        {
            "id": USER_ID,
            "email": "user@test.com",
            "app_metadata": {"provider": "google"},
            "user_metadata": {"name": "Runner"},
        }
    )

    assert auth_user.auth_provider == "GOOGLE"


def test_social_user_creation_uses_generated_login_id_as_audit_actor():
    repository = CapturingUserRepository()
    auth_user = AuthUser(
        user_id=USER_ID,
        email="user@test.com",
        nickname="Runner",
        profile_image_url=None,
        auth_provider="GOOGLE",
    )

    repository.create_from_auth_user(auth_user)

    assert repository.request == {
        "method": "POST",
        "path": "/rest/v1/users",
        "body": {
            "user_id": USER_ID,
            "auth_provider": "GOOGLE",
            "login_id": "social_00000000000000000000000",
            "email": "user@test.com",
            "nickname": "Runner",
            "profile_image_url": None,
            "created_by": "social_00000000000000000000000",
            "updated_by": "social_00000000000000000000000",
            "deleted_yn": "N",
        },
        "extra_headers": {"Prefer": "return=representation"},
    }

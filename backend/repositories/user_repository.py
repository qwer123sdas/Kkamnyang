import json
from typing import Any
from urllib.error import HTTPError, URLError
from urllib.parse import quote
from urllib.request import Request, urlopen

from app.config import Settings
from services.auth_service import AuthUser
from utils.response import ApiError


USER_SELECT = "user_id,login_id,email,nickname,profile_image_url"


class UserRepository:
    def __init__(self, settings: Settings):
        self.settings = settings

    def get_by_user_id(self, user_id: str) -> dict[str, Any] | None:
        payload = self._request(
            method="GET",
            path=(
                "/rest/v1/users"
                f"?user_id=eq.{quote(user_id)}"
                f"&deleted_yn=eq.N"
                f"&select={quote(USER_SELECT)}"
            ),
        )

        if not isinstance(payload, list):
            raise ApiError(500, "Invalid users response", "INTERNAL_ERROR")

        return payload[0] if payload else None

    def create_from_auth_user(self, auth_user: AuthUser) -> dict[str, Any]:
        payload = self._request(
            method="POST",
            path="/rest/v1/users",
            body={
                "user_id": auth_user.user_id,
                "login_id": None,
                "email": auth_user.email,
                "nickname": auth_user.nickname,
                "profile_image_url": auth_user.profile_image_url,
                "created_by": None,
                "updated_by": None,
                "deleted_yn": "N",
            },
            extra_headers={"Prefer": "return=representation"},
        )

        if not isinstance(payload, list) or not payload:
            raise ApiError(500, "Invalid created user response", "INTERNAL_ERROR")

        return self._to_user_response(payload[0])

    def _request(
        self,
        method: str,
        path: str,
        body: dict[str, Any] | None = None,
        extra_headers: dict[str, str] | None = None,
    ):
        if not self.settings.supabase_url or not self.settings.supabase_service_role_key:
            raise ApiError(500, "Supabase database is not configured", "INTERNAL_ERROR")

        data = json.dumps(body).encode("utf-8") if body is not None else None
        request = Request(
            f"{self.settings.supabase_url}{path}",
            data=data,
            headers={
                "Authorization": f"Bearer {self.settings.supabase_service_role_key}",
                "apikey": self.settings.supabase_service_role_key,
                "Content-Type": "application/json",
                **(extra_headers or {}),
            },
            method=method,
        )

        try:
            with urlopen(request, timeout=10) as response:
                raw = response.read().decode("utf-8")
        except HTTPError:
            raise ApiError(500, "Supabase database request failed", "INTERNAL_ERROR")
        except (URLError, TimeoutError):
            raise ApiError(500, "Supabase database request failed", "INTERNAL_ERROR")

        return json.loads(raw) if raw else None

    def _to_user_response(self, row: dict[str, Any]) -> dict[str, Any]:
        return {
            "user_id": row.get("user_id"),
            "login_id": row.get("login_id"),
            "email": row.get("email"),
            "nickname": row.get("nickname"),
            "profile_image_url": row.get("profile_image_url"),
        }

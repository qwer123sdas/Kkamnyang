import json
from dataclasses import dataclass
from typing import Any
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

from app.config import Settings
from utils.response import ApiError


@dataclass(frozen=True)
class AuthUser:
    user_id: str
    email: str | None
    nickname: str | None
    profile_image_url: str | None


class AuthService:
    def __init__(self, settings: Settings):
        self.settings = settings

    def verify_access_token(self, access_token: str) -> AuthUser:
        if not self.settings.supabase_url or not self.settings.supabase_anon_key:
            raise ApiError(500, "Supabase auth is not configured", "INTERNAL_ERROR")

        request = Request(
            f"{self.settings.supabase_url}/auth/v1/user",
            headers={
                "Authorization": f"Bearer {access_token}",
                "apikey": self.settings.supabase_anon_key,
            },
            method="GET",
        )

        try:
            with urlopen(request, timeout=10) as response:
                payload = json.loads(response.read().decode("utf-8"))
        except HTTPError:
            raise ApiError(401, "Invalid token", "INVALID_TOKEN")
        except (URLError, TimeoutError):
            raise ApiError(500, "Supabase auth request failed", "INTERNAL_ERROR")

        return self._parse_auth_user(payload)

    def _parse_auth_user(self, payload: dict[str, Any]) -> AuthUser:
        user_id = payload.get("id")

        if not isinstance(user_id, str) or not user_id:
            raise ApiError(401, "Invalid token", "INVALID_TOKEN")

        metadata = payload.get("user_metadata")
        if not isinstance(metadata, dict):
            metadata = {}

        nickname = metadata.get("name") or metadata.get("full_name") or metadata.get("nickname")
        avatar_url = metadata.get("avatar_url") or metadata.get("picture")

        return AuthUser(
            user_id=user_id,
            email=payload.get("email") if isinstance(payload.get("email"), str) else None,
            nickname=nickname if isinstance(nickname, str) else None,
            profile_image_url=avatar_url if isinstance(avatar_url, str) else None,
        )

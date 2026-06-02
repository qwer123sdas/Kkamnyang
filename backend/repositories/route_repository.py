import json
import logging
from typing import Any
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode
from urllib.request import Request, urlopen

from app.config import Settings
from utils.response import ApiError


ROUTE_SELECT = (
    "route_id,title,description,activity_type,visibility,encoded_polyline,"
    "distance_km,duration_sec,like_count,comment_count,bookmark_count,created_at,"
    "users!inner(user_id,login_id,nickname)"
)
logger = logging.getLogger(__name__)


class RouteRepository:
    def __init__(self, settings: Settings):
        self.settings = settings

    def list_public_routes(self, page: int, size: int, activity_type: str):
        payload = self._request(
            method="GET",
            path=(
                "/rest/v1/routes?"
                + urlencode(
                    {
                        "visibility": "eq.PUBLIC",
                        "deleted_yn": "eq.N",
                        "activity_type": f"eq.{activity_type}",
                        "users.deleted_yn": "eq.N",
                        "select": ROUTE_SELECT,
                        "order": "created_at.desc",
                        "offset": (page - 1) * size,
                        "limit": size + 1,
                    }
                )
            ),
        )

        if not isinstance(payload, list):
            raise ApiError(500, "Invalid routes response", "INTERNAL_ERROR")

        return [self._to_route_response(row) for row in payload]

    def _request(self, method: str, path: str):
        if not self.settings.supabase_url or not self.settings.supabase_service_role_key:
            raise ApiError(500, "Supabase database is not configured", "INTERNAL_ERROR")

        request = Request(
            f"{self.settings.supabase_url}{path}",
            headers={
                "Authorization": f"Bearer {self.settings.supabase_service_role_key}",
                "apikey": self.settings.supabase_service_role_key,
                "Content-Type": "application/json",
            },
            method=method,
        )

        try:
            with urlopen(request, timeout=10) as response:
                raw = response.read().decode("utf-8")
        except HTTPError as error:
            postgrest_code = "UNKNOWN"
            try:
                error_payload = json.loads(error.read().decode("utf-8"))
                if isinstance(error_payload, dict) and isinstance(error_payload.get("code"), str):
                    postgrest_code = error_payload["code"]
            except (UnicodeDecodeError, json.JSONDecodeError):
                pass

            logger.warning(
                "Supabase routes request failed status=%s postgrest_code=%s",
                error.code,
                postgrest_code,
            )
            raise ApiError(500, "Supabase database request failed", "INTERNAL_ERROR")
        except (URLError, TimeoutError):
            raise ApiError(500, "Supabase database request failed", "INTERNAL_ERROR")

        return json.loads(raw) if raw else None

    def _to_route_response(self, row: dict[str, Any]) -> dict[str, Any]:
        user = row.get("users")

        if not isinstance(user, dict):
            raise ApiError(500, "Invalid routes response", "INTERNAL_ERROR")

        distance_km = row.get("distance_km")
        try:
            normalized_distance_km = float(distance_km) if distance_km is not None else None
        except (TypeError, ValueError):
            raise ApiError(500, "Invalid routes response", "INTERNAL_ERROR")

        return {
            "route_id": row.get("route_id"),
            "title": row.get("title"),
            "description": row.get("description"),
            "activity_type": row.get("activity_type"),
            "visibility": row.get("visibility"),
            "encoded_polyline": row.get("encoded_polyline"),
            "distance_km": normalized_distance_km,
            "duration_sec": row.get("duration_sec"),
            "like_count": row.get("like_count"),
            "comment_count": row.get("comment_count"),
            "bookmark_count": row.get("bookmark_count"),
            "created_at": row.get("created_at"),
            "user": {
                "user_id": user.get("user_id"),
                "login_id": user.get("login_id"),
                "nickname": user.get("nickname"),
            },
        }

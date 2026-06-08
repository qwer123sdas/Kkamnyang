import json
import logging
from datetime import datetime, timezone
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
ROUTE_DETAIL_SELECT = (
    "route_id,title,description,activity_type,visibility,encoded_polyline,"
    "route_geojson,distance_km,duration_sec,like_count,comment_count,"
    "bookmark_count,created_at,users!inner(user_id,login_id,nickname)"
)
MY_ROUTE_SELECT = (
    "route_id,title,activity_type,visibility,encoded_polyline,"
    "distance_km,duration_sec,created_at"
)
COMMENT_SELECT = "comment_id,content,created_at,users!inner(user_id,login_id,nickname)"
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

    def get_route_detail(self, route_id: int):
        payload = self._request(
            method="GET",
            path=(
                "/rest/v1/routes?"
                + urlencode(
                    {
                        "route_id": f"eq.{route_id}",
                        "deleted_yn": "eq.N",
                        "users.deleted_yn": "eq.N",
                        "select": ROUTE_DETAIL_SELECT,
                        "limit": 1,
                    }
                )
            ),
        )

        if not isinstance(payload, list):
            raise ApiError(500, "Invalid route response", "INTERNAL_ERROR")

        if not payload:
            return None

        return self._to_route_detail_response(payload[0])

    def list_my_routes(self, page: int, size: int, user_id: str):
        payload = self._request(
            method="GET",
            path=(
                "/rest/v1/routes?"
                + urlencode(
                    {
                        "user_id": f"eq.{user_id}",
                        "deleted_yn": "eq.N",
                        "select": MY_ROUTE_SELECT,
                        "order": "created_at.desc",
                        "offset": (page - 1) * size,
                        "limit": size + 1,
                    }
                )
            ),
        )

        if not isinstance(payload, list):
            raise ApiError(500, "Invalid my routes response", "INTERNAL_ERROR")

        return [self._to_my_route_response(row) for row in payload]

    def set_route_liked(
        self,
        route_id: int,
        user_id: str,
        actor: str,
        is_liked: bool,
    ) -> dict[str, Any]:
        return self._set_route_action(
            table="route_likes",
            count_column="like_count",
            route_id=route_id,
            user_id=user_id,
            actor=actor,
            active=is_liked,
        )

    def set_route_bookmarked(
        self,
        route_id: int,
        user_id: str,
        actor: str,
        is_bookmarked: bool,
    ) -> dict[str, Any]:
        return self._set_route_action(
            table="route_bookmarks",
            count_column="bookmark_count",
            route_id=route_id,
            user_id=user_id,
            actor=actor,
            active=is_bookmarked,
        )

    def is_route_liked(self, route_id: int, user_id: str) -> bool:
        return self._is_route_action_active("route_likes", route_id, user_id)

    def is_route_bookmarked(self, route_id: int, user_id: str) -> bool:
        return self._is_route_action_active("route_bookmarks", route_id, user_id)

    def list_route_comments(self, route_id: int, page: int, size: int):
        payload = self._request(
            method="GET",
            path=(
                "/rest/v1/route_comments?"
                + urlencode(
                    {
                        "route_id": f"eq.{route_id}",
                        "deleted_yn": "eq.N",
                        "users.deleted_yn": "eq.N",
                        "select": COMMENT_SELECT,
                        "order": "created_at.asc",
                        "offset": (page - 1) * size,
                        "limit": size + 1,
                    }
                )
            ),
        )

        if not isinstance(payload, list):
            raise ApiError(500, "Invalid comments response", "INTERNAL_ERROR")

        return [self._to_comment_response(row) for row in payload]

    def create_route_comment(
        self,
        route_id: int,
        user_id: str,
        content: str,
        actor: str,
    ) -> dict[str, Any]:
        payload = self._request(
            method="POST",
            path="/rest/v1/route_comments",
            body={
                "route_id": route_id,
                "user_id": user_id,
                "content": content,
                "created_by": actor,
                "updated_by": actor,
                "deleted_yn": "N",
            },
            extra_headers={"Prefer": "return=representation"},
        )

        if not isinstance(payload, list) or not payload:
            raise ApiError(500, "Invalid created comment response", "INTERNAL_ERROR")

        next_count = self._count_active_route_comments(route_id)
        self._update_route_count(route_id, "comment_count", next_count)

        return {
            "comment_id": payload[0].get("comment_id"),
            "route_id": payload[0].get("route_id"),
            "content": payload[0].get("content"),
            "created_at": payload[0].get("created_at"),
        }

    def get_route_comment(self, route_id: int, comment_id: int):
        payload = self._request(
            method="GET",
            path=(
                "/rest/v1/route_comments?"
                + urlencode(
                    {
                        "route_id": f"eq.{route_id}",
                        "comment_id": f"eq.{comment_id}",
                        "deleted_yn": "eq.N",
                        "select": "comment_id,route_id,user_id",
                        "limit": 1,
                    }
                )
            ),
        )

        if not isinstance(payload, list):
            raise ApiError(500, "Invalid comment response", "INTERNAL_ERROR")

        return payload[0] if payload else None

    def update_route_comment(
        self,
        route_id: int,
        comment_id: int,
        content: str,
        actor: str,
    ) -> dict[str, Any]:
        payload = self._request(
            method="PATCH",
            path=(
                "/rest/v1/route_comments?"
                + urlencode(
                    {
                        "route_id": f"eq.{route_id}",
                        "comment_id": f"eq.{comment_id}",
                        "deleted_yn": "eq.N",
                    }
                )
            ),
            body={
                "content": content,
                "updated_at": datetime.now(timezone.utc).isoformat(),
                "updated_by": actor,
            },
            extra_headers={"Prefer": "return=representation"},
        )

        if not isinstance(payload, list) or not payload:
            raise ApiError(500, "Invalid updated comment response", "INTERNAL_ERROR")

        return {
            "comment_id": payload[0].get("comment_id"),
            "route_id": payload[0].get("route_id"),
            "content": payload[0].get("content"),
            "created_at": payload[0].get("created_at"),
        }

    def delete_route_comment(
        self,
        route_id: int,
        comment_id: int,
        actor: str,
    ) -> dict[str, Any]:
        self._request(
            method="PATCH",
            path=(
                "/rest/v1/route_comments?"
                + urlencode(
                    {
                        "route_id": f"eq.{route_id}",
                        "comment_id": f"eq.{comment_id}",
                        "deleted_yn": "eq.N",
                    }
                )
            ),
            body={
                "deleted_yn": "Y",
                "deleted_at": datetime.now(timezone.utc).isoformat(),
                "updated_at": datetime.now(timezone.utc).isoformat(),
                "updated_by": actor,
            },
            extra_headers={"Prefer": "return=minimal"},
        )

        next_count = self._count_active_route_comments(route_id)
        self._update_route_count(route_id, "comment_count", next_count)

        return {
            "comment_id": comment_id,
            "route_id": route_id,
        }

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

    def _to_route_detail_response(self, row: dict[str, Any]) -> dict[str, Any]:
        route = self._to_route_response(row)
        route["route_geojson"] = row.get("route_geojson") or {
            "type": "LineString",
            "coordinates": [],
        }
        route["is_liked"] = False
        route["is_bookmarked"] = False

        return route

    def _to_my_route_response(self, row: dict[str, Any]) -> dict[str, Any]:
        distance_km = row.get("distance_km")
        try:
            normalized_distance_km = float(distance_km) if distance_km is not None else None
        except (TypeError, ValueError):
            raise ApiError(500, "Invalid my routes response", "INTERNAL_ERROR")

        return {
            "route_id": row.get("route_id"),
            "title": row.get("title"),
            "activity_type": row.get("activity_type"),
            "visibility": row.get("visibility"),
            "encoded_polyline": row.get("encoded_polyline"),
            "distance_km": normalized_distance_km,
            "duration_sec": row.get("duration_sec"),
            "created_at": row.get("created_at"),
        }

    def _to_comment_response(self, row: dict[str, Any]) -> dict[str, Any]:
        user = row.get("users")

        if not isinstance(user, dict):
            raise ApiError(500, "Invalid comments response", "INTERNAL_ERROR")

        return {
            "comment_id": row.get("comment_id"),
            "content": row.get("content"),
            "created_at": row.get("created_at"),
            "user": {
                "user_id": user.get("user_id"),
                "login_id": user.get("login_id"),
                "nickname": user.get("nickname"),
            },
        }

    def _get_route_action(self, table: str, route_id: int, user_id: str):
        payload = self._request(
            method="GET",
            path=(
                f"/rest/v1/{table}?"
                + urlencode(
                    {
                        "route_id": f"eq.{route_id}",
                        "user_id": f"eq.{user_id}",
                        "select": "deleted_yn",
                        "limit": 1,
                    }
                )
            ),
        )

        if not isinstance(payload, list):
            raise ApiError(500, "Invalid route action response", "INTERNAL_ERROR")

        return payload[0] if payload else None

    def _is_route_action_active(self, table: str, route_id: int, user_id: str) -> bool:
        action = self._get_route_action(table, route_id, user_id)
        return bool(action and action.get("deleted_yn") == "N")

    def _set_route_action(
        self,
        table: str,
        count_column: str,
        route_id: int,
        user_id: str,
        actor: str,
        active: bool,
    ) -> dict[str, Any]:
        action = self._get_route_action(table, route_id, user_id)

        if active:
            if not action:
                self._request(
                    method="POST",
                    path=f"/rest/v1/{table}",
                    body={
                        "route_id": route_id,
                        "user_id": user_id,
                        "created_by": actor,
                        "updated_by": actor,
                        "deleted_yn": "N",
                    },
                    extra_headers={"Prefer": "return=minimal"},
                )
            elif action.get("deleted_yn") != "N":
                self._update_route_action(table, route_id, user_id, actor, "N")
        elif action and action.get("deleted_yn") == "N":
            self._update_route_action(table, route_id, user_id, actor, "Y")

        next_count = self._count_active_route_actions(table, route_id)
        self._update_route_count(route_id, count_column, next_count)

        return {
            "route_id": route_id,
            count_column: next_count,
        }

    def _update_route_action(
        self,
        table: str,
        route_id: int,
        user_id: str,
        actor: str,
        deleted_yn: str,
    ) -> None:
        body: dict[str, Any] = {
            "deleted_yn": deleted_yn,
            "updated_at": datetime.now(timezone.utc).isoformat(),
            "updated_by": actor,
        }

        if deleted_yn == "N":
            body["deleted_at"] = None
        else:
            body["deleted_at"] = datetime.now(timezone.utc).isoformat()

        self._request(
            method="PATCH",
            path=(
                f"/rest/v1/{table}?"
                + urlencode(
                    {
                        "route_id": f"eq.{route_id}",
                        "user_id": f"eq.{user_id}",
                    }
                )
            ),
            body=body,
            extra_headers={"Prefer": "return=minimal"},
        )

    def _count_active_route_actions(self, table: str, route_id: int) -> int:
        payload = self._request(
            method="GET",
            path=(
                f"/rest/v1/{table}?"
                + urlencode(
                    {
                        "route_id": f"eq.{route_id}",
                        "deleted_yn": "eq.N",
                        "select": "route_id",
                    }
                )
            ),
        )

        if not isinstance(payload, list):
            raise ApiError(500, "Invalid route action count response", "INTERNAL_ERROR")

        return len(payload)

    def _count_active_route_comments(self, route_id: int) -> int:
        payload = self._request(
            method="GET",
            path=(
                "/rest/v1/route_comments?"
                + urlencode(
                    {
                        "route_id": f"eq.{route_id}",
                        "deleted_yn": "eq.N",
                        "select": "route_id",
                    }
                )
            ),
        )

        if not isinstance(payload, list):
            raise ApiError(500, "Invalid comment count response", "INTERNAL_ERROR")

        return len(payload)

    def _update_route_count(self, route_id: int, count_column: str, count: int) -> None:
        self._request(
            method="PATCH",
            path=(
                "/rest/v1/routes?"
                + urlencode(
                    {
                        "route_id": f"eq.{route_id}",
                    }
                )
            ),
            body={
                count_column: count,
            },
            extra_headers={"Prefer": "return=minimal"},
        )

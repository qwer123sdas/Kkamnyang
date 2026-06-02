from io import BytesIO
from urllib.error import HTTPError
from urllib.parse import parse_qs, urlsplit

import repositories.route_repository as route_repository_module
from app.config import Settings
from repositories.route_repository import RouteRepository
from utils.response import ApiError


SETTINGS = Settings(
    supabase_url="",
    supabase_anon_key="",
    supabase_service_role_key="",
)


class CapturingRouteRepository(RouteRepository):
    def __init__(self, payload):
        super().__init__(SETTINGS)
        self.payload = payload
        self.request = None

    def _request(self, method, path):
        self.request = {"method": method, "path": path}
        return self.payload


def test_route_repository_queries_public_routes_with_embedded_active_user():
    repository = CapturingRouteRepository(
        [
            {
                "route_id": 10,
                "title": "한강 러닝 코스",
                "description": "가볍게 달리기 좋은 코스",
                "activity_type": "RUN",
                "visibility": "PUBLIC",
                "encoded_polyline": "xxxxx",
                "distance_km": "5.210",
                "duration_sec": 1830,
                "like_count": 10,
                "comment_count": 2,
                "bookmark_count": 4,
                "created_at": "2026-05-19T10:00:00Z",
                "users": {
                    "user_id": "00000000-0000-0000-0000-000000000001",
                    "login_id": "runner2026",
                    "nickname": "러너",
                },
            }
        ]
    )

    result = repository.list_public_routes(page=2, size=20, activity_type="RUN")

    query = parse_qs(urlsplit(repository.request["path"]).query)
    assert repository.request["method"] == "GET"
    assert query["visibility"] == ["eq.PUBLIC"]
    assert query["deleted_yn"] == ["eq.N"]
    assert query["activity_type"] == ["eq.RUN"]
    assert query["users.deleted_yn"] == ["eq.N"]
    assert query["order"] == ["created_at.desc"]
    assert query["offset"] == ["20"]
    assert query["limit"] == ["21"]
    assert "users!inner(user_id,login_id,nickname)" in query["select"][0]
    assert result == [
        {
            "route_id": 10,
            "title": "한강 러닝 코스",
            "description": "가볍게 달리기 좋은 코스",
            "activity_type": "RUN",
            "visibility": "PUBLIC",
            "encoded_polyline": "xxxxx",
            "distance_km": 5.21,
            "duration_sec": 1830,
            "like_count": 10,
            "comment_count": 2,
            "bookmark_count": 4,
            "created_at": "2026-05-19T10:00:00Z",
            "user": {
                "user_id": "00000000-0000-0000-0000-000000000001",
                "login_id": "runner2026",
                "nickname": "러너",
            },
        }
    ]


def test_route_repository_rejects_route_without_embedded_user():
    repository = CapturingRouteRepository([{"route_id": 10, "users": None}])

    try:
        repository.list_public_routes(page=1, size=20, activity_type="RUN")
    except ApiError as error:
        assert error.status_code == 500
        assert error.error_code == "INTERNAL_ERROR"
    else:
        raise AssertionError("Expected invalid routes response error")


def test_route_repository_rejects_non_numeric_distance():
    repository = CapturingRouteRepository(
        [{"route_id": 10, "distance_km": "invalid", "users": {}}]
    )

    try:
        repository.list_public_routes(page=1, size=20, activity_type="RUN")
    except ApiError as error:
        assert error.status_code == 500
        assert error.error_code == "INTERNAL_ERROR"
    else:
        raise AssertionError("Expected invalid routes response error")


def test_route_repository_logs_safe_postgrest_error_code(monkeypatch, caplog):
    repository = RouteRepository(
        Settings(
            supabase_url="https://example.supabase.co",
            supabase_anon_key="anon-key",
            supabase_service_role_key="service-role-key",
        )
    )
    error = HTTPError(
        url="https://example.supabase.co/rest/v1/routes",
        code=400,
        msg="Bad Request",
        hdrs=None,
        fp=BytesIO(b'{"code":"PGRST200","message":"relationship error"}'),
    )

    def raise_http_error(*_, **__):
        raise error

    monkeypatch.setattr(route_repository_module, "urlopen", raise_http_error)

    try:
        repository._request("GET", "/rest/v1/routes")
    except ApiError:
        pass
    else:
        raise AssertionError("Expected Supabase database request failure")

    assert "status=400" in caplog.text
    assert "postgrest_code=PGRST200" in caplog.text
    assert "service-role-key" not in caplog.text
    assert "relationship error" not in caplog.text

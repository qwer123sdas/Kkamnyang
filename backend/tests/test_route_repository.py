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


class ScriptedRouteRepository(RouteRepository):
    def __init__(self, payloads):
        super().__init__(SETTINGS)
        self.payloads = list(payloads)
        self.requests = []

    def _request(self, method, path, body=None, extra_headers=None):
        self.requests.append(
            {
                "method": method,
                "path": path,
                "body": body,
                "extra_headers": extra_headers,
            }
        )
        return self.payloads.pop(0)


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


def test_route_repository_queries_route_detail_with_active_user_filter():
    repository = CapturingRouteRepository(
        [
            {
                "route_id": 10,
                "title": "?쒓컯 ?щ떇 肄붿뒪",
                "description": "媛蹂띻쾶 ?щ━湲?醫뗭? 肄붿뒪",
                "activity_type": "RUN",
                "visibility": "PUBLIC",
                "encoded_polyline": "xxxxx",
                "route_geojson": {
                    "type": "LineString",
                    "coordinates": [],
                },
                "distance_km": "5.210",
                "duration_sec": 1830,
                "like_count": 10,
                "comment_count": 2,
                "bookmark_count": 4,
                "created_at": "2026-05-19T10:00:00Z",
                "users": {
                    "user_id": "00000000-0000-0000-0000-000000000001",
                    "login_id": "runner2026",
                    "nickname": "?щ꼫",
                },
            }
        ]
    )

    result = repository.get_route_detail(route_id=10)

    query = parse_qs(urlsplit(repository.request["path"]).query)
    assert repository.request["method"] == "GET"
    assert query["route_id"] == ["eq.10"]
    assert query["deleted_yn"] == ["eq.N"]
    assert query["users.deleted_yn"] == ["eq.N"]
    assert query["limit"] == ["1"]
    assert "route_geojson" in query["select"][0]
    assert "users!inner(user_id,login_id,nickname)" in query["select"][0]
    assert result == {
        "route_id": 10,
        "title": "?쒓컯 ?щ떇 肄붿뒪",
        "description": "媛蹂띻쾶 ?щ━湲?醫뗭? 肄붿뒪",
        "activity_type": "RUN",
        "visibility": "PUBLIC",
        "encoded_polyline": "xxxxx",
        "route_geojson": {
            "type": "LineString",
            "coordinates": [],
        },
        "distance_km": 5.21,
        "duration_sec": 1830,
        "like_count": 10,
        "comment_count": 2,
        "bookmark_count": 4,
        "created_at": "2026-05-19T10:00:00Z",
        "is_liked": False,
        "is_bookmarked": False,
        "user": {
            "user_id": "00000000-0000-0000-0000-000000000001",
            "login_id": "runner2026",
            "nickname": "?щ꼫",
        },
    }


def test_route_repository_returns_none_for_missing_route_detail():
    repository = CapturingRouteRepository([])

    result = repository.get_route_detail(route_id=999)

    assert result is None


def test_route_repository_sets_like_and_updates_route_count():
    repository = ScriptedRouteRepository(
        [
            [],
            None,
            [{"route_id": 10}, {"route_id": 10}],
            None,
        ]
    )

    result = repository.set_route_liked(
        route_id=10,
        user_id="00000000-0000-0000-0000-000000000001",
        actor="runner2026",
        is_liked=True,
    )

    assert result == {
        "route_id": 10,
        "like_count": 2,
    }
    assert repository.requests[0]["method"] == "GET"
    assert "/rest/v1/route_likes?" in repository.requests[0]["path"]
    assert repository.requests[1]["method"] == "POST"
    assert repository.requests[1]["path"] == "/rest/v1/route_likes"
    assert repository.requests[1]["body"] == {
        "route_id": 10,
        "user_id": "00000000-0000-0000-0000-000000000001",
        "created_by": "runner2026",
        "updated_by": "runner2026",
        "deleted_yn": "N",
    }
    assert repository.requests[3]["method"] == "PATCH"
    assert "/rest/v1/routes?" in repository.requests[3]["path"]
    assert repository.requests[3]["body"] == {"like_count": 2}


def test_route_repository_unsets_bookmark_with_soft_delete_and_updates_count():
    repository = ScriptedRouteRepository(
        [
            [{"deleted_yn": "N"}],
            None,
            [],
            None,
        ]
    )

    result = repository.set_route_bookmarked(
        route_id=10,
        user_id="00000000-0000-0000-0000-000000000001",
        actor="runner2026",
        is_bookmarked=False,
    )

    assert result == {
        "route_id": 10,
        "bookmark_count": 0,
    }
    assert repository.requests[1]["method"] == "PATCH"
    assert "/rest/v1/route_bookmarks?" in repository.requests[1]["path"]
    assert repository.requests[1]["body"]["deleted_yn"] == "Y"
    assert repository.requests[1]["body"]["deleted_at"]
    assert repository.requests[3]["method"] == "PATCH"
    assert repository.requests[3]["body"] == {"bookmark_count": 0}


def test_route_repository_queries_route_comments_with_active_user_filter():
    repository = CapturingRouteRepository(
        [
            {
                "comment_id": 1,
                "content": "Good route",
                "created_at": "2026-05-19T10:00:00Z",
                "users": {
                    "user_id": "00000000-0000-0000-0000-000000000001",
                    "login_id": "runner2026",
                    "nickname": "?щ꼫",
                },
            }
        ]
    )

    result = repository.list_route_comments(route_id=10, page=2, size=20)

    query = parse_qs(urlsplit(repository.request["path"]).query)
    assert repository.request["method"] == "GET"
    assert query["route_id"] == ["eq.10"]
    assert query["deleted_yn"] == ["eq.N"]
    assert query["users.deleted_yn"] == ["eq.N"]
    assert query["order"] == ["created_at.asc"]
    assert query["offset"] == ["20"]
    assert query["limit"] == ["21"]
    assert "users!inner(user_id,login_id,nickname)" in query["select"][0]
    assert result == [
        {
            "comment_id": 1,
            "content": "Good route",
            "created_at": "2026-05-19T10:00:00Z",
            "user": {
                "user_id": "00000000-0000-0000-0000-000000000001",
                "login_id": "runner2026",
                "nickname": "?щ꼫",
            },
        }
    ]


def test_route_repository_creates_comment_and_updates_route_comment_count():
    repository = ScriptedRouteRepository(
        [
            [
                {
                    "comment_id": 1,
                    "route_id": 10,
                    "content": "Good route",
                    "created_at": "2026-05-19T10:00:00Z",
                }
            ],
            [{"route_id": 10}, {"route_id": 10}],
            None,
        ]
    )

    result = repository.create_route_comment(
        route_id=10,
        user_id="00000000-0000-0000-0000-000000000001",
        content="Good route",
        actor="runner2026",
    )

    assert result == {
        "comment_id": 1,
        "route_id": 10,
        "content": "Good route",
        "created_at": "2026-05-19T10:00:00Z",
    }
    assert repository.requests[0]["method"] == "POST"
    assert repository.requests[0]["path"] == "/rest/v1/route_comments"
    assert repository.requests[0]["body"] == {
        "route_id": 10,
        "user_id": "00000000-0000-0000-0000-000000000001",
        "content": "Good route",
        "created_by": "runner2026",
        "updated_by": "runner2026",
        "deleted_yn": "N",
    }
    assert repository.requests[2]["method"] == "PATCH"
    assert repository.requests[2]["body"] == {"comment_count": 2}


def test_route_repository_gets_active_comment_for_owner_check():
    repository = CapturingRouteRepository(
        [
            {
                "comment_id": 1,
                "route_id": 10,
                "user_id": "00000000-0000-0000-0000-000000000001",
            }
        ]
    )

    result = repository.get_route_comment(route_id=10, comment_id=1)

    query = parse_qs(urlsplit(repository.request["path"]).query)
    assert repository.request["method"] == "GET"
    assert query["route_id"] == ["eq.10"]
    assert query["comment_id"] == ["eq.1"]
    assert query["deleted_yn"] == ["eq.N"]
    assert query["limit"] == ["1"]
    assert result == {
        "comment_id": 1,
        "route_id": 10,
        "user_id": "00000000-0000-0000-0000-000000000001",
    }


def test_route_repository_updates_comment_content():
    repository = ScriptedRouteRepository(
        [
            [
                {
                    "comment_id": 1,
                    "route_id": 10,
                    "content": "Updated route",
                    "created_at": "2026-05-19T10:00:00Z",
                }
            ],
        ]
    )

    result = repository.update_route_comment(
        route_id=10,
        comment_id=1,
        content="Updated route",
        actor="runner2026",
    )

    query = parse_qs(urlsplit(repository.requests[0]["path"]).query)
    assert repository.requests[0]["method"] == "PATCH"
    assert query["route_id"] == ["eq.10"]
    assert query["comment_id"] == ["eq.1"]
    assert query["deleted_yn"] == ["eq.N"]
    assert repository.requests[0]["body"]["content"] == "Updated route"
    assert repository.requests[0]["body"]["updated_by"] == "runner2026"
    assert repository.requests[0]["extra_headers"] == {"Prefer": "return=representation"}
    assert result == {
        "comment_id": 1,
        "route_id": 10,
        "content": "Updated route",
        "created_at": "2026-05-19T10:00:00Z",
    }


def test_route_repository_soft_deletes_comment_and_updates_route_comment_count():
    repository = ScriptedRouteRepository(
        [
            None,
            [{"route_id": 10}],
            None,
        ]
    )

    result = repository.delete_route_comment(
        route_id=10,
        comment_id=1,
        actor="runner2026",
    )

    query = parse_qs(urlsplit(repository.requests[0]["path"]).query)
    assert repository.requests[0]["method"] == "PATCH"
    assert query["route_id"] == ["eq.10"]
    assert query["comment_id"] == ["eq.1"]
    assert query["deleted_yn"] == ["eq.N"]
    assert repository.requests[0]["body"]["deleted_yn"] == "Y"
    assert repository.requests[0]["body"]["deleted_at"]
    assert repository.requests[0]["body"]["updated_by"] == "runner2026"
    assert repository.requests[2]["method"] == "PATCH"
    assert repository.requests[2]["body"] == {"comment_count": 1}
    assert result == {
        "comment_id": 1,
        "route_id": 10,
    }


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

from fastapi.testclient import TestClient

from app.dependencies import get_current_auth_user, get_route_service
from app.main import app
from services.auth_service import AuthUser
from services.route_service import RouteService


class FakeRouteService:
    def get_feed(self, page: int, size: int, activity_type: str):
        assert page == 1
        assert size == 1
        assert activity_type == "RUN"
        return {
            "items": [
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
            ],
            "page": 1,
            "size": 1,
            "has_next": True,
        }

    def get_my_routes(self, page: int, size: int, user_id: str):
        assert page == 1
        assert size == 20
        assert user_id == "00000000-0000-0000-0000-000000000001"
        return {
            "items": [
                {
                    "route_id": 10,
                    "title": "Morning run",
                    "activity_type": "RUN",
                    "visibility": "PRIVATE",
                    "encoded_polyline": "xxxxx",
                    "distance_km": 5.21,
                    "duration_sec": 1830,
                    "created_at": "2026-05-19T10:00:00Z",
                }
            ],
            "page": page,
            "size": size,
            "has_next": False,
        }

    def get_detail(self, route_id: int, viewer_user_id: str | None = None):
        assert route_id == 10
        return {
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
            "is_liked": False,
            "is_bookmarked": False,
            "created_at": "2026-05-19T10:00:00Z",
            "user": {
                "user_id": "00000000-0000-0000-0000-000000000001",
                "login_id": "runner2026",
                "nickname": "?щ꼫",
            },
        }

    def like(self, route_id: int, user_id: str):
        assert route_id == 10
        assert user_id == "00000000-0000-0000-0000-000000000001"
        return {
            "route_id": route_id,
            "is_liked": True,
            "like_count": 11,
        }

    def unlike(self, route_id: int, user_id: str):
        assert route_id == 10
        assert user_id == "00000000-0000-0000-0000-000000000001"
        return {
            "route_id": route_id,
            "is_liked": False,
            "like_count": 10,
        }

    def bookmark(self, route_id: int, user_id: str):
        assert route_id == 10
        assert user_id == "00000000-0000-0000-0000-000000000001"
        return {
            "route_id": route_id,
            "is_bookmarked": True,
            "bookmark_count": 5,
        }

    def unbookmark(self, route_id: int, user_id: str):
        assert route_id == 10
        assert user_id == "00000000-0000-0000-0000-000000000001"
        return {
            "route_id": route_id,
            "is_bookmarked": False,
            "bookmark_count": 4,
        }

    def get_comments(self, route_id: int, page: int, size: int):
        assert route_id == 10
        assert page == 1
        assert size == 20
        return {
            "items": [
                {
                    "comment_id": 1,
                    "content": "Good route",
                    "created_at": "2026-05-19T10:00:00Z",
                    "user": {
                        "user_id": "00000000-0000-0000-0000-000000000001",
                        "login_id": "runner2026",
                        "nickname": "?щ꼫",
                    },
                },
            ],
            "page": page,
            "size": size,
            "has_next": False,
        }

    def create_comment(self, route_id: int, user_id: str, content: str):
        assert route_id == 10
        assert user_id == "00000000-0000-0000-0000-000000000001"
        assert content == "Good route"
        return {
            "comment_id": 1,
            "route_id": route_id,
            "content": content,
            "created_at": "2026-05-19T10:00:00Z",
        }

    def update_comment(self, route_id: int, comment_id: int, user_id: str, content: str):
        assert route_id == 10
        assert comment_id == 1
        assert user_id == "00000000-0000-0000-0000-000000000001"
        assert content == "Updated route"
        return {
            "comment_id": comment_id,
            "route_id": route_id,
            "content": content,
            "created_at": "2026-05-19T10:00:00Z",
        }

    def delete_comment(self, route_id: int, comment_id: int, user_id: str):
        assert route_id == 10
        assert comment_id == 1
        assert user_id == "00000000-0000-0000-0000-000000000001"
        return {
            "comment_id": comment_id,
            "route_id": route_id,
        }


def override_route_service():
    return FakeRouteService()


def override_current_auth_user():
    return AuthUser(
        user_id="00000000-0000-0000-0000-000000000001",
        email=None,
        nickname=None,
        profile_image_url=None,
        auth_provider="GOOGLE",
    )


def test_route_feed_is_public_and_returns_paginated_routes():
    app.dependency_overrides[get_route_service] = override_route_service
    client = TestClient(app)

    response = client.get("/api/v1/routes/feed?page=1&size=1&activity_type=RUN")

    assert response.status_code == 200
    assert response.json() == {
        "success": True,
        "data": {
            "items": [
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
            ],
            "page": 1,
            "size": 1,
            "has_next": True,
        },
        "message": None,
    }
    app.dependency_overrides.clear()


def test_my_routes_requires_authentication_and_returns_paginated_routes():
    app.dependency_overrides[get_route_service] = override_route_service
    app.dependency_overrides[get_current_auth_user] = override_current_auth_user
    client = TestClient(app)

    response = client.get("/api/v1/routes/me?page=1&size=20")

    assert response.status_code == 200
    assert response.json() == {
        "success": True,
        "data": {
            "items": [
                {
                    "route_id": 10,
                    "title": "Morning run",
                    "activity_type": "RUN",
                    "visibility": "PRIVATE",
                    "encoded_polyline": "xxxxx",
                    "distance_km": 5.21,
                    "duration_sec": 1830,
                    "created_at": "2026-05-19T10:00:00Z",
                }
            ],
            "page": 1,
            "size": 20,
            "has_next": False,
        },
        "message": None,
    }
    app.dependency_overrides.clear()


def test_route_detail_returns_public_route_without_authentication():
    app.dependency_overrides[get_route_service] = override_route_service
    client = TestClient(app)

    response = client.get("/api/v1/routes/10")

    assert response.status_code == 200
    assert response.json() == {
        "success": True,
        "data": {
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
            "is_liked": False,
            "is_bookmarked": False,
            "created_at": "2026-05-19T10:00:00Z",
            "user": {
                "user_id": "00000000-0000-0000-0000-000000000001",
                "login_id": "runner2026",
                "nickname": "?щ꼫",
            },
        },
        "message": None,
    }
    app.dependency_overrides.clear()


def test_route_like_requires_authentication():
    client = TestClient(app)

    response = client.post("/api/v1/routes/10/like")

    assert response.status_code == 401


def test_route_like_returns_updated_state():
    app.dependency_overrides[get_route_service] = override_route_service
    app.dependency_overrides[get_current_auth_user] = override_current_auth_user
    client = TestClient(app)

    response = client.post("/api/v1/routes/10/like")

    assert response.status_code == 200
    assert response.json() == {
        "success": True,
        "data": {
            "route_id": 10,
            "is_liked": True,
            "like_count": 11,
        },
        "message": None,
    }
    app.dependency_overrides.clear()


def test_route_unlike_returns_updated_state():
    app.dependency_overrides[get_route_service] = override_route_service
    app.dependency_overrides[get_current_auth_user] = override_current_auth_user
    client = TestClient(app)

    response = client.delete("/api/v1/routes/10/like")

    assert response.status_code == 200
    assert response.json() == {
        "success": True,
        "data": {
            "route_id": 10,
            "is_liked": False,
            "like_count": 10,
        },
        "message": None,
    }
    app.dependency_overrides.clear()


def test_route_bookmark_returns_updated_state():
    app.dependency_overrides[get_route_service] = override_route_service
    app.dependency_overrides[get_current_auth_user] = override_current_auth_user
    client = TestClient(app)

    response = client.post("/api/v1/routes/10/bookmark")

    assert response.status_code == 200
    assert response.json() == {
        "success": True,
        "data": {
            "route_id": 10,
            "is_bookmarked": True,
            "bookmark_count": 5,
        },
        "message": None,
    }
    app.dependency_overrides.clear()


def test_route_unbookmark_returns_updated_state():
    app.dependency_overrides[get_route_service] = override_route_service
    app.dependency_overrides[get_current_auth_user] = override_current_auth_user
    client = TestClient(app)

    response = client.delete("/api/v1/routes/10/bookmark")

    assert response.status_code == 200
    assert response.json() == {
        "success": True,
        "data": {
            "route_id": 10,
            "is_bookmarked": False,
            "bookmark_count": 4,
        },
        "message": None,
    }
    app.dependency_overrides.clear()


def test_route_comments_returns_paginated_comments():
    app.dependency_overrides[get_route_service] = override_route_service
    client = TestClient(app)

    response = client.get("/api/v1/routes/10/comments?page=1&size=20")

    assert response.status_code == 200
    assert response.json() == {
        "success": True,
        "data": {
            "items": [
                {
                    "comment_id": 1,
                    "content": "Good route",
                    "created_at": "2026-05-19T10:00:00Z",
                    "user": {
                        "user_id": "00000000-0000-0000-0000-000000000001",
                        "login_id": "runner2026",
                        "nickname": "?щ꼫",
                    },
                },
            ],
            "page": 1,
            "size": 20,
            "has_next": False,
        },
        "message": None,
    }
    app.dependency_overrides.clear()


def test_route_comment_create_requires_authentication():
    client = TestClient(app)

    response = client.post("/api/v1/routes/10/comments", json={"content": "Good route"})

    assert response.status_code == 401


def test_route_comment_create_returns_created_comment():
    app.dependency_overrides[get_route_service] = override_route_service
    app.dependency_overrides[get_current_auth_user] = override_current_auth_user
    client = TestClient(app)

    response = client.post("/api/v1/routes/10/comments", json={"content": "Good route"})

    assert response.status_code == 200
    assert response.json() == {
        "success": True,
        "data": {
            "comment_id": 1,
            "route_id": 10,
            "content": "Good route",
            "created_at": "2026-05-19T10:00:00Z",
        },
        "message": None,
    }
    app.dependency_overrides.clear()


def test_route_comment_update_returns_updated_comment():
    app.dependency_overrides[get_route_service] = override_route_service
    app.dependency_overrides[get_current_auth_user] = override_current_auth_user
    client = TestClient(app)

    response = client.patch(
        "/api/v1/routes/10/comments/1",
        json={"content": "Updated route"},
    )

    assert response.status_code == 200
    assert response.json() == {
        "success": True,
        "data": {
            "comment_id": 1,
            "route_id": 10,
            "content": "Updated route",
            "created_at": "2026-05-19T10:00:00Z",
        },
        "message": None,
    }
    app.dependency_overrides.clear()


def test_route_comment_delete_returns_deleted_comment_id():
    app.dependency_overrides[get_route_service] = override_route_service
    app.dependency_overrides[get_current_auth_user] = override_current_auth_user
    client = TestClient(app)

    response = client.delete("/api/v1/routes/10/comments/1")

    assert response.status_code == 200
    assert response.json() == {
        "success": True,
        "data": {
            "comment_id": 1,
            "route_id": 10,
        },
        "message": None,
    }
    app.dependency_overrides.clear()


def test_route_feed_rejects_invalid_query():
    client = TestClient(app)

    assert client.get("/api/v1/routes/feed?page=0&size=20&activity_type=RUN").status_code == 422
    assert client.get("/api/v1/routes/feed?page=1&size=0&activity_type=RUN").status_code == 422
    assert client.get("/api/v1/routes/feed?page=1&size=51&activity_type=RUN").status_code == 422
    assert client.get("/api/v1/routes/feed?page=1&size=20&activity_type=RIDE").status_code == 422
    assert client.get("/api/v1/routes/feed?page=1&size=20").status_code == 422


class FakeRouteRepository:
    def __init__(self, rows):
        self.rows = rows
        self.request = None

    def list_public_routes(self, page: int, size: int, activity_type: str):
        self.request = {
            "page": page,
            "size": size,
            "activity_type": activity_type,
        }
        return self.rows

    def get_route_detail(self, route_id: int):
        self.request = {
            "route_id": route_id,
        }
        return self.rows

    def is_route_liked(self, route_id: int, user_id: str):
        return False

    def is_route_bookmarked(self, route_id: int, user_id: str):
        return False

    def set_route_liked(
        self,
        route_id: int,
        user_id: str,
        actor: str,
        is_liked: bool,
    ):
        return {
            "route_id": route_id,
            "like_count": 11 if is_liked else 10,
        }

    def set_route_bookmarked(
        self,
        route_id: int,
        user_id: str,
        actor: str,
        is_bookmarked: bool,
    ):
        return {
            "route_id": route_id,
            "bookmark_count": 5 if is_bookmarked else 4,
        }

    def list_route_comments(self, route_id: int, page: int, size: int):
        self.request = {
            "route_id": route_id,
            "page": page,
            "size": size,
        }
        return self.rows

    def create_route_comment(
        self,
        route_id: int,
        user_id: str,
        content: str,
        actor: str,
    ):
        return {
            "comment_id": 1,
            "route_id": route_id,
            "content": content,
            "created_at": "2026-05-19T10:00:00Z",
        }

    def get_route_comment(self, route_id: int, comment_id: int):
        return {
            "comment_id": comment_id,
            "route_id": route_id,
            "user_id": "00000000-0000-0000-0000-000000000001",
        }

    def update_route_comment(
        self,
        route_id: int,
        comment_id: int,
        content: str,
        actor: str,
    ):
        return {
            "comment_id": comment_id,
            "route_id": route_id,
            "content": content,
            "created_at": "2026-05-19T10:00:00Z",
        }

    def delete_route_comment(self, route_id: int, comment_id: int, actor: str):
        return {
            "comment_id": comment_id,
            "route_id": route_id,
        }


def test_route_service_calculates_has_next_from_extra_row():
    repository = FakeRouteRepository([{"route_id": 3}, {"route_id": 2}, {"route_id": 1}])

    result = RouteService(repository).get_feed(page=2, size=2, activity_type="RUN")

    assert repository.request == {"page": 2, "size": 2, "activity_type": "RUN"}
    assert result == {
        "items": [{"route_id": 3}, {"route_id": 2}],
        "page": 2,
        "size": 2,
        "has_next": True,
    }


def test_route_service_returns_empty_page_without_next_page():
    result = RouteService(FakeRouteRepository([])).get_feed(
        page=1,
        size=20,
        activity_type="RUN",
    )

    assert result == {
        "items": [],
        "page": 1,
        "size": 20,
        "has_next": False,
    }


def test_route_service_returns_public_route_detail_without_viewer():
    route = {
        "route_id": 10,
        "visibility": "PUBLIC",
        "user": {
            "user_id": "00000000-0000-0000-0000-000000000001",
        },
    }

    result = RouteService(FakeRouteRepository(route)).get_detail(route_id=10)

    assert result == route
    assert result["route_id"] == 10


def test_route_service_returns_private_route_detail_to_owner():
    route = {
        "route_id": 10,
        "visibility": "PRIVATE",
        "user": {
            "user_id": "00000000-0000-0000-0000-000000000001",
        },
    }

    result = RouteService(FakeRouteRepository(route)).get_detail(
        route_id=10,
        viewer_user_id="00000000-0000-0000-0000-000000000001",
    )

    assert result == route


def test_route_service_hides_private_route_detail_from_non_owner():
    route = {
        "route_id": 10,
        "visibility": "PRIVATE",
        "user": {
            "user_id": "00000000-0000-0000-0000-000000000001",
        },
    }

    try:
        RouteService(FakeRouteRepository(route)).get_detail(
            route_id=10,
            viewer_user_id="00000000-0000-0000-0000-000000000002",
        )
    except Exception as error:
        assert error.status_code == 404
        assert error.error_code == "ROUTE_NOT_FOUND"
    else:
        raise AssertionError("Expected private route to be hidden")


def test_route_service_returns_not_found_for_missing_route_detail():
    try:
        RouteService(FakeRouteRepository(None)).get_detail(route_id=10)
    except Exception as error:
        assert error.status_code == 404
        assert error.error_code == "ROUTE_NOT_FOUND"
    else:
        raise AssertionError("Expected missing route detail error")


def test_route_service_returns_paginated_comments():
    route = {
        "route_id": 10,
        "visibility": "PUBLIC",
        "user": {
            "user_id": "00000000-0000-0000-0000-000000000001",
        },
    }
    repository = FakeRouteRepository([{"comment_id": 2}, {"comment_id": 1}])
    repository.get_route_detail = lambda route_id: route

    result = RouteService(repository).get_comments(route_id=10, page=1, size=1)

    assert result == {
        "items": [{"comment_id": 2}],
        "page": 1,
        "size": 1,
        "has_next": True,
    }


def test_route_service_creates_comment_with_trimmed_content():
    route = {
        "route_id": 10,
        "visibility": "PUBLIC",
        "user": {
            "user_id": "00000000-0000-0000-0000-000000000001",
        },
    }
    repository = FakeRouteRepository(route)

    result = RouteService(repository).create_comment(
        route_id=10,
        user_id="00000000-0000-0000-0000-000000000001",
        content=" Good route ",
    )

    assert result == {
        "comment_id": 1,
        "route_id": 10,
        "content": "Good route",
        "created_at": "2026-05-19T10:00:00Z",
    }


def test_route_service_updates_own_comment_with_trimmed_content():
    route = {
        "route_id": 10,
        "visibility": "PUBLIC",
        "user": {
            "user_id": "00000000-0000-0000-0000-000000000001",
        },
    }
    repository = FakeRouteRepository(route)

    result = RouteService(repository).update_comment(
        route_id=10,
        comment_id=1,
        user_id="00000000-0000-0000-0000-000000000001",
        content=" Updated route ",
    )

    assert result == {
        "comment_id": 1,
        "route_id": 10,
        "content": "Updated route",
        "created_at": "2026-05-19T10:00:00Z",
    }


def test_route_service_deletes_own_comment():
    route = {
        "route_id": 10,
        "visibility": "PUBLIC",
        "user": {
            "user_id": "00000000-0000-0000-0000-000000000001",
        },
    }
    repository = FakeRouteRepository(route)

    result = RouteService(repository).delete_comment(
        route_id=10,
        comment_id=1,
        user_id="00000000-0000-0000-0000-000000000001",
    )

    assert result == {
        "comment_id": 1,
        "route_id": 10,
    }

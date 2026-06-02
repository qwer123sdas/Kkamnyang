from fastapi.testclient import TestClient

from app.dependencies import get_route_service
from app.main import app
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


def override_route_service():
    return FakeRouteService()


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

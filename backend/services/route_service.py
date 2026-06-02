from repositories.route_repository import RouteRepository


class RouteService:
    def __init__(self, route_repository: RouteRepository):
        self.route_repository = route_repository

    def get_feed(self, page: int, size: int, activity_type: str):
        rows = self.route_repository.list_public_routes(page, size, activity_type)
        return {
            "items": rows[:size],
            "page": page,
            "size": size,
            "has_next": len(rows) > size,
        }

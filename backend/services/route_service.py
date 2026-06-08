from repositories.route_repository import RouteRepository
from repositories.user_repository import UserRepository
from utils.response import ApiError


class RouteService:
    def __init__(
        self,
        route_repository: RouteRepository,
        user_repository: UserRepository | None = None,
    ):
        self.route_repository = route_repository
        self.user_repository = user_repository

    def get_feed(self, page: int, size: int, activity_type: str):
        rows = self.route_repository.list_public_routes(page, size, activity_type)
        return {
            "items": rows[:size],
            "page": page,
            "size": size,
            "has_next": len(rows) > size,
        }

    def get_my_routes(self, page: int, size: int, user_id: str):
        rows = self.route_repository.list_my_routes(page, size, user_id)
        return {
            "items": rows[:size],
            "page": page,
            "size": size,
            "has_next": len(rows) > size,
        }

    def get_detail(self, route_id: int, viewer_user_id: str | None = None):
        route = self.route_repository.get_route_detail(route_id)

        if not route:
            raise ApiError(404, "Route not found", "ROUTE_NOT_FOUND")

        if route.get("visibility") == "PRIVATE":
            route_user = route.get("user")
            route_user_id = route_user.get("user_id") if isinstance(route_user, dict) else None

            if not viewer_user_id or route_user_id != viewer_user_id:
                raise ApiError(404, "Route not found", "ROUTE_NOT_FOUND")

        if viewer_user_id:
            route["is_liked"] = self.route_repository.is_route_liked(
                route_id,
                viewer_user_id,
            )
            route["is_bookmarked"] = self.route_repository.is_route_bookmarked(
                route_id,
                viewer_user_id,
            )

        return route

    def like(self, route_id: int, user_id: str):
        actor = self._get_actor_login_id(user_id)
        self.get_detail(route_id, user_id)
        result = self.route_repository.set_route_liked(
            route_id=route_id,
            user_id=user_id,
            actor=actor,
            is_liked=True,
        )

        return {
            "route_id": route_id,
            "is_liked": True,
            "like_count": result["like_count"],
        }

    def unlike(self, route_id: int, user_id: str):
        actor = self._get_actor_login_id(user_id)
        self.get_detail(route_id, user_id)
        result = self.route_repository.set_route_liked(
            route_id=route_id,
            user_id=user_id,
            actor=actor,
            is_liked=False,
        )

        return {
            "route_id": route_id,
            "is_liked": False,
            "like_count": result["like_count"],
        }

    def bookmark(self, route_id: int, user_id: str):
        actor = self._get_actor_login_id(user_id)
        self.get_detail(route_id, user_id)
        result = self.route_repository.set_route_bookmarked(
            route_id=route_id,
            user_id=user_id,
            actor=actor,
            is_bookmarked=True,
        )

        return {
            "route_id": route_id,
            "is_bookmarked": True,
            "bookmark_count": result["bookmark_count"],
        }

    def unbookmark(self, route_id: int, user_id: str):
        actor = self._get_actor_login_id(user_id)
        self.get_detail(route_id, user_id)
        result = self.route_repository.set_route_bookmarked(
            route_id=route_id,
            user_id=user_id,
            actor=actor,
            is_bookmarked=False,
        )

        return {
            "route_id": route_id,
            "is_bookmarked": False,
            "bookmark_count": result["bookmark_count"],
        }

    def get_comments(self, route_id: int, page: int, size: int):
        self.get_detail(route_id)
        rows = self.route_repository.list_route_comments(route_id, page, size)

        return {
            "items": rows[:size],
            "page": page,
            "size": size,
            "has_next": len(rows) > size,
        }

    def create_comment(self, route_id: int, user_id: str, content: str):
        actor = self._get_actor_login_id(user_id)
        self.get_detail(route_id, user_id)

        next_content = content.strip()

        if not next_content:
            raise ApiError(422, "Comment content is required", "COMMENT_CONTENT_REQUIRED")

        return self.route_repository.create_route_comment(
            route_id=route_id,
            user_id=user_id,
            content=next_content,
            actor=actor,
        )

    def update_comment(self, route_id: int, comment_id: int, user_id: str, content: str):
        actor = self._get_actor_login_id(user_id)
        self.get_detail(route_id, user_id)
        comment = self.route_repository.get_route_comment(route_id, comment_id)

        if not comment or comment.get("user_id") != user_id:
            raise ApiError(404, "Comment not found", "COMMENT_NOT_FOUND")

        next_content = content.strip()

        if not next_content:
            raise ApiError(422, "Comment content is required", "COMMENT_CONTENT_REQUIRED")

        return self.route_repository.update_route_comment(
            route_id=route_id,
            comment_id=comment_id,
            content=next_content,
            actor=actor,
        )

    def delete_comment(self, route_id: int, comment_id: int, user_id: str):
        actor = self._get_actor_login_id(user_id)
        self.get_detail(route_id, user_id)
        comment = self.route_repository.get_route_comment(route_id, comment_id)

        if not comment or comment.get("user_id") != user_id:
            raise ApiError(404, "Comment not found", "COMMENT_NOT_FOUND")

        return self.route_repository.delete_route_comment(
            route_id=route_id,
            comment_id=comment_id,
            actor=actor,
        )

    def _get_actor_login_id(self, user_id: str) -> str:
        if not self.user_repository:
            return user_id[:50]

        user = self.user_repository.get_by_user_id(user_id)

        if not user:
            raise ApiError(404, "User not found", "USER_NOT_FOUND")

        login_id = user.get("login_id")
        return login_id if isinstance(login_id, str) and login_id else user_id[:50]

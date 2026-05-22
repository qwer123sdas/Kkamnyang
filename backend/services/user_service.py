from repositories.user_repository import UserRepository
from services.auth_service import AuthUser


class UserService:
    def __init__(self, user_repository: UserRepository):
        self.user_repository = user_repository

    def get_or_create_user(self, auth_user: AuthUser):
        user = self.user_repository.get_by_user_id(auth_user.user_id)

        if user:
            return user

        return self.user_repository.create_from_auth_user(auth_user)

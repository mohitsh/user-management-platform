from ..models.user import User
from ..repositories.user_repository import UserRepository
from ..schemas.user import UserCreate, UserUpdate


class UserService:
    def __init__(self, user_repository: UserRepository):
        self.user_repository = user_repository

    def get_all_users(self):
        users = self.user_repository.get_all_users()
        return users

    def create_user(self, user_create: UserCreate):
        # convert UserCreate to User with temporary UUID
        user = User(uuid="",
                    **user_create.model_dump())
        return self.user_repository.create_user(user)

    def update_user(self, uuid: str, user_update: UserUpdate):
        # get existing user
        existing_user = self.user_repository.get_user_by_id(uuid)
        if not existing_user:
            return None
        # merging update with existing data
        updated_data = existing_user.model_dump()
        updated_data.update(user_update.model_dump(exclude_none=True))  # excluding fields that are None
        user = User(**updated_data)
        return self.user_repository.update_user(uuid, user)

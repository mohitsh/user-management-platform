from ..models.user import User


class UserRepository:
    def __init__(self):
        self.conn = None

    def get_all_users(self):
        return

    def create_user(self, user: User):
        pass

    def get_user_by_id(self, uuid: str):
        return

    def update_user(self, user: User):
        return

    def delete_user(self, uuid: str):
        # soft delete
        return

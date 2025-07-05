import uuid

from ..models.user import User
from ..utils.file_util import FileUtil


class UserRepository:
    def __init__(self):
        self.conn = FileUtil()

    def get_all_users(self):
        user_data = self.conn.read_data()
        if user_data is None:
            return {}
        # filter deleted users
        active_users = [User(**user) for user in user_data["users"] if not user.get("is_deleted", False)]
        return active_users

    def create_user(self, user: User):
        try:
            data = self.conn.read_data()
            user_dict = user.dict()
            new_uuid = str(uuid.uuid4())
            user_dict["uuid"] = new_uuid
            data["users"].append(user_dict)
            self.conn.write_data(data)
            return User(**user_dict)
        except Exception as e:
            return None

    def get_user_by_id(self, uuid: str):
        user_data = self.conn.read_data()
        for user in user_data["users"]:
            if user["uuid"] == uuid:
                return User(**user)
        return None

    def update_user(self, uuid: str, updatedUser: User):
        user_data = self.conn.read_data()
        for user in user_data["users"]:
            if user["uuid"] == uuid:
                user_dict = updatedUser.model_dump(exclude_none=True)  # only non-None fields
                user.update(user_dict)
                self.conn.write_data(user_data)
                return user
        return None

    def delete_user(self, uuid: str):
        # soft delete
        user_data = self.conn.read_data()
        for user in user_data["users"]:
            if user["uuid"] == uuid:
                user["is_deleted"] = True
                self.conn.write_data(user_data)
                return True
        return False

import uuid

from ..models.user import User
from ..schemas.user import UserUpdate
from ..utils.file_util import FileUtil


class UserRepository:
    def __init__(self):
        self.conn = FileUtil()

    def get_all_users(self):
        user_data = self.conn.read_data()
        # filter deleted users
        active_users = [user for user in user_data["users"] if not user.get("is_deleted", False)]
        return active_users

    def create_user(self, user: User):
        data = self.conn.read_data()
        user_dict = user.dict()
        new_uuid = str(uuid.uuid4())
        user_dict["uuid"] = new_uuid
        data["users"].append(user_dict)
        self.conn.write_data(data)

    def get_user_by_id(self, uuid: str):
        user_data = self.conn.read_data()
        for user in user_data["users"]:
            if user["uuid"] == uuid:
                return user
        return None

    def update_user(self, uuid: str, user_data_update: UserUpdate):
        user_data = self.conn.read_data()
        for user in user_data["users"]:
            if user["uuid"] == uuid:
                user_dict = user_data_update.model_dump(exclude_none=True)  # only non-None fields
                user.update(user_dict)
                self.conn.write_data(user_data)
                return True
        return None

    def delete_user(self, uuid: str):
        # soft delete
        user_data = self.conn.read_data()
        for user in user_data["users"]:
            if user["uuid"] == uuid:
                user["is_deleted"] = True
                self.conn.write_data(user_data)
                return True
        return None

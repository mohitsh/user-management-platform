from fastapi import APIRouter, HTTPException

from ..repositories.user_repository import UserRepository
from ..schemas.user import UserCreate, UserUpdate
from ..services.user_service import UserService

router = APIRouter()

# service instances
user_repository = UserRepository()
user_service = UserService(user_repository)


@router.get("/api/users")
def get_users():
    # try:
    users = user_service.get_all_users()
    return {"success": True, "users": users}
    # except Exception as e:
    #     raise HTTPException(status_code=500, detail="Internal Server Error")


@router.post("/api/users")
def create_users(user_create: UserCreate):
    return {}


@router.put("/api/users/{uuid}")
def update_user(uuid: str, user_update: UserUpdate):
    return {}

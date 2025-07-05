from pydantic import BaseModel, EmailStr


class User(BaseModel):
    uuid: str
    name: str
    surname: str
    email: EmailStr  # entity level validation
    company: str
    jobTitle: str
    is_deleted: bool = False

from pydantic.v1 import BaseModel, EmailStr


class User(BaseModel):
    uuid: str
    name: str
    surname: str
    email: EmailStr  # entity level validation
    company: str
    jobTitle: str

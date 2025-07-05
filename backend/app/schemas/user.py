from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    name: str
    surname: str
    email: EmailStr  # validates email format
    company: str
    jobTitle: str

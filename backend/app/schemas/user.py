from typing import Optional

from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    name: str
    surname: str
    email: EmailStr  # validates email format
    company: str
    jobTitle: str


class UserResponse(BaseModel):
    uuid: str
    name: str
    surname: str
    email: EmailStr  # validates email format
    company: str
    jobTitle: str


class UserUpdate(BaseModel):
    name: Optional[str] = None
    surname: Optional[str] = None
    email: Optional[EmailStr] = None
    company: Optional[str] = None
    jobTitle: Optional[str] = None

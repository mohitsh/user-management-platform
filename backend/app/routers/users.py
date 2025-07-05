from fastapi import APIRouter

router = APIRouter()

MOCK_USERS = [
    {
      "uuid": "123e4567-e89b-12d3-a456-426614174000",
      "name": "John",
      "surname": "Doe",
      "email": "john.doe@example.com",
      "company": "BlackRock",
      "jobTitle": "Financial Analyst"
    },
  ]

@router.get("/api/users")
def get_users():
    return MOCK_USERS
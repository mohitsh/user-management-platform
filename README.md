# user-management-platform

CRUD application with React + TypeScript frontend and Python FastAPI backend.

## Features

- **CRUD Operations**: Create, read, update users
- **Form Validation**: Required fields and email format validation
- **Responsive Design**: Side-by-side layout on desktop, stacked on mobile
- **Real-time Updates**: Optimistic UI updates without page reloads
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support

## Tech Stack

### Frontend
- **React 19** + **TypeScript**
- **Rsbuild** (build tool)
- **Axios** for API calls
- **Vitest** for testing
- Responsive CSS with media queries

### Backend
- **FastAPI** (Python)
- **JSON file storage** for simplicity
- **Clean architecture** with repository pattern
- **CORS enabled** for frontend integration

## Quick Start

### Backend Setup
```bash
cd backend
pip install fastapi uvicorn
uvicorn app.main:app --reload
# Runs on http://localhost:8000
```
### Frontend Setup
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:3000
```

### API Endpoints

- GET `/api/users` - Get all users
- POST `/api/users` - Create new user
- PUT `/api/users/{uuid}` - Update existing user

### Testing

```bash
cd frontend
npm run test
```
Includes unit tests for form validation logic and data structures.

### Project Structure

```markdown

frontend/
├── src/
│   ├── components/          # React components
│   ├── services/           # API service layer (axios)
│   ├── types/              # TypeScript interfaces
│   ├── utils/              # Form validation utilities
│   └── App.tsx             # Main application
└── package.json

backend/
├── app/
│   ├── models/            # Domain models
│   ├── schemas/           # Pydantic schemas
│   ├── services/          # Business logic
│   ├── repositories/      # Data access layer
│   └── routers/           # API endpoints
└── requirements.txt
```

### Design Decisions

- Clean Architecture: Separated concerns with service/repository layers
- Type Safety: Full TypeScript coverage with proper interfaces
- Accessibility First: ARIA labels and semantic HTML
- Mobile Responsive: CSS Grid with media queries for mobile stacking
- Optimistic Updates: Immediate UI updates for better UX
- Form Validation: Client-side validation with real-time error display


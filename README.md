# Personal Learning Tracker

A full-stack application for tracking and managing learning resources, built with Next.js and Django REST Framework.

## ✨ Core Features

- **Authentication:** Email-based signup/login with JWT and protected routes
- **Resource Management:** Create, organize, and track learning materials (Articles, Videos, Quizzes)
- **Progress Tracking:** Mark resources as complete with automatic time calculation
- **Analytics:** View completion rates and time spent by category
- **Category Organization:** Group and manage resources by custom categories

## 🛠️ Technology Stack

### Frontend
- Next.js 15 (with SSR)
- TypeScript
- TailwindCSS
- React Query for state management
- React Hook Form + Zod for form validation
- Shadcn UI components

### Backend
- Django 5.1.5
- Django REST Framework
- PostgreSQL
- SimpleJWT
- Custom querysets with annotations

## 📊 Data Models

- **User:** Email-based authentication
- **Category:** Learning resource categories
- **Resource:** Learning materials with title, type, description
- **ProgressLog:** Automatic time tracking from creation to completion

## 🔑 Key Features Implementation

### Authentication
- JWT-based auth with HTTP-only cookies
- Protected routes and API endpoints
- Automatic token refresh

### Dashboard
- Category-wise resource listing
- Progress summary with annotated calculations
- Automatic time tracking analytics

### Resource Management
- Add/edit resources with Zod schema validation
- Interactive "Mark as Complete" button with real-time updates
- Automatic time calculation on completion
- Custom querysets for efficient data retrieval

### Form Handling
- Client-side validation using React Hook Form
- Schema validation using Zod
- Real-time error feedback
- Type-safe form submissions

## 🚀 Local Development

1. Clone
```bash
git clone https://github.com/Amaljith64/Task
cd Task
```

2. Configure environment
```bash
cp .env.example .env
```

3. Generate Django Secret Key
```python
# Run this in your Python console to generate a secure key for env
import secrets
print(secrets.token_urlsafe(32))
```

4. Start and Run migrations
```bash
docker compose up -d --build
docker compose exec backend python manage.py migrate
```

## 📝 API Endpoints

### Authentication
- `POST /server/v1/auth/register/` - Register
- `POST /server/v1/auth/login/` - Login
- `POST /server/v1/auth/logout/` - Logout

### Resources
- `GET/POST /server/v1/resources/` - List/Create resources
- `GET /server/v1/resources/<id>/` - Resource details
- `POST /server/v1/resources/<id>/mark_complete/` - Mark complete with automatic time calculation

### Categories
- `GET/POST /server/v1/categories/` - List/Create categories
- `GET /server/v1/categories/<id>/summary/` - Category summary with aggregated stats

### Analytics
- `GET /server/v1/resources/summary/` - Overall statistics using custom querysets and annotations

# Drive Thrive Market Backend

A Node.js/Express backend API for the Drive Thrive Market car marketplace platform using PostgreSQL.

## Setup Instructions

### 1. Prerequisites
- Node.js 16+
- PostgreSQL 12+
- npm or yarn

### 2. Installation

```bash
cd backend
npm install
```

### 3. Database Setup

1. Create PostgreSQL database:
```bash
psql -U postgres -c "CREATE DATABASE drive_thrive;"
```

2. Run database schema:
```bash
psql -U postgres -d drive_thrive -f database.sql
```

### 4. Environment Configuration

Create `.env` file (already provided):
```
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=drive_thrive
DB_USER=postgres
DB_PASSWORD=postgres
JWT_SECRET=your_jwt_secret_key_here_change_in_production
NODE_ENV=development
```

### 5. Run Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Server runs on http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Cars
- `GET /api/cars` - List all cars with filters
- `GET /api/cars/:id` - Get single car
- `POST /api/cars` - Create listing (requires auth)
- `PUT /api/cars/:id` - Update listing (requires auth)
- `DELETE /api/cars/:id` - Delete listing (requires auth)

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update profile (requires auth)
- `GET /api/users/:id/listings` - Get user's listings

### Messages
- `GET /api/messages` - Get conversations (requires auth)
- `GET /api/messages/:userId` - Get messages with user (requires auth)
- `POST /api/messages` - Send message (requires auth)

### Favorites
- `GET /api/favorites` - List favorites (requires auth)
- `POST /api/favorites/:carId` - Add to favorites (requires auth)
- `DELETE /api/favorites/:carId` - Remove from favorites (requires auth)

### Test Drives
- `GET /api/test-drives` - Get requests for seller (requires auth)
- `POST /api/test-drives` - Request test drive (requires auth)
- `PUT /api/test-drives/:id` - Update status (requires auth)

### Offers
- `GET /api/offers` - Get offers for seller (requires auth)
- `POST /api/offers` - Create offer (requires auth)
- `PUT /api/offers/:id` - Update offer (requires auth)

## Frontend Integration

Update frontend API calls to point to:
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

Use the provided `src/api/client.js` for API calls.

## Database Schema

- `users` - User accounts and profiles
- `cars` - Car listings
- `car_images` - Car images
- `favorites` - User's saved cars
- `test_drive_requests` - Test drive bookings
- `offers` - Offers from buyers
- `messages` - User conversations
- `reviews` - Car reviews
- `transactions` - Purchase records

## Authentication

JWT tokens required for protected routes. Include in headers:
```
Authorization: Bearer <token>
```

## Error Handling

All endpoints return consistent error format:
```json
{ "error": "Error message" }
```

## Production Deployment

1. Update JWT_SECRET in .env
2. Configure PostgreSQL with secure credentials
3. Set NODE_ENV=production
4. Use process manager like PM2
5. Enable CORS for frontend domain

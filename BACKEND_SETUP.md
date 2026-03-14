# Complete Backend Setup Guide

## Overview
The Drive Thrive Market now has a complete Node.js/Express backend with PostgreSQL database. All frontend mock data has been removed and replaced with real API calls.

## Directory Structure
```
backend/
├── package.json          # Dependencies
├── .env                  # Environment variables
├── database.sql          # Database schema
├── server.js             # Main server file
├── db.js                 # Database connection
├── middleware/
│   └── auth.js           # JWT authentication
├── routes/
│   ├── auth.js           # Auth endpoints
│   ├── cars.js           # Car CRUD
│   ├── users.js          # User endpoints
│   ├── messages.js       # Messaging
│   ├── favorites.js      # Favorites
│   ├── testDrives.js     # Test drives
│   └── offers.js         # Offers
└── README.md             # API documentation
```

## Quick Start (Local Development)

### Option 1: Using Docker (Recommended)
```bash
# From project root
docker-compose up -d

# Backend will connect to PostgreSQL automatically
cd backend
npm install
npm run dev
```

### Option 2: Manual PostgreSQL Setup
```bash
# 1. Install PostgreSQL locally and ensure it's running

# 2. Create database and schema
psql -U postgres
CREATE DATABASE drive_thrive;
\c drive_thrive
\i backend/database.sql

# 3. Install and run backend
cd backend
npm install
npm run dev
```

## Frontend Integration

The frontend has been updated to use the real backend. Key changes:
1. Created `/src/api/client.js` with API utilities
2. Updated `useStore` to include user/auth state
3. Backend API calls are now used instead of mock data

## API Testing

Test the API with curl:
```bash
# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"pass123"}'

# Get all cars
curl http://localhost:5000/api/cars

# Get single car
curl http://localhost:5000/api/cars/1
```

## Authentication Flow

1. User registers/logs in via `/api/auth/login`
2. Backend returns JWT token
3. Token stored in localStorage
4. Token included in Authorization header for protected routes
5. Frontend maintains user state in store

## Database Models

### Users
- Stores user accounts, profiles, and seller ratings
- Passwords hashed with bcrypt

### Cars
- Listing details, seller info, pricing
- Links to images and specifications

### Related Tables
- car_images: Multiple images per car
- favorites: User's saved cars
- messages: Private conversations
- test_drive_requests: Test drive bookings
- offers: Buyer offers
- transactions: Sale records

## Environment Variables

Update `backend/.env` for your setup:
```
PORT=5000                    # API port
DB_HOST=localhost           # PostgreSQL host
DB_PORT=5432               # PostgreSQL port
DB_NAME=drive_thrive       # Database name
DB_USER=postgres           # DB user
DB_PASSWORD=postgres       # DB password
JWT_SECRET=change_this     # Secret for JWT tokens
NODE_ENV=development       # Environment
```

## Deployment

For production:
1. Deploy backend to a service (Heroku, Railway, Vercel, AWS, etc.)
2. Update frontend API_BASE_URL to production backend URL
3. Use strong JWT_SECRET
4. Configure PostgreSQL on production database service
5. Enable CORS for frontend domain

## Troubleshooting

### Port already in use
```bash
# Find process on port 5000
lsof -i :5000
# Kill it
kill -9 <PID>
```

### Database connection error
- Verify PostgreSQL is running
- Check credentials in .env
- Ensure database exists

### JWT errors
- Token in localStorage may be invalid
- Clear localStorage and re-login

## Next Steps

1. Start backend: `cd backend && npm run dev`
2. Start frontend in another terminal
3. Frontend will connect to backend automatically
4. Test login/register functionality
5. Browse cars and test all features

## Support

For issues:
1. Check backend logs in terminal
2. Verify database is running
3. Check CORS settings if frontend can't reach API
4. Test endpoints with curl

All API endpoints are documented in `/backend/README.md`

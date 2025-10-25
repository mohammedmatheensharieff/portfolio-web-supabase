# Portfolio Web Platform

Modern portfolio web app featuring a React (Vite + Tailwind) frontend and a MongoDB-powered Express API. Includes user authentication, blog management, a contact form, and a dedicated admin portal with separate credentials.

## Prerequisites
- **Node.js 18+** (required for Vite dev server and Web Crypto APIs)
- **MongoDB** (local instance or Docker container)
- **npm** (ships with Node)

## Environment Setup

### Frontend (`.env`)
Create `.env` in the project root:
```bash
cp .env.example .env
```
Default value:
```
VITE_API_URL=http://localhost:5000/api
```

### Backend (`server/.env`)
Create the backend environment file:
```bash
cp server/.env.example server/.env
```
Update the variables as needed:
```
MONGO_URI=mongodb://127.0.0.1:27017/portfolio
JWT_SECRET=super-secret-key
JWT_EXPIRES_IN=7d
ADMIN_JWT_SECRET=super-secret-admin-key
ADMIN_JWT_EXPIRES_IN=1d
CLIENT_ORIGIN=http://localhost:5173
PORT=5000
```

## Installation

Install frontend dependencies:
```bash
npm install
```

Install backend dependencies:
```bash
cd server
npm install
```

## Running Locally

1. **Start MongoDB** (example via Docker):
   ```bash
   docker run -d --name portfolio-mongo -p 27017:27017 mongo:6.0
   ```

2. **Start the API**:
   ```bash
   cd server
   npm run dev   # uses nodemon
   ```

3. **Start the frontend** (in a new terminal):
   ```bash
   npm run dev
   ```
   Vite runs on `http://localhost:5173` by default.

## API Highlights
- `POST /api/auth/register` — create a user and receive a JWT
- `POST /api/auth/login` — authenticate and receive a JWT
- `GET /api/auth/me` — retrieve the current user (JWT required)
- `PUT /api/auth/profile` — update profile details (JWT required)
- `POST /api/auth/forgot-password` — request a password reset token
- `POST /api/auth/reset-password` — reset password with token
- `GET /api/blog` — list published posts
- `POST /api/blog` — create a post (JWT required)
- `PUT /api/blog/:slug` — update a post (author only)
- `DELETE /api/blog/:slug` — delete a post (author only)
- `POST /api/contact` — submit a contact message
- `POST /api/admin/auth/login` — admin login (sets HttpOnly cookie)
- `GET /api/admin/users` — list users (admin cookie required)
- `PATCH /api/admin/users/:id` — update user role/profile or reset password (admin cookie required)

### Promoting the First Admin
After registering your account, mark it as admin directly in MongoDB:
```bash
docker exec -it portfolio-mongo mongosh
use portfolio
db.users.updateOne({ email: 'mohammed@zoeencloud.in' }, { $set: { role: 'admin' } })
exit
```
Then log in via the dedicated admin portal at `http://localhost:5173/admin/login`.

## Admin Portal
- Accessible only after logging in through `/admin/login`
- Uses a secure HttpOnly cookie separate from regular user sessions
- Manage users, adjust roles, and trigger password resets via `/admin/users`

## Notes
- The contact form stores messages in MongoDB (`contactmessages` collection).
- Password reset emails are logged to the server console in development.
- Update the copy, visuals, and sections to match your personal brand.

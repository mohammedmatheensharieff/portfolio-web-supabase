# Mohammed Matheen – Portfolio Web Platform

A full-stack portfolio built with a React (Vite + Tailwind) frontend and a MongoDB-backed Express API. The platform covers public storytelling (projects, blog, contact), authenticated dashboards, and a dedicated admin surface. This README captures architecture, setup, and PM2 deployment details so the project can run as a complete multi-service app.

## 🔥 Features

- **Modern frontend**: Responsive React UI using Vite, Tailwind, Framer Motion, and Lucide icons.
- **Auth & profiles**: JWT-powered login/register plus profile editing with avatar/metadata storage.
- **Blog system**: Create, edit, and browse posts with Markdown-ready content.
- **Contact + FinOps hub**: Enriched contact form with project focus areas and global DevOps/FinOps news aggregation.
- **Admin portal**: Separate cookie-secured routes for user management and role assignment.
- **API-first backend**: Express + Mongoose (MongoDB) with robust validation, reset tokens, and sanitisation.
- **PM2 ecosystem**: Production-ready process manager launching backend and static frontend with defined ports (API `5000`, frontend `4173`).
- **Instant resume access**: Latest CV served from `/mohammed.pdf`.

## 🧱 Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion, React Router, Lucide Icons
- **Backend**: Node.js 18+, Express, Mongoose, JWT, bcrypt, express-validator
- **Database**: MongoDB 6 (local or managed)
- **Process management**: PM2 with a custom ecosystem configuration
- **Tooling**: ESLint, TypeScript support, serve CLI for static hosting

## 📁 Project Structure

```
.
├─ public/              # Static assets (includes mohammed.pdf resume)
├─ src/                 # Frontend React application
├─ server/              # Express API (index.js entry point)
├─ ecosystem.config.cjs # PM2 configuration for backend + frontend
├─ package.json         # Root scripts (frontend)
└─ README.md
```

## ⚙️ Environment Setup

### 1. Prerequisites
- Node.js **18+**
- npm (bundled with Node)
- MongoDB (local install or Docker container)

### 2. Frontend environment

Create `.env` in the project root (only key currently required for local dev):
```bash
cp .env.example .env   # if provided
```
```
VITE_API_URL=http://localhost:5000/api
```

### 3. Backend environment

Create and edit `server/.env`:
```bash
cp server/.env.example server/.env
```
```
MONGO_URI=mongodb://127.0.0.1:27017/portfolio
JWT_SECRET=your-generated-64-char-hex
JWT_EXPIRES_IN=7d
ADMIN_JWT_SECRET=your-other-generated-hex
ADMIN_JWT_EXPIRES_IN=1d
CLIENT_ORIGIN=http://localhost:5173
PORT=5000
```

Generate secrets quickly with either command:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
openssl rand -hex 64
```

## 🚀 Local Development

1. **Install dependencies**
   ```bash
   npm install          # frontend deps
   cd server && npm install
   ```

2. **Start MongoDB** (example with Docker):
   ```bash
   docker run -d --name portfolio-mongo -p 27017:27017 mongo:6.0
   ```

3. **Run backend**
   ```bash
   cd server
   npm run dev
   ```

4. **Run frontend**
   ```bash
   npm run dev
   ```
   Vite serves the app at `http://localhost:5173`.

## 🧾 API Highlights

- `POST /api/auth/register` — User signup (returns JWT)
- `POST /api/auth/login` — Login with email **or username**
- `GET /api/auth/me` — Profile info (JWT required)
- `PUT /api/auth/profile` — Update username/full name/avatar
- `POST /api/auth/forgot-password` & `/api/auth/reset-password`
- `GET /api/blog` — Public blog list
- `POST /api/blog` — Create post (auth required)
- `PUT/DELETE /api/blog/:slug` — Manage own posts
- `POST /api/contact` — Contact/brief submissions
- `POST /api/admin/auth/login` — Admin login (HttpOnly cookie)
- `GET /api/admin/users` & `PATCH /api/admin/users/:id` — Admin tools

### Promote first admin

After registering yourself, grant admin role directly:
```bash
docker exec -it portfolio-mongo mongosh
use portfolio
db.users.updateOne({ email: 'you@example.com' }, { $set: { role: 'admin' } })
exit
```
Log in via `http://localhost:5173/admin/login`.

## 🧑‍💻 Building for Production

```bash
npm run build       # creates optimized frontend in dist/
cd server
npm start           # run API with NODE_ENV=production (ensure env vars set)
```

Frontend bundle can be served via any static provider. In this repo we use the `serve` CLI and PM2 for process management.

## 🔄 PM2 Deployment

`ecosystem.config.cjs` defines two apps with fixed ports:

- `portfolio-backend` → runs `node server/src/index.js` on port **5000**
- `portfolio-frontend` → serves `dist/` via `npx serve` on port **4173**

### Steps

```bash
npm install -g pm2
npm run build             # compile frontend
pm2 start ecosystem.config.cjs
pm2 ls                    # view process list
```

Useful PM2 commands:
- `pm2 logs portfolio-backend`
- `pm2 logs portfolio-frontend`
- `pm2 restart portfolio-backend`
- `pm2 save && pm2 startup` (optional: make PM2 boot on restart)

## 📝 Assets & Extras

- Latest resume: `public/mohammed.pdf` (available at `https://<your-domain>/mohammed.pdf`)
- Contact form submissions and blog content are stored in MongoDB collections (`contactmessages`, `blogposts`, etc.).

## 💡 Notes

- Password reset emails are logged to the server console during development.
- Update copy and imagery to match your personal brand (About, Projects, Contact).
- Keep `VITE_API_URL` in sync with the deployed backend URL when hosting remotely.

## 🌐 Deploying on AWS (example)

- **Backend env vars**: set `MONGO_URI`, `JWT_SECRET`, `ADMIN_JWT_SECRET`, `CLIENT_ORIGIN=https://mohammed.zoeencloud.in`, `PORT=5000` on your EC2 instance (or managed service). Use the commands above to generate secrets.
- **MongoDB**: provision a reachable instance (Atlas or self-hosted). Open the firewall to the EC2 IP.
- **Frontend build**: run `npm run build` and serve `dist/` either with the PM2 frontend process (`npx serve dist --listen 4173`) or via S3/CloudFront. Adjust `VITE_API_URL` before building so it points at the public API domain.
- **PM2**: install Node 18+, run `npm install` in root and `server/`, then launch with `pm2 start ecosystem.config.cjs`. `pm2 save && pm2 startup` keeps processes alive across reboots.
- **Reverse proxy / TLS**: use Nginx or an ALB to map `https://mohammed.zoeencloud.in` to the frontend and `https://api.mohammed.zoeencloud.in` (or `/api`) to the backend. Terminate TLS with ACM or certbot.
- **DNS**: create A/ALIAS records so your domain(s) point to the load balancer or EC2 public IP.
- **Admin access**: admins don’t need a second login—once a user has `role: 'admin'`, the Admin portal is available from the main navigation.

Enjoy building and showcasing your work! Feel free to tailor components, animations, and content structure to keep the portfolio fresh. If you have questions about extending the stack or deployment, drop a message through the contact form (now super-powered with DevOps + FinOps brief prompts). 🚀

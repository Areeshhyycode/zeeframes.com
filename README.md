# zeeframes.com

Full-stack project (client + server) with an AI chatbot (ZeeBot) that answers
from an admin-managed knowledge base.

## Structure
- `client/` — frontend (Vite + React + Tailwind)
- `server/` — backend (Node.js + Express + MongoDB)

## Features
- **Auth** — sign up / log in with JWT sessions (passwords hashed with bcrypt).
- **Gated chat** — the `/chat` page (ZeeBot) requires a logged-in account.
- **Roles** — `customer` and `admin`. Anyone who registers with the configured
  `ADMIN_EMAIL` becomes an admin.
- **Admin dashboard** (`/admin`, admin-only) — upload PDF / TXT / MD documents
  into the knowledge base, and delete them.
- **Grounded answers** — ZeeBot retrieves the most relevant passages from the
  uploaded documents and answers from them. If it can't find an answer it offers
  a human handoff. Set `GROQ_API_KEY` for LLM-generated answers; without it the
  bot returns the best-matching passage.

## How auth works
1. User registers → password is bcrypt-hashed, a JWT is returned and stored in
   `localStorage`.
2. Every protected API call sends `Authorization: Bearer <token>`.
3. `requireAuth` middleware verifies the token; `requireAdmin` additionally
   checks the role. The frontend `ProtectedRoute` guards `/chat` and `/admin`.

## Setup

### Server
```bash
cd server
npm install
# create a .env file with:
#   PORT=5000
#   MONGO_URI=...                       # MongoDB connection string
#   JWT_SECRET=<long random string>
#   ADMIN_EMAIL=admin@zeeframes.com     # registering with this email = admin
#   GROQ_API_KEY=gsk_...                # optional, enables LLM answers
#   GROQ_MODEL=llama-3.3-70b-versatile  # optional
npm start
```

### Client
```bash
cd client
npm install
npm run dev
```

## Deployment

This is a monorepo: the **frontend** (`client/`) is a static Vite app and the
**backend** (`server/`) is an Express server. They deploy to **two different
places** — the Express server cannot run on Vercel's static hosting.

### Backend → Render
1. Push this repo to GitHub.
2. In Render: **New + → Blueprint**, select this repo. Render reads
   [`render.yaml`](render.yaml) and creates the `zeeframes-api` web service
   (root directory `server/`).
3. Fill in the env vars when prompted: `MONGO_URI`, `JWT_SECRET`, `ADMIN_EMAIL`,
   and optionally `GROQ_API_KEY`. (Render sets `PORT` automatically.)
4. In **MongoDB Atlas → Network Access**, add `0.0.0.0/0` so Render can connect.
5. Note your service URL, e.g. `https://zeeframes-api.onrender.com`.

### Frontend → Vercel
1. In Vercel, import the repo and set **Root Directory** to `client` (this is the
   key step — without it the build fails because there's no `package.json` at the
   repo root).
2. Add an environment variable `VITE_API_URL` = your Render URL from above.
3. Deploy. The frontend now calls the Render backend; `client/vercel.json`
   handles SPA routing.

> Locally you don't need `VITE_API_URL` — the Vite dev proxy forwards `/api` to
> `http://localhost:5000` (see `client/vite.config.js`).

## Try it
1. Go to `/signup` and register with the email set in `ADMIN_EMAIL` → you land on
   the **Admin Dashboard**. Upload a PDF/TXT/MD (e.g. an FAQ).
2. Register a second account with any other email (a customer).
3. Open `/chat` and ask a question — ZeeBot answers from the uploaded document.

## API
| Method | Route                  | Auth   | Purpose                          |
| ------ | ---------------------- | ------ | -------------------------------- |
| POST   | `/api/auth/register`   | —      | Create an account                |
| POST   | `/api/auth/login`      | —      | Log in, returns a JWT            |
| GET    | `/api/auth/me`         | user   | Current user (restore session)   |
| POST   | `/api/chat`            | user   | Ask ZeeBot a grounded question   |
| POST   | `/api/documents`       | admin  | Upload a knowledge-base document |
| GET    | `/api/documents`       | admin  | List documents                   |
| DELETE | `/api/documents/:id`   | admin  | Remove a document                |
| POST   | `/api/contacts`        | —      | Submit a contact/lead            |

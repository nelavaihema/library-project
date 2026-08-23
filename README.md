# LibraryHub

A portfolio-ready library management system with React/Vite, Express, MongoDB, JWT authentication, role-based admin tools, book discovery, lending, returns, and overdue reporting.

## Run it

1. Install Node.js and create a MongoDB Atlas database (or use local MongoDB).
2. Copy `backend/.env.example` to `backend/.env` and set `MONGO_URI`, `JWT_SECRET`, and `CLIENT_URL`.
3. Copy `frontend/.env.example` to `frontend/.env`.
4. Run `cd backend; npm install; npm run seed; npm run dev`.
5. In another terminal run `cd frontend; npm install; npm run dev`.
6. Open the Vite URL shown in the terminal. Seed admin: `admin@libraryhub.dev` / `admin123`.

## API

`POST /api/auth/register`, `POST /api/auth/login`, `GET /api/books?search=&category=`, `GET /api/books/:id`, admin CRUD at `/api/books`, admin category CRUD at `/api/categories`, admin `POST /api/transactions/issue`, authenticated `GET /api/transactions/my-books`, `GET /api/transactions/history`, `PATCH /api/transactions/:id/return`, and admin dashboard at `GET /api/admin/dashboard`.

Production deployments should use MongoDB Atlas and deploy the Express backend to Render or Railway. Deploy this repository to Netlify for the frontend; `netlify.toml` configures the Vite build and React Router fallback. In Netlify site settings, set `VITE_API_URL` to the deployed backend URL ending in `/api`. On the backend, set `CLIENT_URL` to the Netlify site URL and set `MONGO_URI` and `JWT_SECRET`.

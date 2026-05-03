# Habit Tracker

A full-stack habit tracking app built with React, Express, and MongoDB. Add habits, track your daily progress, and stay consistent — with all data persisted to your own MongoDB database.

---

## Tech Stack

| Layer | Tech |
|-------|------|
| **Frontend** | React (Vite) · React Router · Axios · CSS |
| **Backend** | Node.js · Express.js |
| **Database** | MongoDB · Mongoose |
| **Auth** | JWT · bcryptjs |
| **Dev** | Concurrently · Nodemon · dotenv |

---

## Project Structure

```
habit-tracker/
├── client/               # React frontend (Vite)
│   └── src/
│       ├── components/   # Reusable UI components
│       ├── pages/        # Home, Login, Register
│       ├── context/      # Auth context
│       └── utils/        # API helpers
├── server/               # Express backend
│   ├── config/           # DB connection
│   ├── controllers/      # Route logic
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API routes
│   ├── middleware/       # Auth middleware
│   └── utils/            # Token helpers
├── package.json          # Root — runs both with concurrently
└── .env
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### 1. Clone the repo

```bash
git clone https://github.com/vanshkapadia11/Habit-Tracker-With-MongoDB.git
cd Habit-Tracker-With-MongoDB
```

### 2. Set up environment variables

Create a `.env` file in the `server/` directory:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

### 3. Install dependencies

```bash
# Root (concurrently)
npm install

# Backend
cd server && npm install

# Frontend
cd ../client && npm install
```

### 4. Run the app

From the root folder:

```bash
npm run dev
```

This starts both the frontend and backend simultaneously using `concurrently`.

| Service | URL |
|---------|-----|
| Frontend | `http://localhost:5173` |
| Backend | `http://localhost:5000` |

---

## Features

- **User auth** — Register, login, and JWT-protected routes
- **Add habits** — Create and manage your personal habits
- **Daily tracking** — Mark habits as done each day
- **Persistent data** — Everything stored in your own MongoDB database
- **Full-stack** — Separate client and server, running together seamlessly

---

## API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/users/register` | Register a new user |
| `POST` | `/api/users/login` | Login and receive JWT |
| `GET` | `/api/habits` | Get all habits (auth required) |
| `POST` | `/api/habits` | Create a new habit |
| `PUT` | `/api/habits/:id` | Update / toggle habit |
| `DELETE` | `/api/habits/:id` | Delete a habit |

---

## License

MIT © [Vansh Kapadia](https://github.com/vanshkapadia11)

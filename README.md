# Veda AI — Assignment Generator

> AI-powered assignment generator for educators. Built with Next.js, Groq, Express, and MongoDB.

---

## 📁 Monorepo Structure

```
veda/
├── frontend/          # Next.js 16 + Zustand + Groq
├── backend/           # Express + MongoDB + TypeScript
├── .gitignore
└── README.md
```

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16 (App Router), Zustand, Tailwind CSS |
| AI | Groq API (llama3-70b) |
| Backend | Express, TypeScript |
| Database | MongoDB Atlas (Mongoose) |
| PDF Export | Print CSS + `window.print()` |

---

## 🧠 Core Flow

```
User fills form (Step 1 + Step 2)
        ↓
Frontend calls Groq API (streaming)
        ↓
Assignment rendered with sections, marks, difficulty badges
        ↓
User clicks Save → POST /api/assignments (backend)
        ↓
Saved to MongoDB Atlas
        ↓
Assignment List page fetches GET /api/assignments on load
```

---

## 🗺️ Architecture

```
┌──────────────────────────────────┐
│       Next.js Frontend           │
│  (Vercel — veda-ai.vercel.app)   │
│                                  │
│  Zustand ──► Groq API (direct)   │
│      │                           │
│      └──► backend (REST)         │
└──────────────┬───────────────────┘
               │
┌──────────────▼───────────────────┐
│       Express Backend            │
│  (Railway — veda-backend.up)     │
│                                  │
│  Routes ──► Controllers          │
│               │                  │
│               └──► MongoDB Atlas │
└──────────────────────────────────┘
```

---

## ⚙️ Local Setup

### 1. Clone

```bash
git clone https://github.com/YOUR_USERNAME/veda.git
cd veda
```

### 2. Backend

```bash
cd backend
npm install
```

Create `backend/.env`:
```env
MONGODB_URI=mongodb+srv://YOUR_USER:YOUR_PASS@cluster.mongodb.net/veda
PORT=5000
```

```bash
npm run dev   # http://localhost:5000
```

### 3. Frontend

```bash
cd frontend
npm install
```

Create `frontend/.env.local`:
```env
GROQ_API_KEY=your_groq_api_key_here
NEXT_PUBLIC_API_URL=http://localhost:5000
```

```bash
npm run dev   # http://localhost:3000
```

---

## 📡 API Reference

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/assignments` | Save a generated assignment |
| `GET` | `/api/assignments` | List all saved assignments |
| `GET` | `/api/assignments/:id` | Get single assignment |
| `DELETE` | `/api/assignments/:id` | Delete an assignment |

---

## 🚢 Deployment

**Frontend → Vercel**
1. Connect `veda` repo → set **Root Directory** to `frontend`
2. Add env vars: `GROQ_API_KEY`, `NEXT_PUBLIC_API_URL` (your Railway URL)

**Backend → Railway**
1. Connect `veda` repo → set **Root Directory** to `backend`
2. Add env vars: `MONGODB_URI`, `PORT=5000`

---

## 🔮 Planned Improvements

- **WebSocket / SSE** — Real-time generation status updates
- **Redis** — Cache assignments by config hash to reduce Groq API calls
- **BullMQ** — Background job queue with retry logic
- **Auth** — Teacher accounts with per-user assignment history
- **DOCX export** — Word document download in addition to PDF

---

## 📝 License

MIT

# Veda AI — Assignment Generator (Frontend)

> AI-powered assignment generator for educators. Built with Next.js, Groq, and MongoDB.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| State Management | Zustand |
| AI Generation | Groq API (llama3-70b) |
| Styling | Tailwind CSS |
| PDF Export | Print CSS + `window.print()` |
| Backend API | Express + MongoDB (see `veda-backend`) |

---

## 📁 Project Structure

```
veda-ai/
├── app/
│   ├── page.tsx                  # Step 1: Subject & grade form
│   ├── assignment/
│   │   ├── new/page.tsx          # Step 2: Configuration form
│   │   ├── output/page.tsx       # Generated assignment view
│   │   └── list/page.tsx         # Saved assignments (from MongoDB)
├── components/
│   ├── AssignmentForm.tsx
│   ├── OutputSection.tsx
│   ├── DifficultyBadge.tsx
│   └── ActionBar.tsx
├── store/
│   └── assignmentStore.ts        # Zustand global state
├── lib/
│   └── api.ts                    # Backend API calls
└── .env.local                    # GROQ_API_KEY, NEXT_PUBLIC_API_URL
```

---

## ⚙️ Setup

```bash
git clone https://github.com/YOUR_USERNAME/veda-ai
cd veda-ai
npm install
```

Create `.env.local`:

```env
GROQ_API_KEY=your_groq_api_key_here
NEXT_PUBLIC_API_URL=http://localhost:5000
```

```bash
npm run dev
# Runs on http://localhost:3000
```

---

## 🧠 Core Flow

```
User fills form (Step 1 + Step 2)
        ↓
Frontend calls Groq API directly (streaming)
        ↓
Assignment rendered with sections, marks, difficulty badges
        ↓
User clicks Save → POST /api/assignments (veda-backend)
        ↓
Saved to MongoDB Atlas
        ↓
Assignment List page fetches GET /api/assignments on load
```

---

## 📄 PDF Export

Uses `window.print()` with a dedicated `@media print` stylesheet that:
- Hides navigation, action bar, and browser chrome
- Renders clean A4-formatted output
- Preserves section hierarchy and marks

To print/save as PDF: click **Download** → browser print dialog → **Save as PDF**.

---

## 🔌 API Endpoints (veda-backend)

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/assignments` | Save a generated assignment |
| `GET` | `/api/assignments` | List all saved assignments |
| `GET` | `/api/assignments/:id` | Get a single assignment |
| `DELETE` | `/api/assignments/:id` | Delete an assignment |

---

## 🗺️ Architecture Overview

```
┌─────────────────────────────────┐
│          Next.js Frontend       │
│  (Vercel — veda-ai.vercel.app)  │
│                                 │
│  Zustand ──► Groq API (direct)  │
│      │                          │
│      └──► veda-backend (REST)   │
└──────────────┬──────────────────┘
               │
┌──────────────▼──────────────────┐
│       Express Backend           │
│  (Railway — veda-backend.up)    │
│                                 │
│  Routes ──► Controllers         │
│               │                 │
│               └──► MongoDB Atlas│
└─────────────────────────────────┘
```

---

## 🔮 Planned Improvements

- **WebSocket / SSE** — Real-time generation status updates instead of polling
- **Redis caching** — Cache generated assignments by subject+grade+config hash to reduce Groq API calls
- **BullMQ job queue** — Offload generation jobs to background workers for scalability
- **Auth** — Teacher accounts with per-user assignment history
- **Export formats** — DOCX export in addition to PDF

---

## 🚢 Deployment

**Frontend → Vercel**
```bash
vercel --prod
# Set GROQ_API_KEY and NEXT_PUBLIC_API_URL in Vercel dashboard
```

**Backend → Railway** (see `veda-backend/README.md`)

---

## 📝 License

MIT

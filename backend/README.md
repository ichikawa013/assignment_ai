# Veda Backend — Assignment API

> Express + MongoDB backend for the Veda AI assignment generator.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js + TypeScript |
| Framework | Express |
| Database | MongoDB Atlas (via Mongoose) |
| Validation | Zod |

---

## 📁 Project Structure

```
veda-backend/
├── src/
│   ├── index.ts               # Entry point, Express app
│   ├── routes/
│   │   └── assignments.ts     # Assignment CRUD routes
│   ├── controllers/
│   │   └── assignmentController.ts
│   ├── models/
│   │   └── Assignment.ts      # Mongoose schema
│   └── middleware/
│       └── errorHandler.ts
├── .env                       # MONGODB_URI, PORT
├── tsconfig.json
└── package.json
```

---

## ⚙️ Setup

```bash
git clone https://github.com/YOUR_USERNAME/veda-backend
cd veda-backend
npm install
```

Create `.env`:

```env
MONGODB_URI=mongodb+srv://YOUR_USER:YOUR_PASS@cluster.mongodb.net/veda
PORT=5000
```

```bash
npm run dev
# Runs on http://localhost:5000
```

---

## 📡 API Reference

### `POST /api/assignments`

Save a generated assignment.

**Body:**
```json
{
  "title": "Physics Assignment — Grade 10",
  "subject": "Physics",
  "grade": "10",
  "sections": [
    {
      "title": "Multiple Choice",
      "questions": [...],
      "marks": 20,
      "difficulty": "medium"
    }
  ],
  "totalMarks": 50,
  "generatedAt": "2025-01-01T00:00:00Z"
}
```

**Response:** `201 Created` with saved document.

---

### `GET /api/assignments`

Fetch all saved assignments, sorted by newest first.

**Response:**
```json
[
  { "_id": "...", "title": "...", "subject": "...", ... }
]
```

---

### `GET /api/assignments/:id`

Fetch a single assignment by MongoDB `_id`.

---

### `DELETE /api/assignments/:id`

Delete an assignment by `_id`.

---

## 🗄️ MongoDB Schema

```typescript
{
  title: String,
  subject: String,
  grade: String,
  sections: [
    {
      title: String,
      questions: [{ text: String, marks: Number, difficulty: String }],
      marks: Number,
      difficulty: String
    }
  ],
  totalMarks: Number,
  generatedAt: Date,
  createdAt: Date   // auto via timestamps: true
}
```

---

## 🚢 Deployment (Railway)

1. Push to GitHub
2. Connect repo in [Railway](https://railway.app)
3. Add environment variables: `MONGODB_URI`, `PORT`
4. Railway auto-detects Node.js and deploys

Set `NEXT_PUBLIC_API_URL` in your Vercel frontend to the Railway URL.

---

## 🔮 Planned Improvements

- **WebSocket / SSE** — Emit generation progress events to frontend
- **Redis** — Cache assignments by config hash (TTL: 1 hour)
- **BullMQ** — Job queue for async generation with retry logic
- **Rate limiting** — Per-IP limits on generation endpoints

---

## 📝 License

MIT

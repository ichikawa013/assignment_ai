# VedaAI — AI Assessment Creator

An AI-powered assessment creator that allows teachers to generate structured question papers using LLMs.

## Live Demo

- **Frontend:** https://assignment-ai-eosin.vercel.app
- **Backend:** https://assignment-ai-iu7h.onrender.com

---

## Features

- Create assignments with subject, grade, topic and question configuration
- AI-powered question paper generation using Groq (LLaMA 3.3 70B)
- Structured output with sections, difficulty badges (Easy / Moderate / Hard) and marks
- Student info section (Name, Roll Number, Section)
- Download as PDF via browser print
- Regenerate paper with one click
- All assignments saved to MongoDB and viewable anytime
- Responsive design

---

## Tech Stack

### Frontend
- Next.js 16 + TypeScript
- Zustand (state management)
- Tailwind CSS

### Backend
- Node.js + Express + TypeScript
- MongoDB + Mongoose
- Groq API — LLaMA 3.3 70B

---

## Architecture

```
Teacher fills form (Step 1: details, Step 2: question config)
        ↓
Frontend sends POST /api/generate (Next.js API route)
        ↓
Prompt structured and sent to Groq LLM
        ↓
LLM response parsed into structured JSON
(sections → questions → difficulty → marks)
        ↓
Frontend renders formatted question paper
        ↓
POST to Express backend → saved to MongoDB
        ↓
Assignments list loads from MongoDB on page load
```

---

## Local Setup

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Groq API key (free at console.groq.com)

### Frontend

```bash
git clone https://github.com/ichikawa013/veda-ai
cd frontend
npm install
```

Create `.env.local`:
```
GROQ_API_KEY=your_groq_api_key
```

```bash
npm run dev
```

Runs on http://localhost:3000

### Backend

```bash
cd backend
npm install
```

Create `.env`:
```
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
```

```bash
npm run dev
```

Runs on http://localhost:5000

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/assignments | Save generated assignment |
| GET | /api/assignments | Get all assignments |
| GET | /api/assignments/:id | Get assignment by ID |
| DELETE | /api/assignments/:id | Delete assignment |

---

## Planned Improvements

- **BullMQ** — background job queue for AI generation tasks
- **Redis** — caching generated papers and job state
- **WebSocket** — real-time generation progress pushed from server
- **PDF export** — properly formatted PDF using Puppeteer
- **File upload** — parse uploaded PDF/text as context for generation
- **Authentication** — teacher login and school-specific assignments

---

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── page.tsx                     # Assignments list
│   │   ├── assignments/
│   │   │   ├── create/page.tsx          # Create form
│   │   │   ├── generate/page.tsx        # AI generation loading
│   │   │   └── [id]/output/page.tsx     # Question paper output
│   │   └── api/generate/route.ts        # Groq AI API route
│   ├── components/
│   │   ├── Sidebar.tsx
│   │   └── create/
│   │       ├── StepOne.tsx
│   │       └── StepTwo.tsx
│   └── store/
│       └── assignmentStore.ts           # Zustand store

backend/
├── src/
│   ├── index.ts                         # Express server
│   ├── models/Assignment.ts             # MongoDB schema
│   ├── controllers/
│   │   └── assignmentController.ts
│   └── routes/
│       └── assignments.ts
```
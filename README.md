# Notmon AI 📝

> An AI-powered exam notes & revision assistant designed to help students generate high-yield notes, revision sheets, diagrams, and printable PDFs in seconds.

Built using the **MERN** stack and styled with a premium, modern **Aurora Gradient** dark glassmorphism design.

---

## 🌟 Key Features

*   **🌌 Premium Aurora Theme**: A dark glassmorphism user interface featuring animated teal, cyan, and indigo glow blobs for a premium, distraction-free studying experience.
*   **📱 Mobile-First Design**: Optimized layouts, cards, and slide-up modal sheets that feel native on smartphones, tablets, and desktop displays.
*   **🔥 Study Streak & XP (Gamification)**: Track your daily note-generation consistency with a study streak system, experience points (XP), and total generated notes tracker.
*   **🎥 YouTube One-Shot Suggestions**: In addition to text notes, the AI automatically suggests pre-escaped search links to top Hindi and English "one-shot" lectures on YouTube for the topic.
*   **🤝 Public Shareable Links**: Easily toggle any generated notes to "Public" and copy a clean shareable link (`/shared/:shareId`) to share study materials with classmates.
*   **⬇️ Print-Ready PDF Downloads**: Instantly download well-formatted, high-yield study materials as clean PDFs with a single click.

---

## 🛠️ Tech Stack

### Frontend
*   **React** (Vite) & **Redux Toolkit** (State Management)
*   **Tailwind CSS v4** (Modern Styling)
*   **Framer Motion / Motion** (Smooth Micro-interactions & animations)
*   **Firebase Authentication** (Google Sign-In)

### Backend & AI
*   **Node.js** & **Express**
*   **MongoDB** & **Mongoose** (Database)
*   **JSON Web Tokens (JWT)** (Secure Session Management)
*   **Groq API (Llama-3.3-70b)** (High-speed AI notes generation)

---

## 📋 Environment Variables Setup

Create a `.env` file in the respective directories:

### Client Env (`/client/.env`)
```env
VITE_FIREBASE_APIKEY="your-firebase-api-key"
VITE_SERVER_URL="http://localhost:8000"
```

### Server Env (`/server/.env`)
```env
PORT=8000
MONGO_URI="your-mongodb-atlas-connection-string"
JWT_SECRET="your-jwt-signing-secret"
GROQ_API_KEY="your-groq-api-key"
NODE_ENV="development" # Change to "production" in deployment
```

---

## 🚀 Running Locally

Follow these quick commands to set up the project locally:

### 1. Install Dependencies
```bash
# Install root package dependencies
npm install

# Install client dependencies
cd client && npm install

# Install server dependencies
cd ../server && npm install
```

### 2. Start the Development Servers
From the root directory, you can run the pre-configured start scripts:
```bash
# Run both frontend & backend concurrently
npm run dev
```
*   Frontend runs at: `http://localhost:5173`
*   Backend runs at: `http://localhost:8000`

---

## 🌐 Deployment Configuration

### Frontend (Vercel)
Set the following environment variable in your Vercel Project Settings:
*   `VITE_SERVER_URL`: `https://your-backend-domain.onrender.com`

### Backend (Render / Railway)
Set the following environment variables in your Render/Railway Service Settings:
*   `MONGO_URI`
*   `JWT_SECRET`
*   `GROQ_API_KEY`
*   `NODE_ENV`: `production` (Crucial for secure cookie settings!)

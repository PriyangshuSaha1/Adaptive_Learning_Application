<h1 align="center">Adaptive Learning Platform</h1>

This project is a full-stack **Adaptive Learning Application** built with the MERN stack (MongoDB, Express, React, Node.js) and a Python (FastAPI) Machine Learning backend.

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js** (v18+)
- **Python** (v3.10+)
- **MongoDB Database** (Atlas or local)

### 2. Setup the Backend (Node.js API)
1. Open the `backend/` directory.
2. Copy `.env.example` to `.env` and fill in your keys (MongoDB URI, JWT Secret, Google Auth credentials, etc).
3. Install dependencies and start the server:
   ```bash
   cd backend
   npm install
   npm run dev
   ```
*(Server will start on http://localhost:5000)*

### 3. Setup the ML Service (FastAPI)
1. Open the `ml/` directory.
2. Create a `.env` file and add your `GROQ_API_KEY=your_key_here`.
3. Install dependencies and start the ML API:
   ```bash
   cd ml
   pip install -r requirements.txt
   uvicorn src.app:app --host 127.0.0.1 --port 8000 --reload
   ```
*(API will start on http://127.0.0.1:8000)*

### 4. Setup the Frontend (React)
1. Open the `frontend/` directory.
2. Install dependencies and start the React app:
   ```bash
   cd frontend
   npm install --legacy-peer-deps
   npm start
   ```
*(Frontend will start on http://localhost:3000)*

---

### Project Structure
- **/backend**: Express REST API, handles user auth, quiz logic, and talks to the ML service.
- **/frontend**: React application with advanced proctoring and a dashboard.
- **/ml**: FastAPI microservice serving the DKT (Deep Knowledge Tracing) model and Groq AI integrations.

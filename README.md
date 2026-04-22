# 🎓 Adaptive Learning Application

### Behaviour-Based Difficulty Adjustment System

---

## 🚀 Overview

The **Adaptive Learning Application** is an intelligent web-based platform that dynamically adjusts quiz difficulty based on user behavior and performance.

It uses factors like:

* ⏱️ Response time
* ✅ Answer correctness
* 💡 Hint usage

to deliver a **personalized learning experience**.

---

## ✨ Key Features

### 🧠 Adaptive Learning System

* Automatically adjusts question difficulty (Easy → Medium → Hard)
* Uses ML-based prediction for difficulty selection

### 📊 Performance Tracking

* Accuracy calculation
* Time tracking
* Knowledge estimation

### 🔐 Authentication

* JWT-based login/signup
* Google OAuth integration

### 📚 Quiz System

* Subject & topic-based quizzes
* Real-time next-question generation
* Quiz history tracking

### 🛡️ Anti-Cheating System

* 🎥 Webcam monitoring
* 🎤 Voice detection
* Activity tracking

### 📈 Dashboard

* Quiz history
* Performance analytics
* Learning recommendations

---

## 🏗️ Project Structure

```bash
Adaptive_Learning_Application/
│
├── AutomatedLearning/        # Backend (Node.js + Express)
│   ├── config/               # DB & Passport config
│   ├── controllers/          # Business logic
│   ├── middleware/           # Auth middleware
│   ├── models/               # Mongoose schemas
│   ├── routes/               # API routes
│   ├── services/             # ML & recommendation logic
│   ├── uploads/              # File uploads
│   └── server.js             # Entry point
│
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/       # UI components
│   │   ├── context/          # Auth & Theme context
│   │   ├── services/         # API calls
│   │   ├── pages/            # Pages (Quiz, Dashboard, etc.)
│   │   └── App.js
│
├── .env                      # Environment variables
├── package.json
└── README.md
```

---

## 🛠️ Tech Stack

### 💻 Frontend

* React.js
* Context API
* CSS Modules

### ⚙️ Backend

* Node.js
* Express.js
* MongoDB (Mongoose)

### 🤖 Machine Learning

* Custom ML service (Difficulty Prediction)
* Knowledge Tracking (DKT-inspired)

### 🔐 Authentication

* JWT (JSON Web Tokens)
* Google OAuth

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/PriyangshuSaha1/Adaptive_Learning_Application.git
cd Adaptive_Learning_Application
```

---

### 2️⃣ Install Dependencies

#### Backend

```bash
cd AutomatedLearning
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

---

### 3️⃣ Configure Environment Variables

Create a `.env` file inside `AutomatedLearning/`:

```env
PORT=5000
MONGO_URI=your_mongodb_uri

JWT_SECRET=your_secret_key
JWT_EXPIRE=7d

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback

EMAIL_USER=your_email
EMAIL_PASS=your_app_password

YOUTUBE_API_KEY=your_api_key
CLIENT_URL=http://localhost:3000
```

---

### 4️⃣ Run the Application

#### Start Backend

```bash
cd AutomatedLearning
node server.js
```

#### Start Frontend

```bash
cd frontend
npm start
```

---

## 🧪 API Endpoints

### 🔐 Authentication

* `POST /auth/register`
* `POST /auth/login`
* `GET /auth/google`

### 📚 Quiz

* `POST /quiz/start`
* `POST /quiz/answer`
* `POST /quiz/finish`
* `GET /quiz/history`
* `GET /quiz/subjects`
* `GET /quiz/topics`
* `GET /quiz/recommend-topic`

### 📊 Dashboard

* `GET /dashboard`

---

## 🧠 How It Works

1. User logs in
2. Selects subject & topic
3. Quiz starts
4. System tracks:

   * Time taken
   * Correctness
   * Hint usage
5. ML model predicts next difficulty
6. Next question is generated accordingly
7. Final report + recommendations provided

---

## 🔮 Future Enhancements

* 📱 Mobile version
* 🌐 Cloud deployment (AWS / Vercel)
* 🤖 Advanced AI models
* 📊 Better analytics dashboard

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create a new branch
3. Commit your changes
4. Submit a pull request

---

## 📜 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Priyangshu Saha**
GitHub: https://github.com/PriyangshuSaha1

---

⭐ If you like this project, don’t forget to star the repo!

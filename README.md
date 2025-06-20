# 🧠 ZeroCode FE Assignment – Chatbot App

A fullstack chatbot web app built for the ZeroCode Frontend Engineer assignment.

---

## 🚀 Tech Stack

- **Frontend**: React + Vite + TypeScript + Tailwind CSS + Zustand  
- **Backend**: Express.js + MongoDB + JWT Auth  
- **Deployment**: Netlify (Frontend), Render (Backend)  
- **Bonus Feature**: Chat Export  

---

## 📁 Folder Structure

zerocode-fe-assignment/
├── frontend/ # React + Vite + TypeScript + Tailwind CSS
└── backend/ # Express + MongoDB + JWT Authentication

---

## 🚀 Detailed Tech Stack

| Layer       | Tech Used                           |
|-------------|-------------------------------------|
| Frontend    | React + Vite + TypeScript           |
| Styling     | Tailwind CSS + DaisyUI              |
| State Mgmt  | Zustand                             |
| Backend     | Express.js + MongoDB + JWT          |
| Auth        | JWT + bcrypt                        |
| Deployment  | Netlify (Frontend), Render (Backend)|
| Bonus       | Chat Export                         |

---

## 🔗 Live Links

- **Frontend (Live App)**: [https://thriving-crisp-b1df77.netlify.app](https://thriving-crisp-b1df77.netlify.app)  
- **Backend (API)**: [https://zerocode-fe-assignment.onrender.com](https://zerocode-fe-assignment.onrender.com)

---

## 🧪 Test Credentials

Use these credentials to test the app:
Email: <testuser@gmail.com>
Password: 123456

---

## ✅ Features

- User Registration and Login
- Protected Chat Screen after login
- Chat with dummy bot
- Chat messages stored in MongoDB
- Chat Export (as Bonus feature)

---

## 📦 How to Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/zerocode-fe-assignment.git
cd zerocode-fe-assignment
```

### 2. Setup Backend

```bash
cd backend
npm install

Create a .env file in /backend with:
PORT=5000
MONGO_USER=your_mongo_user
MONGO_PASSWORD=your_mongo_password
MONGO_CLUSTER=your_cluster.mongodb.net
MONGO_DB_NAME=chat_bot
MONGO_APP_NAME=Cluster0
JWT_SECRET=your_jwt_secret

Then run:
npm run dev
```

### 3. Setup Frontend

```bash
cd frontend
npm install

Create a .env file in /frontend with:
VITE_API_URL=http://localhost:5000/api

Then run:
npm run dev
```

### 🧾 Deployment Notes

```bash
Frontend 
Deployed to Netlify

_redirects file added to public/ for SPA routing:

/*    /index.html   200

Backend
Deployed to Render

Environment variables configured in Render dashboard.

MongoDB Atlas used as the database.
```

### 👨‍💻 Author

Abhijit Manna

Feel free to fork and build upon this project!

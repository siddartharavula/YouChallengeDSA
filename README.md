# YouChallengeDSA

**YouChallengeDSA** is a platform for practicing **Data Structures and Algorithms consistently** through structured **15-day, 30-day, and 45-day challenges**.

## Why I Made This

While practicing DSA, it is easy to focus on one data structure for a while and then forget the concepts and problem-solving patterns from another.

I built **YouChallengeDSA** to solve that problem by providing a daily mix of DSA problems, so different data structures and concepts can be practiced regularly instead of focusing on only one and forgetting the others.

The goal is simple: **practice DSA every day and stay consistent across different data structures.**

## 🌐 Live Application

https://you-challenge-dsa.vercel.app/dashboard/15

## 💻 GitHub Repository

https://github.com/siddartharavula/YouChallengeDSA.git

## Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/siddartharavula/YouChallengeDSA.git
cd YouChallengeDSA
```

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 3. Install Backend Dependencies

Open another terminal:

```bash
cd backend
npm install
```

### 4. Create Environment Variables

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 5. Start the Backend

Inside the `backend` folder:

```bash
node server.js
```

### 6. Start the Frontend

Inside the `frontend` folder:

```bash
npm run dev
```

Open the local URL provided by Vite in your browser.

---

**Practice every day. Stay consistent. Challenge yourself. 🚀**

const express = require("express");
const cors = require("cors");

const dsaRoutes = require("./routes/dsaRoutes");
const sqlRoutes = require("./routes/sqlRoutes");
const challengeRoutes = require("./routes/challengeRoutes");
const homeRoutes = require("./routes/homeRoutes");

const authRoutes = require("./routes/authRoutes");
const progressRoutes = require("./routes/progressRoutes");
const profileRoutes = require("./routes/profileRoutes");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://you-challenge-dsa.vercel.app",
      "https://youchallengedsa.vercel.app",
    ],
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "YouChallengeDSA Backend is running",
  });
});

/*
|--------------------------------------------------------------------------
| Main Content APIs
|--------------------------------------------------------------------------
*/

app.use("/api/home", homeRoutes);

app.use("/api/dsa", dsaRoutes);

app.use("/api/sql", sqlRoutes);

app.use("/api/challenges", challengeRoutes);

/*
|--------------------------------------------------------------------------
| Existing APIs
|--------------------------------------------------------------------------
*/

app.use("/api/auth", authRoutes);

app.use("/api/progress", progressRoutes);

app.use("/api/profile", profileRoutes);

module.exports = app;
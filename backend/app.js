const express = require("express");
const cors = require("cors");

const challengeRoutes = require("./routes/challengeRoutes");
const progressRoutes = require("./routes/progressRoutes");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://you-challenge-dsa.vercel.app",
    ],
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "YouChallengeDSA Backend is running",
  });
});

app.use("/api/challenges", challengeRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);

module.exports = app;
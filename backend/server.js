require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

// Start server FIRST
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Connect MongoDB separately
connectDB()
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    console.log("Server will continue running for public APIs.");
  });
const express = require("express");

const {
  updateProfile,
} = require("../controllers/profileController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.put(
  "/",
  authMiddleware,
  updateProfile
);

module.exports = router;
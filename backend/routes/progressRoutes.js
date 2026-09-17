const express = require("express");

const {
  getProgress,
  updateProgress,
} = require("../controllers/progressController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/:days", authMiddleware, getProgress);

router.put("/:days", authMiddleware, updateProgress);

module.exports = router;
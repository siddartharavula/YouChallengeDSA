const express = require("express");

const {
  getChallenge,
  getBeginnerProblems,
} = require("../controllers/challengeController");

const router = express.Router();

// IMPORTANT: beginner must come before /:days
router.get("/beginner", getBeginnerProblems);

router.get("/:days", getChallenge);

module.exports = router;
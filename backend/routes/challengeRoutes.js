const express = require("express");

const {
  getChallenge,
} = require("../controllers/challengeController");

const router = express.Router();

router.get("/:days", getChallenge);

module.exports = router;
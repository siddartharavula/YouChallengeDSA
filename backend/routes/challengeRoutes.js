const express = require("express");

const {
  getChallenges,
  getChallenge,
} = require("../controllers/challengeController");

const router = express.Router();

router.get("/", getChallenges);

router.get("/:days", getChallenge);

module.exports = router;
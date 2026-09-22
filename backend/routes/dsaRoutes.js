const express = require("express");

const {
  getDSA,
  getBeginnerProblems,
  getDSAPractice,
  getDSATopic,
} = require("../controllers/dsaController");

const router = express.Router();

router.get("/", getDSA);

router.get("/beginner", getBeginnerProblems);

router.get("/practice", getDSAPractice);

router.get("/practice/:topic", getDSATopic);

module.exports = router;
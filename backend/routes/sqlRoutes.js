const express = require("express");

const {
  getSQL,
} = require("../controllers/sqlController");

const router = express.Router();

router.get("/", getSQL);

module.exports = router;
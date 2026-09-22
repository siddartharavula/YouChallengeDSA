const sqlProblems = require("../data/sql/sqlProblems");

const getSQL = (req, res) => {
  try {
    res.status(200).json({
      title: "SQL Practice",
      count: sqlProblems.length,
      problems: sqlProblems,
    });
  } catch (error) {
    console.error(
      "Error fetching SQL problems:",
      error.message
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  getSQL,
};
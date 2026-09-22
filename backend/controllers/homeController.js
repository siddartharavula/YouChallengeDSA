const beginnerProblems = require("../data/dsa/beginnerProblems");
const dsaPractice = require("../data/dsa/dsaPractice");
const sqlProblems = require("../data/sql/sqlProblems");

const getHome = (req, res) => {
  try {
    const beginnerCount = beginnerProblems.reduce(
      (total, topic) => total + topic.problems.length,
      0
    );

    const practiceCount = dsaPractice.reduce(
      (total, topic) => total + topic.problems.length,
      0
    );

    res.status(200).json({
      dsa: {
        beginner: {
          title: "DSA Beginner",
          topics: beginnerProblems.length,
          count: beginnerCount,
        },

        practice: {
          title: "DSA Practice",
          topics: dsaPractice.length,
          count: practiceCount,
        },
      },

      sql: {
        title: "SQL Practice",
        count: sqlProblems.length,
      },

      challenges: [
        {
          days: 15,
          title: "15 Days Challenge",
        },
        {
          days: 30,
          title: "30 Days Challenge",
        },
        {
          days: 45,
          title: "45 Days Challenge",
        },
      ],
    });
  } catch (error) {
    console.error(
      "Error fetching home data:",
      error.message
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  getHome,
};
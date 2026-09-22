const beginnerProblems = require("../data/dsa/beginnerProblems");
const dsaPractice = require("../data/dsa/dsaPractice");

const getDSA = (req, res) => {
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
    });
  } catch (error) {
    console.error("Error fetching DSA:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const getBeginnerProblems = (req, res) => {
  try {
    res.status(200).json({
      title: "DSA Beginner",
      count: totalProblems,
      problems: beginnerProblems,
    });
  } catch (error) {
    console.error(
      "Error fetching beginner problems:",
      error.message
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};

const getDSAPractice = (req, res) => {
  try {
    const totalProblems = dsaPractice.reduce(
      (total, topic) => total + topic.problems.length,
      0
    );

    res.status(200).json({
      title: "DSA Practice",
      topics: dsaPractice.length,
      count: totalProblems,
      problems: dsaPractice,
    });
  } catch (error) {
    console.error(
      "Error fetching DSA practice:",
      error.message
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};

const getDSATopic = (req, res) => {
  try {
    const { topic } = req.params;

    const foundTopic = dsaPractice.find(
      (item) => item.slug === topic
    );

    if (!foundTopic) {
      return res.status(404).json({
        message: "DSA topic not found",
      });
    }

    res.status(200).json({
      topic: foundTopic,
    });
  } catch (error) {
    console.error(
      "Error fetching DSA topic:",
      error.message
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  getDSA,
  getBeginnerProblems,
  getDSAPractice,
  getDSATopic,
};
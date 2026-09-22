const challenge15 = require("../data/15daysChallenge");
const challenge30 = require("../data/30daysChallenge");
const challenge45 = require("../data/45daysChallenge");

const getChallenges = (req, res) => {
  try {
    res.status(200).json({
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
    console.error("Error fetching challenges:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const getChallenge = (req, res) => {
  try {
    const { days } = req.params;

    let challenge;

    if (days === "15") {
      challenge = challenge15;
    } else if (days === "30") {
      challenge = challenge30;
    } else if (days === "45") {
      challenge = challenge45;
    } else {
      return res.status(404).json({
        message: "Challenge must be 15, 30, or 45 days",
      });
    }

    res.status(200).json({
      days: Number(days),
      challenge,
    });
  } catch (error) {
    console.error("Error fetching challenge:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  getChallenges,
  getChallenge,
};
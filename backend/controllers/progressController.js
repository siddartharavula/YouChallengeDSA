const User = require("../models/User");

const challenge15 = require("../data/15daysChallenge");
const challenge30 = require("../data/30daysChallenge");
const challenge45 = require("../data/45daysChallenge");

const getChallengeData = (days) => {
  if (days === "15") return challenge15;
  if (days === "30") return challenge30;
  if (days === "45") return challenge45;

  return null;
};

const getProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { days } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const solvedProblems =
      user.progress?.get(days) || [];

    const completedDays =
      user.completedDays?.get(days) || [];

    res.status(200).json({
      days: Number(days),
      solvedProblems,
      completedDays,
      streak: user.streak,
    });
  } catch (error) {
    console.error(
      "Get progress error:",
      error
    );

    res.status(500).json({
      message: "Failed to fetch progress",
    });
  }
};

const updateProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { days } = req.params;
    const { problemLink, solved } = req.body;

    if (!problemLink) {
      return res.status(400).json({
        message: "Problem link is required",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const challenge = getChallengeData(days);

    if (!challenge) {
      return res.status(404).json({
        message: "Invalid challenge",
      });
    }

    let solvedProblems =
      user.progress?.get(days) || [];

    // Mark problem as solved
    if (solved === true) {
      if (!solvedProblems.includes(problemLink)) {
        solvedProblems.push(problemLink);
      }
    }

    // Mark problem as unsolved
    if (solved === false) {
      solvedProblems = solvedProblems.filter(
        (link) => link !== problemLink
      );
    }

    user.progress.set(
      days,
      solvedProblems
    );

    /*
      Find which days are completely solved.

      A day is completed ONLY when
      every problem of that day is solved.
    */

    const completedDays = [];

    for (const day of challenge) {
      const isDayCompleted =
        day.problems.every((problem) =>
          solvedProblems.includes(problem.link)
        );

      if (isDayCompleted) {
        completedDays.push(day.day);
      }
    }

    user.completedDays.set(
      days,
      completedDays
    );

    /*
      Calculate CURRENT consecutive streak.

      Example:

      Day 1 ✅
      Day 2 ✅
      Day 3 ✅
      Day 4 ❌

      streak = 3

      If:

      Day 1 ❌
      Day 2 ✅
      Day 3 ✅

      streak = 2
    */

    let currentStreak = 0;

    for (let day = 1; day <= challenge.length; day++) {
      if (completedDays.includes(day)) {
        currentStreak++;
      } else {
        break;
      }
    }

    user.streak = currentStreak;

    await user.save();

    res.status(200).json({
      message: "Progress updated successfully",
      days: Number(days),
      solvedProblems,
      completedDays,
      streak: user.streak,
    });
  } catch (error) {
    console.error(
      "Update progress error:",
      error
    );

    res.status(500).json({
      message: "Failed to update progress",
    });
  }
};

module.exports = {
  getProgress,
  updateProgress,
};
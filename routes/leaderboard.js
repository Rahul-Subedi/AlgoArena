const express = require("express");
const router = express.Router();
const Submission = require("../models/submission");
const User = require("../models/user");

// GET basic user profile info (used for API maybe)
router.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const acceptedCount = await Submission.countDocuments({ user: user._id, verdict: "Accepted" });

    res.json({
      username: user.username,
      fullName: user.fullName,
      solvedCount: acceptedCount,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

// GET user profile page from leaderboard
router.get("/user/:id/view", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const solvedCount = await Submission.countDocuments({
      user: user._id,
      verdict: "Accepted",
    });

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.render("userProfile", {
      username: user.username,
      fullName: user.fullName,
      email: user.email,
      solvedCount: solvedCount,
    });
  } catch (err) {
    console.error("⚠️ Failed to load profile:", err);
    res.status(500).send("Failed to load profile");
  }
});

// GET leaderboard
router.get("/", async (req, res) => {
  try {
    const users = await User.find({});

    const leaderboardData = await Promise.all(
      users.map(async (user) => {
        const solvedProblems = await Submission.find({
          user: user._id,
          verdict: "Accepted",
        }).distinct("problem");

        return {
          _id: user._id,
          username: user.username,
          fullName: user.fullName,
          solvedCount: solvedProblems.length,
        };
      })
    );

    leaderboardData.sort((a, b) => b.solvedCount - a.solvedCount);

    res.render("leaderboard", { leaderboardData });
  } catch (err) {
    console.error("❌ Leaderboard Error:", err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

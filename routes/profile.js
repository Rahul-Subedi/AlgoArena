const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware/middleware");
const User = require("../models/user");
const Submission = require("../models/submission");

router.get("/", isLoggedIn, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    if (!user) return res.redirect("/login");

    // ✅ Count accepted problems using Submission model
    const solvedProblemIds = await Submission.find({
      user: user._id,
      verdict: "Accepted"
    }).distinct("problem");

    const solvedCount = solvedProblemIds.length;

    res.render("profile", {
      user,
      solvedCount,
    });
  } catch (err) {
    console.error("❌ Error fetching profile:", err);
    res.status(500).send("❌ Error fetching profile");
  }
});

module.exports = router;

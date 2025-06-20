const express = require("express");
const router = express.Router();
const Problem = require("../models/problem");
const Submission = require("../models/submission"); // ✅ ADD THIS LINE
const { isLoggedIn } = require("../middleware/middleware");





// 🚀 Show form to add new problem (place this BEFORE the :id route)
router.get("/problems/new", isLoggedIn, (req, res) => {
  res.render("problems/new");
});

// 📝 Handle new problem creation
router.post("/problems", isLoggedIn, async (req, res) => {
  try {
    const { title, description, inputFormat, outputFormat, difficulty } = req.body;
    const newProblem = new Problem({
      title,
      description,
      inputFormat,
      outputFormat,
      difficulty,
    });
    await newProblem.save();
    res.redirect("/problems");
  } catch (err) {
    console.error(err);
    res.send("❌ Error creating problem");
  }
});

// 📚 Show all problems
router.get("/problems", isLoggedIn, async (req, res) => {
  try {
    const problems = await Problem.find({});
    const count = await Problem.countDocuments({});

    // ✅ Count problems the user solved successfully
    const userId = req.user._id;

    // Get unique problem IDs that this user has solved with verdict "Accepted"
    const solvedSubmissions = await Submission.find({ 
      user: userId, 
      verdict: "Accepted" 
    }).distinct("problem");

    const solvedCount = solvedSubmissions.length;

    res.render("problems/index", { problems, count, solvedCount });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// 🔍 Show single problem (keep this last to avoid conflict with 'new')
router.get("/problems/:id", isLoggedIn, async (req, res) => {
  try {
    const { id } = req.params;
    const problem = await Problem.findById(id);
    if (!problem) {
      return res.status(404).send("❌ Problem not found");
    }
    res.render("problems/show", { problem });
  } catch (err) {
    console.error(err);
    res.redirect("/problems");
  }
});



module.exports = router;

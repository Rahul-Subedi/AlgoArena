const express = require("express");
const router = express.Router();
const Problem = require("../models/problem");
const Submission = require("../models/submission");
const { isLoggedIn } = require("../middleware/middleware");
const runCode = require("../utils/coderunner");
const runCpp = require("../utils/runCpp");

// Normalize helper
const normalize = (str) => str.replace(/\r/g, "").trim();

// 📤 Handle code submission
router.post("/submit", isLoggedIn, async (req, res) => {
  const { problemId, code } = req.body;

  try {
    const problem = await Problem.findById(problemId);
    if (!problem) return res.status(404).send("Problem not found");

    let verdict = "Accepted";
    let finalOutput = "";

    for (let i = 0; i < problem.testCases.length; i++) {
      const input = problem.testCases[i].input;
      const expectedOutput = normalize(problem.testCases[i].output);

      const result = await runCpp(code, input);

      if (result.error) {
        verdict = "Runtime Error";
        finalOutput = result.error;
        break;
      }

      const actualLines = result.output.split("\n").map(line => line.trim());
const expectedLines = problem.testCases[i].output.split("\n").map(line => line.trim());

const isMatch = actualLines.length === expectedLines.length &&
                actualLines.every((line, idx) => line === expectedLines[idx]);

if (!isMatch) {
  verdict = "Wrong Answer";
  finalOutput = `❌ Failed Test Case #${i + 1}
📥 Input:\n${input}
📤 Expected:\n${expectedLines.join("\n")}
🧾 Got:\n${actualLines.join("\n")}`;
  break;
}

    }

    const submission = new Submission({
      user: req.user._id,
      problem: problemId,
      code: verdict === "Accepted" ? code : null,
      verdict,
      language: "cpp",
      output: finalOutput || "✅ All test cases passed!",
      submittedAt: new Date(),
      executionTime: Math.floor(Math.random() * 500) + 100,
      memoryUsed: Math.floor(Math.random() * 15000) + 1000,
    });

    await submission.save();
    res.redirect("/submissions");

  } catch (err) {
    console.error("Submission error:", err);
    res.status(500).send("Something went wrong.");
  }
});

// 📜 GET: Submission history page
router.get("/", isLoggedIn, async (req, res) => {
  try {
    const submissions = await Submission.find({ user: req.user._id })
      .populate("problem")
      .sort({ submittedAt: -1 });

    res.render("submissions/index", { submissions });
  } catch (err) {
    console.error("❌ Error loading submissions:", err.message);
    res.status(500).send("Something went wrong while fetching submissions!");
  }
});

// 🔄 API: Fetch latest submissions (JSON)
router.get("/api/latest", isLoggedIn, async (req, res) => {
  try {
    const submissions = await Submission.find({ user: req.user._id })
      .populate("problem")
      .sort({ submittedAt: -1 });

    res.json({ submissions });
  } catch (err) {
    console.error("❌ API Fetch Error:", err.message);
    res.status(500).json({ error: "Failed to fetch submissions" });
  }
});

// ⚙️ POST: Mock run using sample input/output
router.post("/mock-run", isLoggedIn, async (req, res) => {
  const { code, problemId } = req.body;

  try {
    const problem = await Problem.findById(problemId);
    if (!problem) return res.status(404).json({ error: "Problem not found" });

    const result = await runCode(code, problem.sampleInput);

    if (result.error) {
      return res.json({
        input: problem.sampleInput,
        expectedOutput: problem.sampleOutput,
        actualOutput: result.error.trim(),
        verdict: "Runtime Error ❌",
      });
    }

    const expected = problem.sampleOutput.trim();
    const actual = result.output.trim();
    const verdict = expected === actual ? "Passed ✅" : "Wrong Answer ❌";

    res.json({
      input: problem.sampleInput,
      expectedOutput: expected,
      actualOutput: actual,
      verdict,
    });
  } catch (err) {
    console.error("❌ Mock run error:", err.message);
    res.status(500).json({ error: "Mock run failed" });
  }
});

module.exports = router;

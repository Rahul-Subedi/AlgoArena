// routes/run.js
const express = require("express");
const router = express.Router();
const runCode = require("../utils/coderunner");

router.post("/", async (req, res) => {
  const { code, input } = req.body;

  try {
    const result = await runCode(code, input);
    res.json({ output: result });
  } catch (err) {
    res.status(500).json({ error: "Error running code." });
  }
});

module.exports = router;

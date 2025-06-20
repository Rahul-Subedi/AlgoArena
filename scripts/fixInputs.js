// scripts/fixInputs.js
const mongoose = require("mongoose");
require("dotenv").config();
const Problem = require("../models/problem");

function clean(input) {
  if (!input || typeof input !== "string") return input;
  return input.replace(/^\s*\w+\s*=\s*/, "").trim();
}

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ Connected to MongoDB");

    const problems = await Problem.find({});
    for (let problem of problems) {
      let updated = false;

      // Clean sampleInput
      if (problem.sampleInput) {
        const cleanedSample = clean(problem.sampleInput);
        if (cleanedSample !== problem.sampleInput) {
          problem.sampleInput = cleanedSample;
          updated = true;
        }
      }

      // Clean inputFormat
      if (problem.inputFormat) {
        const cleanedInputFormat = clean(problem.inputFormat);
        if (cleanedInputFormat !== problem.inputFormat) {
          problem.inputFormat = cleanedInputFormat;
          updated = true;
        }
      }

      // Clean test case inputs
      problem.testCases.forEach(tc => {
        const cleanedInput = clean(tc.input);
        if (cleanedInput !== tc.input) {
          tc.input = cleanedInput;
          updated = true;
        }
      });

      if (updated) {
        await problem.save();
        console.log(`🧼 Cleaned: ${problem.title}`);
      }
    }

    console.log("🎉 Done cleaning all problems!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
})();

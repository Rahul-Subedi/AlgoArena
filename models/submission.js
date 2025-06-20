const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const submissionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  problem: { type: Schema.Types.ObjectId, ref: "Problem", required: true },
  code: { type: String, default: null },
  language: { type: String, required: true },
  verdict: {
    type: String,
    enum: ["Accepted", "Wrong Answer", "Time Limit Exceeded", "Runtime Error", "Compilation Error"],
    required: true
  },
  output: String,
  submittedAt: { type: Date, default: Date.now },
  executionTime: Number,
  memoryUsed: Number,
});

module.exports = mongoose.model("Submission", submissionSchema);

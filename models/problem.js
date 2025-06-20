const mongoose = require("mongoose");

const testCaseSchema = new mongoose.Schema({
  input: { type: String, required: true },
  output: { type: String, required: true },
  hidden: { type: Boolean, default: false }
});

const problemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Easy' },
  
  inputFormat: String,
  outputFormat: String,
  sampleInput: String,
  sampleOutput: String,

  testCases: [testCaseSchema],

  timeLimit: Number,    // In milliseconds
  memoryLimit: Number   // In MB
});

module.exports = mongoose.model("Problem", problemSchema);

// utils/judge0.js
const axios = require("axios");

const runWithJudge0 = async (sourceCode, input, expectedOutput, languageId = 54) => {
  const url = "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true";

  const headers = {
    "content-type": "application/json",
    "X-RapidAPI-Key": "YOUR_RAPIDAPI_KEY_HERE",
    "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
  };

  try {
    const response = await axios.post(
      url,
      {
        source_code: sourceCode,
        stdin: input,
        expected_output: expectedOutput,
        language_id: languageId,
      },
      { headers }
    );

    return response.data;
  } catch (err) {
    console.error("💥 Judge0 Error:", err.response?.data || err.message);
    return { error: "Execution failed" };
  }
};

module.exports = runWithJudge0;

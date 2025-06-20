// utils/runCpp.js
const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");
const { v4: uuid } = require("uuid");

function runCpp(code, input) {
  return new Promise((resolve, reject) => {
    const id = uuid();
    const filename = `${id}.cpp`;
    const inputFile = `${id}.txt`;
    const execFile = `${id}_exec`;

    const codePath = path.join(__dirname, "temp", filename);
    const inputPath = path.join(__dirname, "temp", inputFile);
    const execPath = path.join(__dirname, "temp", execFile);

    // Write code and input
    fs.writeFileSync(codePath, code);
    fs.writeFileSync(inputPath, input);

    // Compile
    exec(`g++ ${codePath} -o ${execPath}`, (compileErr, stdout, stderr) => {
      if (compileErr) {
        return resolve({ error: stderr });
      }

      // Run with input
      exec(`${execPath} < ${inputPath}`, (runErr, stdout, stderr) => {
        if (runErr) {
          return resolve({ error: stderr });
        }

        // Cleanup
        fs.rmSync(codePath, { force: true });
        fs.rmSync(inputPath, { force: true });
        fs.rmSync(execPath, { force: true });

        resolve({ output: stdout.trim() });
      });
    });
  });
}

module.exports = runCpp;

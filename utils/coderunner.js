const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const runCode = (code, input) => {
  return new Promise((resolve, reject) => {
    const id = uuidv4();
    const dir = path.join(__dirname, "temp");

    if (!fs.existsSync(dir)) fs.mkdirSync(dir);

    const cppFile = `${dir}/${id}.cpp`;
    const execFile = `${dir}/${id}`;

    fs.writeFileSync(cppFile, code);

    const command = `g++ ${cppFile} -o ${execFile} && echo "${input}" | ${execFile}`;

    exec(command, { timeout: 3000 }, (err, stdout, stderr) => {
      // Cleanup
      fs.rmSync(cppFile, { force: true });
      if (fs.existsSync(execFile)) fs.rmSync(execFile, { force: true });

      if (err) {
        return resolve({ error: stderr || err.message });
      }

      return resolve({ output: stdout.trim() });
    });
  });
};

module.exports = runCode;

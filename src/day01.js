const fs = require('fs');
const os = require("os");

function day01() {
  const data = fs.readFileSync("../resources/day01.input.txt", "utf-8").trimEnd();
  const cals = data.split(os.EOL + os.EOL)
    .map(block => block.split(os.EOL)
      .map(row => parseInt(row))
      .reduce((a, b) => a + b), 0)
    .sort()
    .reverse();
  console.log(cals[0]);
  console.log(cals[0] + cals[1] + cals[2]);
}
day01();

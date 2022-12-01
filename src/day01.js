const fs = require('fs');

function day01() {
  const data = fs.readFileSync("../resources/day01.input.txt", "utf-8").trim();
  const cals = data.split("\r\n\r\n")
    .map(block => block.split("\r\n")
      .map(row => parseInt(row))
      .reduce((a, b) => a + b), 0)
    .sort()
    .reverse();
  console.log(cals[0]);
  console.log(cals[0] + cals[1] + cals[2]);
}

day01();

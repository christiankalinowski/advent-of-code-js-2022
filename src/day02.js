const fs = require('fs');
const os = require("os");

const scores = {
  "A X": 1 + 3,
  "A Y": 2 + 6,
  "A Z": 3,
  "B X": 1,
  "B Y": 2 + 3,
  "B Z": 3 + 6,
  "C X": 1 + 6,
  "C Y": 2,
  "C Z": 3 + 3,
}

const scores2 = {
  "A X": 3,
  "A Y": 3 + 1,
  "A Z": 6 + 2,
  "B X": 1,
  "B Y": 3 + 2,
  "B Z": 6 + 3,
  "C X": 2,
  "C Y": 3 + 3,
  "C Z": 6 + 1,
}


function day02() {
  const data = fs.readFileSync("../resources/day02.input.txt", "utf-8").trimEnd();
  const rows = data.split(os.EOL)
  console.log(rows.map(row => scores[row])
    .reduce((a, b) => a + b, 0));
  console.log(rows.map(row => scores2[row])
    .reduce((a, b) => a + b, 0));
}
day02();

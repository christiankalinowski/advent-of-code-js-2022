const fs = require('fs');

function findBlockEnd(data, blockSize) {
  for (let i = 0; i < data.length; i++) {
    if (new Set(data.slice(i, i + blockSize)).size === blockSize) {
      return i + blockSize;
    }
  }
}

function day06() {
  const data = fs.readFileSync("../resources/day06.input.txt", "utf-8").trimEnd();
  console.log(findBlockEnd(data, 4));
  console.log(findBlockEnd(data, 14));
}
day06();

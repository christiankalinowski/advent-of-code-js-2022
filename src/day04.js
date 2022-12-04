const fs = require('fs');

function fullyContains(a, b) {
  return a[0] <= b[0] && a[1] >= b[1];
}

function overlaps(a, b) {
  return !(a[0] > b[1] || a[1] < b[0]);
}

function day04() {
  const data = fs.readFileSync("../resources/day04.input.txt", "utf-8").trim();
  const rows = data.split("\r\n")
    .map(row => row.split(",")
      .map(pair => pair.split("-")
        .map(item => parseInt(item))));


  const fullyContainsResult = rows
    .filter(row => fullyContains(row[0], row[1]) || fullyContains(row[1], row[0]));

  const overlapResult = rows
    .filter(row => overlaps(row[0], row[1]));
  console.log(fullyContainsResult.length);
  console.log(overlapResult.length);
}
day04();

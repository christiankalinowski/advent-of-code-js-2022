const fs = require('fs');
const os = require("os");

function isLowerCase(char) {
  return char.toLowerCase() === char;
}

function getItemValue(item) {
  return 1 + item.charCodeAt(0) - (isLowerCase(item) ?  'a'.charCodeAt(0) : 'A'.charCodeAt(0) - 26);
}

function chunked(chunkSize) {
  return (resultArray, item, index) => {
    const chunkStartIndex = Math.floor(index / chunkSize);
    if (!resultArray[chunkStartIndex]) {
      resultArray[chunkStartIndex] = [];
    }
    resultArray[chunkStartIndex].push(item);
    return resultArray;
  };
}

function findCommonChar(strings) {
  return Array.from(strings[0]).find(a => strings.slice(1).every(b => b.includes(a)));
}

function splitStringInTwo(content) {
  return [content.slice(0, content.length / 2), content.slice(content.length / 2, content.length)];
}

function day03() {
  const data = fs.readFileSync("../resources/day03.input.txt", "utf-8").trim();
  const rows = data.split(os.EOL)

  const itemsResult = rows
    .map(splitStringInTwo)
    .map(findCommonChar)
    .map(getItemValue)
    .reduce((a, b) => a + b, 0);
  console.log(itemsResult);

  const badgeResults = rows
    .reduce(chunked(3), [])
    .map(findCommonChar)
    .map(getItemValue)
    .reduce((a, b) => a + b, 0);
  console.log(badgeResults);
}
day03();

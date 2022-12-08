const fs = require('fs');
const os = require("os");


function markAndEvaluateTree(max, tree) {
  if (max < tree.height) {
    tree.visible = true;
    return tree.height;
  }
  return max;
}

function markTrees(arr) {
  let max = -1;
  for (let i = 0; i < arr.length; i++) {
    max = markAndEvaluateTree(max, arr[i]);
  }
  max = -1;
  for (let i = arr.length - 1; i >= 0; i--) {
    max = markAndEvaluateTree(max, arr[i]);
  }
}

function calculateScenicScore(x, y, row, column) {
  const treeHeight = row[x].height;
  const right = row.slice(x + 1, row.length);
  const left = row.slice(0, x).reverse();
  const bottom = column.slice(y + 1, column.length);
  const top = column.slice(0, y).reverse();
  return [right, left, bottom, top]
    .map(line => {
      const distance = line.findIndex(t => t.height >= treeHeight) + 1;
      return distance !== 0 ? distance : line.length;
    })
    .reduce((a, b) => a * b, 1);
}

function day08() {
  const data = fs.readFileSync("../resources/day08.input.txt", "utf-8").trimEnd();
  const lines = data.split(os.EOL);

  const trees = lines.map(line => line.split("").map(t => ({height: t, visible: false})));

  for (let y = 0; y < trees.length; y++) {
    markTrees(trees[y]);
  }
  for (let x = 0; x < trees[0].length; x++) {
    markTrees(trees.map(row => row[x]));
  }

  const visibleTrees = trees
    .map(row => row.filter(t => t.visible).length)
    .reduce((a, b) => a + b, 0);

  let maxScenicScore = 0;
  for (let y = 0; y < trees.length; y++) {
    for (let x = 0; x < trees[y].length; x++) {
      const score  = calculateScenicScore(x, y, trees[y], trees.map(t => t[x]));
      maxScenicScore = Math.max(score, maxScenicScore);
    }
  }

  console.log(visibleTrees);
  console.log(maxScenicScore);
}

day08();

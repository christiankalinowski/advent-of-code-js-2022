const fs = require('fs');
const os = require("os");


function calculateSize(fileTree, arr) {
  const res = Object.values(fileTree).reduce((sum, file) => {
    if (file.size) {
      return file.size + sum;
    } else {
      return calculateSize(file, arr) + sum;
    }
  }, 0);
  arr.push(res);
  return res;
}

function buildFileTree(lines) {
  const fileTree = {};
  let dirStack = [];

  lines.forEach(line => {
    if (line.startsWith("$ cd ")) {
      const targetDir = line.replace("$ cd ", "");
      if (targetDir === "..") {
        dirStack.pop();
      } else if (targetDir === "/") {
        dirStack = [];
      } else {
        dirStack.push(targetDir);
      }
    }
    const current = dirStack.reduce((cur, dir) => cur[dir], fileTree);
    if (line.startsWith("dir ")) {
      const dir = line.replace("dir ", "");
      current[dir] = {};
    }
    const [_, size, fileName] = line.match(/(\d+) (\w+\.?\w*)/) ?? [undefined, undefined, undefined];
    if (size) {
      current[fileName] = {size: parseInt(size)};
    }
  });
  return fileTree;
}

function day07() {
  const data = fs.readFileSync("../resources/day07.input.txt", "utf-8").trimEnd();
  const lines = data.split(os.EOL);
  const fileTree = buildFileTree(lines);
  const sizes = [];
  const root = calculateSize(fileTree, sizes);
  const partA = sizes.filter(s => s < 100000)
    .reduce((a, b) => a + b, 0);
  const target = root - 70000000 + 30000000;
  const partB = sizes.sort((a, b) => a-b)
    .find(s => s >= target);

  console.log(partA);
  console.log(partB);
}

day07();

const fs = require('fs');
const os = require("os");

const NUMBER_OF_STACKS = 9;

function day05() {
  const data = fs.readFileSync("../resources/day05.input.txt", "utf-8").trimEnd();
  const [startingStacks, instructions] = data.split(os.EOL + os.EOL)
    .map(block => block.split(os.EOL));

  const partOneStacks = readStacks(startingStacks);
  performInstructions(instructions, partOneStacks, moveItems);

  const partTwoStacks = readStacks(startingStacks);
  performInstructions(instructions, partTwoStacks, moveItemsAsStack);

  console.log(getTopOfStacks(partOneStacks));
  console.log(getTopOfStacks(partTwoStacks));
}
day05();

function moveItems(from, to, amount) {
  for (let i = 0; i < amount; i++) {
    const val = from.pop();
    to.push(val);
  }
}

function moveItemsAsStack(from, to, amount) {
  const temp = [];
  moveItems(from, temp, amount);
  moveItems(temp, to, amount);
}

function readStacks(start) {
  const stacks = [];
  const lastRow = start.length - 1;
  for (let i = 1; i <= NUMBER_OF_STACKS; i++) {
    const column = start[lastRow].indexOf(i.toString());
    stacks[i] = [];
    for (let r = lastRow - 1; r >= 0; r--) {
      if (start[r][column] !== " " && start[r][column] !== undefined) {
        stacks[i].push(start[r][column]);
      }
    }
  }
  return stacks;
}

function performInstructions(instructions, stacks, moveFn) {
  instructions.forEach(instruction => {
    [_, amount, from, to] = instruction.match(/move (\d+) from (\d+) to (\d+)/);
    moveFn(stacks[from], stacks[to], amount);
  });
}

function getTopOfStacks(stacks) {
  return stacks.map(s => s[s.length - 1])
    .join("");
}

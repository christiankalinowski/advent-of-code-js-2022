const fs = require('fs');
const os = require("os");


const directions = {
  "R": [1, 0],
  "L": [-1, 0],
  "U": [0, 1],
  "D": [0, -1]
}

function normalize(vector) {
  return [
    Math.min(1, Math.max(-1, vector[0])),
    Math.min(1, Math.max(-1, vector[1]))
  ]
}

function add(a, b) {
  return [a[0] + b[0], a[1] + b[1]]
}

function subtract(a, b) {
  return [a[0] - b[0], a[1] - b[1]]
}

function moveTail(head, tail) {
  const distance = subtract(head, tail);
  if (Math.abs(distance[0]) > 1 || Math.abs(distance[1]) > 1) {
    return add(tail, normalize(distance));
  } else {
    return tail;
  }
}

function simulateRope(rope, instructions) {
  const visited = new Set();
  const tail = rope[rope.length - 1];
  visited.add(`${tail[0]}:${tail[1]}`);
  instructions
    .map(line => line.match(/(\w) (\d+)/))
    .forEach(cmd => {
      const dir = directions[cmd[1]];
      const distance = parseInt(cmd[2]);
      for (let i = 0; i < distance; i++) {
        rope[0] = add(rope[0], dir);
        for (let i = 1; i < rope.length; i++) {
          rope[i] = moveTail(rope[i - 1], rope[i]);
        }
        const newTail = rope[rope.length - 1];
        visited.add(`${newTail[0]}:${newTail[1]}`);
      }
    });
  return visited;
}

function day09() {
  const data = fs.readFileSync("../resources/day09.input.txt", "utf-8").trimEnd();
  const lines = data.split(os.EOL);

  let start = [0, 0];

  const shortRope = Array(2).fill(start);
  const longRope = Array(10).fill(start);

  const partA = simulateRope(shortRope, lines).size;
  const partB = simulateRope(longRope, lines).size;

  console.log(partA);
  console.log(partB);
}
day09();

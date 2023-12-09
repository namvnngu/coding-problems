import { createInterface } from "readline";
import { createReadStream } from "fs";

const graph = {};
let startNodes = [];
let instructions = "";

const lineReader = createInterface({
  input: createReadStream("input.txt"),
  rlfDelay: Infinity,
});

lineReader.on("line", function (line) {
  if (!instructions) {
    instructions = line;
    return;
  }
  if (!line) {
    return;
  }

  const split = line.split(" = ");
  const node = split[0];
  const linkNodes = split[1].split(", ");
  const leftNode = linkNodes[0].substring(1, 4);
  const rightNode = linkNodes[1].substring(0, 3);

  graph[node] = { L: leftNode, R: rightNode };
  if (node[2] === "A") {
    startNodes.push(node);
  }
});

lineReader.on("close", function () {
  const steps = [];
  for (const node of startNodes) {
    let start = node;
    let curr = node;
    let stepCount = 0;

    while (curr[2] !== "Z") {
      const step = instructions[stepCount % instructions.length];
      curr = graph[curr][step];
      stepCount++;
    }

    steps.push(stepCount);
  }

  console.log("Result:", steps.reduce(lcm));
});

function sum(numbers) {
  return numbers.reduce((accumulator, curr) => accumulator + curr, 0);
}

function gcd(a, b) {
  return a ? gcd(b % a, a) : b;
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

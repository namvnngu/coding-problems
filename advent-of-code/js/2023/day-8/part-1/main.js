import { createInterface } from "readline";
import { createReadStream } from "fs";

const graph = {};
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
});

lineReader.on("close", function () {
  let result = 0;

  let curr = "AAA";
  while (curr !== "ZZZ") {
    const step = instructions[result % instructions.length];
    curr = graph[curr][step];
    result++;
  }

  console.log("Result:", result);
});

function sum(numbers) {
  return numbers.reduce((accumulator, curr) => accumulator + curr, 0);
}

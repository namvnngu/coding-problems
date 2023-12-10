import { createInterface } from "readline";
import { createReadStream } from "fs";

let result = Infinity;

let seeds;

let graph;
let currentNode;

const lineReader = createInterface({
  input: createReadStream("input.txt"),
  rlfDelay: Infinity,
});

lineReader.on("line", function (line) {
  if (line.startsWith("seeds: ")) {
    const [, ...rest] = line.split(/\s+/);
    seeds = rest;
    return;
  }

  if (!line) {
    if (!graph) {
      graph = { maps: undefined, next: undefined };
      currentNode = graph;
    } else {
      currentNode.next = { maps: undefined, next: undefined };
      currentNode = currentNode.next;
    }
    return;
  }

  if (isRangeLine(line)) {
    currentNode.maps ??= [];
    currentNode.maps.push(parseToMapRange(line));
  }
});

lineReader.on("close", function () {
  for (const seed of seeds) {
    result = Math.min(result, getLocation(seed, graph));
  }
  console.log("Result:", result);
});

function getLocation(value, node) {
  if (!node) {
    return value;
  }

  let nextValue;

  for (const map of node.maps) {
    const lowerBound = map.rangeSource;
    const upperBound = map.rangeSource + map.rangeLength - 1;
    if (value < lowerBound || value > upperBound) continue;

    nextValue = value - map.rangeSource + map.rangeDestination;
    break;
  }

  return getLocation(nextValue ?? value, node.next);
}

function parseToMapRange(line) {
  const splitLine = line.trim().split(/\s+/);
  const rangeSource = Number(splitLine[1]);
  const rangeDestination = Number(splitLine[0]);
  const rangeLength = Number(splitLine[2]);

  return { rangeSource, rangeDestination, rangeLength };
}

function isRangeLine(line) {
  return /^[\d+\s]+$/.test(line);
}

function sum(numbers) {
  return numbers.reduce((accumulator, curr) => accumulator + curr, 0);
}

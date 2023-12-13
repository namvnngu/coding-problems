import { readFileSync } from "fs";

// #region MY UTILS
function sum(numbers) {
  return numbers.reduce((accumulator, curr) => accumulator + curr, 0);
}

function gcd(a, b) {
  return a ? gcd(b % a, a) : b;
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

const COLORS = {
  RED: "\x1b[31m",
  GREEN: "\x1b[32m",
  YELLOW: "\x1b[33m",
  BLUE: "\x1b[34m",
  MAGENTA: "\x1b[35m",
  CYAN: "\x1b[36m",
  WHITE: "\x1b[37m",
  GRAY: "\x1b[90m",
  BLACK: "\x1b[30m",
  RESET: "\x1b[0m",
};
function colorize(color, message) {
  const template = `${COLORS[color]}%s${COLORS.RESET}`;
  return { template, message };
}
function print(color, message) {
  const colorized = colorize(color, message);
  console.log(colorized.template, colorized.message);
}
// #endregion MY UTILS

const data = readFileSync("input.txt", "utf8").split("\n");
data.pop();

const galaxyLocations = (() => {
  const locations = [];
  const graph = createGraph(data);

  for (let r = 0; r < graph.length; r++) {
    for (let c = 0; c < graph[0].length; c++) {
      let node = graph[r][c];
      if (node.value === "#") {
        locations.push({ row: r, col: c });
      }
    }
  }
  return locations;
})();

const destinations = [];

for (let g = 0; g < galaxyLocations.length - 1; g++) {
  const destLocations = galaxyLocations.slice(g + 1);
  const startLocation = galaxyLocations[g];
  const destNodes = [];

  const graph = createGraph(data);
  const startNode = graph[startLocation.row][startLocation.col];
  const queue = [startNode];
  startNode.visited = true;

  while (queue.length !== 0) {
    const parent = queue.shift();
    for (const child of getChildren(parent, graph)) {
      if (child.visited) continue;

      const found = destLocations.find(
        (l) => l.col === child.col && l.row === child.row,
      );
      if (found) {
        destNodes.push(child);
      }

      child.visited = true;
      child.parent = parent;
      child.distance = parent.distance + 1;
      queue.push(child);
    }
  }

  destinations.push(destNodes);
}
let result = 0;

for (const destination of destinations) {
  for (const node of destination) {
    result += node.distance;
  }
}

console.log("Result:", result);

function createNode(value, row, col) {
  return {
    value,
    col,
    row,
    distance: 0,
    visited: false,
    parent: undefined,
  };
}

function createGraph(data) {
  const tempGraph1 = [];
  for (let i = 0; i < data.length; i++) {
    const r = data[i];
    if (r.includes("#")) {
      tempGraph1.push(r);
    } else {
      tempGraph1.push(r);
      tempGraph1.push(r);
    }
  }

  const tempGraph2 = [];
  for (let c = 0; c < tempGraph1[0].length; c++) {
    let isEmpty = true;

    for (let r = 0; r < tempGraph1.length; r++) {
      let value = tempGraph1[r][c];

      tempGraph2[r] ??= "";
      tempGraph2[r] += value;

      if (value === "#") {
        isEmpty = false;
      }
    }

    if (isEmpty) {
      for (let r = 0; r < tempGraph1.length; r++) {
        tempGraph2[r] += ".";
      }
    }
  }

  const graph = [];
  for (let r = 0; r < tempGraph2.length; r++) {
    const row = [];
    for (let c = 0; c < tempGraph2[0].length; c++) {
      row.push(createNode(tempGraph2[r][c], r, c));
    }
    graph.push(row);
  }

  return graph;
}

function getChildren(parent, graph) {
  const children = [];

  const top = graph[parent.row - 1]?.[parent.col];
  top && children.push(top);

  const down = graph[parent.row + 1]?.[parent.col];
  down && children.push(down);

  const left = graph[parent.row]?.[parent.col - 1];
  left && children.push(left);

  const right = graph[parent.row]?.[parent.col + 1];
  right && children.push(right);

  return children;
}

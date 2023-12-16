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

const EXTRA_STEP = 1000000;
const GALAXY = "#";

const galaxyLocations = (() => {
  const locations = [];
  for (let r = 0; r < data.length; r++) {
    for (let c = 0; c < data[0].length; c++) {
      if (data[r][c] === GALAXY) {
        locations.push({ row: r, col: c });
      }
    }
  }
  return locations;
})();

const emptySpaces = (() => {
  const emptySpaces = { rows: {}, cols: {} };

  for (let r = 0; r < data.length; r++) {
    if (!data[r].includes(GALAXY)) {
      emptySpaces.rows[r] = r;
    }
  }

  for (let c = 0; c < data[0].length; c++) {
    let isColEmpty = true;

    for (let r = 0; r < data.length; r++) {
      if (data[r][c] === GALAXY) {
        isColEmpty = false;
      }
    }

    if (isColEmpty) {
      emptySpaces.cols[c] = c;
    }
  }

  return emptySpaces;
})();

let sumShortestDist = 0;

for (let g = 0; g < galaxyLocations.length; g++) {
  const startSpaceLocation = galaxyLocations[g];
  const universe = createUniverse(data);
  const queue = [startSpaceLocation];
  universe[startSpaceLocation.row][startSpaceLocation.col] = 0;

  while (queue.length !== 0) {
    const current = queue.shift();
    for (const next of getNextLocations(current)) {
      if (
        !universe[next.row]?.[next.col] ||
        typeof universe[next.row][next.col] === "number"
      )
        continue;

      const nextStepCount = (() => {
        if (
          typeof emptySpaces.rows[current.row] === "number" ||
          typeof emptySpaces.cols[current.col] === "number"
        ) {
          return universe[current.row][current.col] + EXTRA_STEP;
        }
        if (
          (typeof emptySpaces.rows[current.row] === "number" &&
            typeof emptySpaces.cols[current.col]) === "number"
        ) {
          return universe[current.row][current.col] + EXTRA_STEP * 2;
        }
        return universe[current.row][current.col] + 1;
      })();

      if (universe[next.row][next.col] === GALAXY) {
        sumShortestDist += nextStepCount;
      }

      universe[next.row][next.col] = nextStepCount;
      queue.push(next);
    }
  }
}

console.log("Result:", sumShortestDist / 2);

function getNextLocations({ row, col }) {
  return [
    { row: row - 1, col },
    { row: row + 1, col },
    { row, col: col - 1 },
    { row, col: col + 1 },
  ];
}

function createUniverse(data) {
  return data.map((x) => x.split(""));
}

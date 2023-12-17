import { readFileSync } from "fs";

// #region MY UTILS
function sum(numbers) {
  return numbers.reduce((accumulator, curr) => accumulator + curr, 0);
}

function asciiDec(char) {
  return char.charCodeAt(0);
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

const platform = readFileSync("input.txt", "utf8")
  .split("\n")
  .map((x) => x.split(""));
platform.pop();

const ROUNDED_ROCK = "O";
const CUBE_SHAPED_ROCK = "#";
const CYCLES_COUNT = 1000000000;
const platformLoop = {};

for (let cycle = 0; cycle < CYCLES_COUNT; cycle++) {
  const currentStateKey = generateKey(platform);

  // NORTH
  for (let c = 0; c < platform[0].length; c++) {
    let lastRow = 0;
    for (let r = 0; r < platform.length; r++) {
      const rock = platform[r][c];

      if (rock === CUBE_SHAPED_ROCK) {
        lastRow = r + 1;
      } else if (rock === ROUNDED_ROCK) {
        const temp = platform[lastRow][c];
        platform[lastRow][c] = platform[r][c];
        platform[r][c] = temp;
        lastRow += 1;
      }
    }
  }

  // WEST
  for (let r = 0; r < platform.length; r++) {
    let lastCol = 0;
    for (let c = 0; c < platform[0].length; c++) {
      const rock = platform[r][c];

      if (rock === CUBE_SHAPED_ROCK) {
        lastCol = c + 1;
      } else if (rock === ROUNDED_ROCK) {
        const temp = platform[r][lastCol];
        platform[r][lastCol] = platform[r][c];
        platform[r][c] = temp;
        lastCol += 1;
      }
    }
  }

  // SOUTH
  for (let c = 0; c < platform[0].length; c++) {
    let lastRow = platform.length - 1;
    for (let r = platform.length - 1; r >= 0; r--) {
      const rock = platform[r][c];

      if (rock === CUBE_SHAPED_ROCK) {
        lastRow = r - 1;
      } else if (rock === ROUNDED_ROCK) {
        const temp = platform[lastRow][c];
        platform[lastRow][c] = platform[r][c];
        platform[r][c] = temp;
        lastRow -= 1;
      }
    }
  }

  // EAST
  for (let r = 0; r < platform.length; r++) {
    let lastCol = platform[0].length - 1;
    for (let c = platform[0].length - 1; c >= 0; c--) {
      const rock = platform[r][c];

      if (rock === CUBE_SHAPED_ROCK) {
        lastCol = c - 1;
      } else if (rock === ROUNDED_ROCK) {
        const temp = platform[r][lastCol];
        platform[r][lastCol] = platform[r][c];
        platform[r][c] = temp;
        lastCol -= 1;
      }
    }
  }

  const newStateKey = generateKey(platform);
  if (platformLoop[currentStateKey] !== newStateKey) {
    platformLoop[currentStateKey] = newStateKey;
  } else {
    let loopSize = 1;
    let currentState = newStateKey;
    while (currentState !== currentStateKey) {
      currentState = platformLoop[currentState];
      loopSize++;
    }
    if ((CYCLES_COUNT - (cycle + 1)) % loopSize === 0) {
      break;
    }
  }
}
let result = 0;
for (let r = 0; r < platform.length; r++) {
  let roundedRockCount = 0;
  for (let c = 0; c < platform[0].length; c++) {
    const rock = platform[r][c];
    if (rock === ROUNDED_ROCK) {
      roundedRockCount++;
    }
  }
  result += roundedRockCount * (platform.length - r);
}
console.log("Result:", result);

function generateKey(platform) {
  return platform.map((x) => x.join("")).join("");
}

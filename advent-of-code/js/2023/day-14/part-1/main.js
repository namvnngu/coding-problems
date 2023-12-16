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

const rocks = readFileSync("input.txt", "utf8")
  .split("\n")
  .map((x) => x.split(""));

const ROUNDED_ROCK = "O";
const CUBE_SHAPED_ROCK = "#";
const EMPTY_SPACE = ".";

const tilted = (() => {
  for (let c = 0; c < rocks[0].length; c++) {
    let lastRow = 0;
    for (let r = 0; r < rocks.length; r++) {
      const rock = rocks[r][c];

      if (rock === CUBE_SHAPED_ROCK) {
        lastRow = r + 1;
      } else if (rock === ROUNDED_ROCK) {
        const temp = rocks[lastRow][c];
        rocks[lastRow][c] = rocks[r][c];
        rocks[r][c] = temp;
        lastRow += 1;
      }
    }
  }
})();

let result = 0;
for (let r = 0; r < rocks.length; r++) {
  let roundedRockCount = 0;
  for (let c = 0; c < rocks[0].length; c++) {
    const rock = rocks[r][c];
    if (rock === ROUNDED_ROCK) {
      roundedRockCount++;
    }
  }
  result += roundedRockCount * (rocks.length - r - 1);
}

console.log("Result:", result);

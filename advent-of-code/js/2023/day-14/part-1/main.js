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
const EMPTY_SPACE = ".";

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

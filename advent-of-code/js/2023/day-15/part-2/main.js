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

const steps = readFileSync("input.txt", "utf8").split(/[,\n]/);
steps.pop();

let result = 0;
const boxes = new Array(256);
for (const step of steps) {
  let [label, focal] = step.split(/[-=]/);
  const boxIndex = hash(label);
  boxes[boxIndex] ??= [];
  const lensIndex = boxes[boxIndex].findIndex((lens) => lens[0] === label);

  if (!focal && lensIndex >= 0) {
    boxes[boxIndex].splice(lensIndex, 1);
  } else if (focal) {
    if (lensIndex < 0) {
      boxes[boxIndex].push([label, Number(focal)]);
    } else {
      boxes[boxIndex][lensIndex] = [label, Number(focal)];
    }
  }
}

for (let b = 0; b < boxes.length; b++) {
  const box = boxes[b];
  if (!box) continue;
  for (let l = 0; l < box.length; l++) {
    const lens = box[l];
    result += (b + 1) * (l + 1) * lens[1];
  }
}
console.log("Result:", result);

function hash(step) {
  let result = 0;
  for (let i = 0; i < step.length; i++) {
    result += asciiDec(step[i]);
    result *= 17;
    result %= 256;
  }
  return result;
}

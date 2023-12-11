import { readFileSync } from "fs";

const data = readFileSync("test.txt", "utf8");
console.log(data);
console.log("Result:");

function sum(numbers) {
  return numbers.reduce((accumulator, curr) => accumulator + curr, 0);
}

function gcd(a, b) {
  return a ? gcd(b % a, a) : b;
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

var COLORS = {
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

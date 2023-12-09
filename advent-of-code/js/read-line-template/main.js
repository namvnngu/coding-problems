import { createInterface } from "readline";
import { createReadStream } from "fs";

const lineReader = createInterface({
  input: createReadStream("test.txt"),
  rlfDelay: Infinity,
});

let lineNumber = 0;

lineReader.on("line", function (line) {
  lineNumber++;
  console.log(`${lineNumber}. ${line}`);
});

lineReader.on("close", function () {
  console.log("Result:");
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

import { createInterface } from "readline";
import { createReadStream } from "fs";

let result = 0;

const lineReader = createInterface({
  input: createReadStream("input.txt"),
  rlfDelay: Infinity,
});

lineReader.on("line", function (line) {
  const values = line.trim().split(/\s+/).map(Number);

  const dataset = [values];

  while (!dataset[dataset.length - 1].every((x) => x === 0)) {
    const newValues = [];
    for (let i = 1; i < dataset[dataset.length - 1].length; i++) {
      newValues.push(
        dataset[dataset.length - 1][i] - dataset[dataset.length - 1][i - 1],
      );
    }
    dataset.push(newValues);
  }

  let num = 0;
  for (let i = dataset.length - 2; i >= 0; i--) {
    num = dataset[i][0] - num;
  }

  result += num;
});

lineReader.on("close", function () {
  console.log("Result:", result);
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

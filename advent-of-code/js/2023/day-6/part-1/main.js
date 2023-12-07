import { createInterface } from "readline";
import { createReadStream } from "fs";

let records = undefined;

const lineReader = createInterface({
  input: createReadStream("input.txt"),
  rlfDelay: Infinity,
});

lineReader.on("line", function (line) {
  const split = line.split(/\s+/);

  if (!records) {
    records = [];
    for (let i = 1; i < split.length; i++) {
      records.push([Number(split[i])]);
    }
    return;
  }

  for (let i = 1; i < split.length; i++) {
    records[i - 1].push(Number(split[i]));
  }
});

lineReader.on("close", function () {
  let result = 1;
  for (const [time, dist] of records) {
    const upperBound =
      Math.ceil(
        Math.min(dist, time / 2 + Math.sqrt(Math.pow(time / 2, 2) - dist)),
      ) - 1;
    const lowerBound =
      Math.floor(time / 2 - Math.sqrt(Math.pow(time / 2, 2) - dist)) + 1;
    result *= upperBound - lowerBound + 1;
  }
  console.log("Result:", result);
});

function sum(numbers) {
  return numbers.reduce((accumulator, curr) => accumulator + curr, 0);
}

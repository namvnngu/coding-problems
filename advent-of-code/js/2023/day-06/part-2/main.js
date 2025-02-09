import { createInterface } from "readline";
import { createReadStream } from "fs";

let record = undefined;

const lineReader = createInterface({
  input: createReadStream("input.txt"),
  rlfDelay: Infinity,
});

lineReader.on("line", function (line) {
  const split = line.split(/\s+/);

  if (!record) {
    record = [];
    let time = "";
    for (let i = 1; i < split.length; i++) {
      time += split[i];
    }
    record.push(Number(time));
    return;
  }

  let dist = "";
  for (let i = 1; i < split.length; i++) {
    dist += split[i];
  }
  record.push(Number(dist));
});

lineReader.on("close", function () {
  const [time, dist] = record;
  const upperBound =
    Math.ceil(
      Math.min(dist, time / 2 + Math.sqrt(Math.pow(time / 2, 2) - dist)),
    ) - 1;
  const lowerBound =
    Math.floor(time / 2 - Math.sqrt(Math.pow(time / 2, 2) - dist)) + 1;
  const result = upperBound - lowerBound + 1;
  console.log("Result:", result);
});

function sum(numbers) {
  return numbers.reduce((accumulator, curr) => accumulator + curr, 0);
}

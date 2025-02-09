import { createInterface } from "readline";
import { createReadStream } from "fs";

const lineReader = createInterface({
  input: createReadStream("input.txt"),
  rlfDelay: Infinity,
});

let result = 0;

lineReader.on("line", function (line) {
  const card = line.split(":")[1].trim().split("|");
  const winningNumbers = card[0].trim().split(/\s+/);
  const myNumbers = card[1].trim().split(/\s+/);

  let count = 0;

  for (const myNumber of myNumbers) {
    if (winningNumbers.includes(myNumber)) {
      count++;
    }
  }

  if (count > 0) {
    result += Math.pow(2, count - 1);
  }
});

lineReader.on("close", function () {
  console.log("Result:", result);
});

function sum(numbers) {
  return numbers.reduce((accumulator, curr) => accumulator + curr, 0);
}

import { createInterface } from "readline";
import { createReadStream } from "fs";

const lineReader = createInterface({
  input: createReadStream("input.txt"),
  rlfDelay: Infinity,
});

const numbers = [];

lineReader.on("line", function (line) {
  let firstDigit;
  let lastDigit;
  for (let i = 0; i < line.length; i++) {
    if (!firstDigit) {
      const num = Number(line[i]);
      if (!Number.isNaN(num)) {
        firstDigit = num;
      }
    }

    if (!lastDigit) {
      const num = Number(line[line.length - 1 - i]);
      if (!Number.isNaN(num)) {
        lastDigit = num;
      }
    }

    if (typeof firstDigit === "number" && typeof lastDigit === "number") {
      numbers.push(Number(`${firstDigit}${lastDigit}`));
      break;
    }
  }
});

lineReader.on("close", function () {
  console.log(
    "Result:",
    numbers.reduce((accumulator, curr) => accumulator + curr, 0),
  );
});

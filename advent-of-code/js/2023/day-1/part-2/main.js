import { createInterface } from "readline";
import { createReadStream } from "fs";

const lineReader = createInterface({
  input: createReadStream("input.txt"),
  rlfDelay: Infinity,
});

const numbers = [];
const stringDigits = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};
const reversedStringDigits = Object.fromEntries(
  Object.entries(stringDigits).map(([k, v]) => [
    k.split("").reverse().join(""),
    v,
  ]),
);
const stringDigitsRegex = new RegExp(Object.keys(stringDigits).join("|"));
const reversedStringDigitsRegex = new RegExp(
  Object.keys(reversedStringDigits).join("|"),
);

lineReader.on("line", function (line) {
  const modifiedLine = line.replace(stringDigitsRegex, function (match) {
    return stringDigits[match];
  });
  const reversedModifiedLine = line
    .split("")
    .reverse()
    .join("")
    .replace(reversedStringDigitsRegex, function (match) {
      return reversedStringDigits[match];
    });

  let firstDigit;
  let lastDigit;

  for (let i = 0; i < modifiedLine.length; i++) {
    if (!firstDigit) {
      const num = Number(modifiedLine[i]);
      if (!Number.isNaN(num)) {
        firstDigit = num;
      }
    }

    if (!lastDigit) {
      const num = Number(reversedModifiedLine[i]);
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
  console.log(numbers.reduce((accumulator, curr) => accumulator + curr, 0));
});

import { createInterface } from "readline";
import { createReadStream } from "fs";

const numbers = [];

const strDigits = {
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
const strDigitsRegex = new RegExp(Object.keys(strDigits).join("|"));

const revStrDigits = {
  eno: 1,
  owt: 2,
  eerht: 3,
  ruof: 4,
  evif: 5,
  xis: 6,
  neves: 7,
  thgie: 8,
  enin: 9,
};
const revStrDigitsRegex = new RegExp(Object.keys(revStrDigits).join("|"));

const lineReader = createInterface({
  input: createReadStream("input.txt"),
  rlfDelay: Infinity,
});

lineReader.on("line", function (line) {
  const modifiedLine = line.replace(
    strDigitsRegex,
    (match) => strDigits[match],
  );
  const revModifiedLine = reverseString(line).replace(
    revStrDigitsRegex,
    (match) => revStrDigits[match],
  );

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
      const num = Number(revModifiedLine[i]);
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

function reverseString(str) {
  let r = "";
  for (let i = str.length - 1; i >= 0; i--) {
    r += str[i];
  }
  return r;
}

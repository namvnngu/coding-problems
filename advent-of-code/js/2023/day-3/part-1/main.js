import { createInterface } from "readline";
import { createReadStream } from "fs";

const numbers = [];

const engineSchematic = [];

const lineReader = createInterface({
  input: createReadStream("input.txt"),
  rlfDelay: Infinity,
});

lineReader.on("line", function (line) {
  engineSchematic.push(line);
});

lineReader.on("close", function () {
  for (let lineNumber = 0; lineNumber < engineSchematic.length; lineNumber++) {
    const line = engineSchematic[lineNumber];
    for (const match of line.matchAll(/\d+/g)) {
      if (isEngineNumber(match[0], match.index, lineNumber, engineSchematic)) {
        numbers.push(Number(match[0]));
      }
    }
  }
  console.log("Result:", sum(numbers));
});

const mayBeSymbolRegex = /[^a-zA-z0-9\.]/;
function isEngineNumber(number, startingIndex, lineNumber, engineSchematic) {
  const lineLength = engineSchematic[lineNumber].length;

  for (let c = startingIndex - 1; c <= startingIndex + number.length; c++) {
    if (c < 0 || c >= lineLength) continue;

    for (let r = lineNumber - 1; r <= lineNumber + 1; r++) {
      if (r < 0 || r >= engineSchematic.length) continue;

      const v = engineSchematic[r]?.[c];
      if (typeof v === "undefined") continue;

      if (mayBeSymbolRegex.test(v)) return true;
    }
  }

  return false;
}

function sum(numbers) {
  return numbers.reduce((accumulator, curr) => accumulator + curr, 0);
}

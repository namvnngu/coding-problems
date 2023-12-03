import { createInterface } from "readline";
import { createReadStream } from "fs";

const engineSchematic = [];

const GEAR = "*";

const lineReader = createInterface({
  input: createReadStream("input.txt"),
  rlfDelay: Infinity,
});

lineReader.on("line", function (line) {
  engineSchematic.push(line);
});

lineReader.on("close", function () {
  const gears = {};
  for (let lineNumber = 0; lineNumber < engineSchematic.length; lineNumber++) {
    const line = engineSchematic[lineNumber];
    for (const match of line.matchAll(/\d+/g)) {
      const result = isGearNumber(
        match[0],
        match.index,
        lineNumber,
        engineSchematic,
      );
      if (result.found) {
        gears[result.line] ??= {};
        gears[result.line][result.index] ??= [];
        gears[result.line][result.index].push(Number(match[0]));
      }
    }
  }

  let result = 0;
  for (const line of Object.values(gears)) {
    for (const gear of Object.values(line)) {
      if (gear.length !== 2) continue;
      result += gear[0] * gear[1];
    }
  }
  console.log("Result:", result);
});

function isGearNumber(number, startingIndex, lineNumber, engineSchematic) {
  const lineLength = engineSchematic[lineNumber].length;

  for (let c = startingIndex - 1; c <= startingIndex + number.length; c++) {
    if (c < 0 || c >= lineLength) continue;

    for (let r = lineNumber - 1; r <= lineNumber + 1; r++) {
      if (r < 0 || r >= engineSchematic.length) continue;

      const v = engineSchematic[r]?.[c];
      if (typeof v === "undefined") continue;

      if (v === GEAR) return { found: true, line: r, index: c };
    }
  }

  return { found: false };
}

function sum(numbers) {
  return numbers.reduce((accumulator, curr) => accumulator + curr, 0);
}

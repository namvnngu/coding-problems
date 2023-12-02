import { createInterface } from "readline";
import { createReadStream } from "fs";

const powers = [];

const lineReader = createInterface({
  input: createReadStream("input.txt"),
  rlfDelay: Infinity,
});

lineReader.on("line", function (line) {
  const [gameName, sets] = line.trim().split(":");
  const gameID = gameName.substring(5);
  const possibleCubeSet = { red: 0, green: 0, blue: 0 };

  for (const set of sets.trim().split(";")) {
    for (const cubes of set.trim().split(",")) {
      const [count, color] = cubes.trim().split(" ");
      possibleCubeSet[color] = Math.max(possibleCubeSet[color], Number(count));
    }
  }

  powers.push(
    possibleCubeSet.red * possibleCubeSet.green * possibleCubeSet.blue,
  );
});

lineReader.on("close", function () {
  console.log(
    "Result:",
    powers.reduce((accumulator, curr) => accumulator + curr, 0),
  );
});

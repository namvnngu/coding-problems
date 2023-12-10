import { createInterface } from "readline";
import { createReadStream } from "fs";

const gameIDs = [];

const LIMITS = { red: 12, green: 13, blue: 14 };

const lineReader = createInterface({
  input: createReadStream("input.txt"),
  rlfDelay: Infinity,
});

lineReader.on("line", function (line) {
  const [gameName, sets] = line.trim().split(":");
  const gameID = gameName.substring(5);

  for (const set of sets.trim().split(";")) {
    const gameSet = { red: 0, green: 0, blue: 0 };

    for (const cubes of set.trim().split(",")) {
      const [count, color] = cubes.trim().split(" ");
      gameSet[color] = Number(count);
    }

    if (
      gameSet.red > LIMITS.red ||
      gameSet.green > LIMITS.green ||
      gameSet.blue > LIMITS.blue
    ) {
      return;
    }
  }

  gameIDs.push(Number(gameID));
});

lineReader.on("close", function () {
  console.log(
    "Result:",
    gameIDs.reduce((accumulator, curr) => accumulator + curr, 0),
  );
});

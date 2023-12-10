import { createInterface } from "readline";
import { createReadStream } from "fs";

let result = Infinity;

let seedRanges = [];
let mapGroups = [];

const lineReader = createInterface({
  input: createReadStream("input.txt"),
  rlfDelay: Infinity,
});

lineReader.on("line", function (line) {
  if (line.startsWith("seeds: ")) {
    const split = line.split(/\s+/);
    for (let i = 1; i < split.length; i += 2) {
      seedRanges.push({
        start: Number(split[i]),
        length: Number(split[i + 1]),
      });
    }
    return;
  }

  if (!line) {
    mapGroups.push([]);
    return;
  }

  if (isMapLine(line)) {
    mapGroups[mapGroups.length - 1].push(parseToMapRange(line));
  }
});

lineReader.on("close", function () {
  for (const mapGroup of mapGroups) {
    const newSeedRanges = [];

    for (const seedRange of seedRanges) {
      let seedRangeLength = seedRange.length;
      let seedRangeStart = seedRange.start;

      while (seedRangeLength != 0) {
        let withinMapRange = false;
        let bestDist = seedRangeLength;

        for (const mapRange of mapGroup) {
          if (
            mapRange.sourceStart <= seedRangeStart &&
            seedRangeStart < mapRange.sourceStart + mapRange.length
          ) {
            withinMapRange = true;

            const offset = seedRangeStart - mapRange.sourceStart;
            const newLength = Math.min(
              mapRange.length - offset,
              seedRangeLength,
            );

            newSeedRanges.push({
              start: mapRange.destinationStart + offset,
              length: newLength,
            });

            seedRangeStart += newLength;
            seedRangeLength -= newLength;

            break;
          } else if (seedRangeStart < mapRange.sourceStart) {
            bestDist = Math.min(
              mapRange.sourceStart - seedRangeStart,
              bestDist,
            );
          }
        }

        if (!withinMapRange) {
          const newLength = Math.min(bestDist, seedRangeLength);

          newSeedRanges.push({ start: seedRangeStart, length: newLength });

          seedRangeStart += newLength;
          seedRangeLength -= newLength;
        }
      }
    }

    seedRanges = newSeedRanges;
  }

  for (const seedRange of seedRanges) {
    result = Math.min(result, seedRange.start);
  }

  console.log("Result:", result);
});

function parseToMapRange(line) {
  const splitLine = line.trim().split(/\s+/);

  return {
    sourceStart: Number(splitLine[1]),
    destinationStart: Number(splitLine[0]),
    length: Number(splitLine[2]),
  };
}

function isMapLine(line) {
  return /^[\d+\s]+$/.test(line);
}

function sum(numbers) {
  return numbers.reduce((accumulator, curr) => accumulator + curr, 0);
}

import { readFileSync } from "fs";

// #region MY UTILS
function sum(numbers) {
  return numbers.reduce((accumulator, curr) => accumulator + curr, 0);
}

function asciiDec(char) {
  return char.charCodeAt(0);
}

function gcd(a, b) {
  return a ? gcd(b % a, a) : b;
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

const COLORS = {
  RED: "\x1b[31m",
  GREEN: "\x1b[32m",
  YELLOW: "\x1b[33m",
  BLUE: "\x1b[34m",
  MAGENTA: "\x1b[35m",
  CYAN: "\x1b[36m",
  WHITE: "\x1b[37m",
  GRAY: "\x1b[90m",
  BLACK: "\x1b[30m",
  RESET: "\x1b[0m",
};
function colorize(color, message) {
  const template = `${COLORS[color]}%s${COLORS.RESET}`;
  return { template, message };
}
function print(color, message) {
  const colorized = colorize(color, message);
  console.log(colorized.template, colorized.message);
}
// #endregion MY UTILS

const contraption = readFileSync("input.txt", "utf8").split("\n");
contraption.pop();

const energized = getEnergized(
  { row: 0, col: 0, direction: "RIGHT" },
  contraption,
);
console.log("Result:", energized.length);

function getEnergized(start, contraption) {
  const queue = [start];
  const visited = [];

  while (queue.length !== 0) {
    const beam = queue.shift();

    if (
      visited.find(
        (b) =>
          b.row === beam.row &&
          b.col === beam.col &&
          b.direction === beam.direction,
      )
    ) {
      continue;
    }

    visited.push(beam);

    const nextBeams = getNextBeams(
      beam,
      contraption[beam.row][beam.col],
      contraption.length,
      contraption[0].length,
    );
    for (const nextBeam of nextBeams) {
      queue.push(nextBeam);
    }
  }

  const energized = {};
  for (const { row, col } of visited) {
    energized[`R${row}-C${col}`] = { row, col };
  }
  return Object.values(energized);
}

function getNextBeams(beam, tile, maxRow, maxCol) {
  const nextDirections = (() => {
    switch (`${tile} ${beam.direction}`) {
      case "| UP":
      case "\\ LEFT":
      case "/ RIGHT":
      case ". UP": {
        return ["UP"];
      }
      case "| DOWN":
      case "\\ RIGHT":
      case "/ LEFT":
      case ". DOWN": {
        return ["DOWN"];
      }
      case "- RIGHT":
      case "\\ DOWN":
      case "/ UP":
      case ". RIGHT": {
        return ["RIGHT"];
      }
      case "- LEFT":
      case "\\ UP":
      case "/ DOWN":
      case ". LEFT": {
        return ["LEFT"];
      }
      case "- UP":
      case "- DOWN": {
        return ["LEFT", "RIGHT"];
      }
      case "| RIGHT":
      case "| LEFT": {
        return ["UP", "DOWN"];
      }
      default: {
        return [];
      }
    }
  })();

  const nextBeams = [];
  for (const direction of nextDirections) {
    switch (direction) {
      case "UP": {
        if (beam.row > 0) {
          nextBeams.push({
            row: beam.row - 1,
            col: beam.col,
            direction: "UP",
          });
        }
        break;
      }
      case "DOWN": {
        if (beam.row < maxRow - 1) {
          nextBeams.push({
            row: beam.row + 1,
            col: beam.col,
            direction: "DOWN",
          });
        }
        break;
      }
      case "LEFT": {
        if (beam.col > 0) {
          nextBeams.push({
            row: beam.row,
            col: beam.col - 1,
            direction: "LEFT",
          });
        }
        break;
      }
      case "RIGHT": {
        if (beam.col < maxCol - 1) {
          nextBeams.push({
            row: beam.row,
            col: beam.col + 1,
            direction: "RIGHT",
          });
        }
        break;
      }
    }
  }

  return nextBeams;
}

import { createInterface } from "readline";
import { createReadStream } from "fs";

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

const contraption = [];

const lineReader = createInterface({
  input: createReadStream("input.txt"),
  rlfDelay: Infinity,
});

lineReader.on("line", function (line) {
  const row = [];
  for (let i = 0; i < line.length; i++) {
    row.push(createTile(line[i], contraption.length, i));
  }
  contraption.push(row);
});

lineReader.on("close", function () {
  const startTile = contraption[0][0];
  startTile.fromDirection = "LEFT";
  startTile.nextDirectionsVisited = getNext(startTile, contraption).directions;

  const queue = [startTile];

  while (queue.length !== 0) {
    const currentTile = queue.shift();

    for (const nextTile of getNext(currentTile, contraption).tiles) {
      const newNextDirections = getNext(nextTile, contraption).directions;

      if (
        newNextDirections.length === nextTile.nextDirectionsVisited.length &&
        newNextDirections.every((d) =>
          nextTile.nextDirectionsVisited.includes(d),
        )
      ) {
        continue;
      }

      nextTile.nextDirectionsVisited = Array.from(
        new Set([...newNextDirections, ...nextTile.nextDirectionsVisited]),
      );
      queue.push(nextTile);
    }
  }

  // printContraption(contraption);

  let result = 0;
  for (let r = 0; r < contraption.length; r++) {
    for (let c = 0; c < contraption[0].length; c++) {
      const tile = contraption[r][c];
      if (tile.fromDirection) {
        result++;
      }
    }
  }
  console.log("Result:", result);
});

function createTile(value, row, col) {
  return {
    row,
    col,
    value,
    fromDirection: undefined,
    nextDirectionsVisited: [],
  };
}

function getNext(tile, contraption) {
  const top = contraption[tile.row - 1]?.[tile.col];
  const bottom = contraption[tile.row + 1]?.[tile.col];
  const left = contraption[tile.row]?.[tile.col - 1];
  const right = contraption[tile.row]?.[tile.col + 1];

  const next = { tiles: [], directions: [] };

  switch (`${tile.value} ${tile.fromDirection}`) {
    case "| TOP":
    case "\\ LEFT":
    case "/ RIGHT":
    case ". TOP": {
      if (bottom) {
        bottom.fromDirection = "TOP";
        next.tiles.push(bottom);
        next.directions.push("BOTTOM");
      }
      break;
    }
    case "| BOTTOM":
    case "\\ RIGHT":
    case "/ LEFT":
    case ". BOTTOM": {
      if (top) {
        top.fromDirection = "BOTTOM";
        next.tiles.push(top);
        next.directions.push("TOP");
      }
      break;
    }
    case "- LEFT":
    case "\\ TOP":
    case "/ BOTTOM":
    case ". LEFT": {
      if (right) {
        right.fromDirection = "LEFT";
        next.tiles.push(right);
        next.directions.push("RIGHT");
      }
      break;
    }
    case "- RIGHT":
    case "\\ BOTTOM":
    case "/ TOP":
    case ". RIGHT": {
      if (left) {
        left.fromDirection = "RIGHT";
        next.tiles.push(left);
        next.directions.push("LEFT");
      }
      break;
    }
    case "- BOTTOM":
    case "- TOP": {
      if (left) {
        left.fromDirection = "RIGHT";
        next.tiles.push(left);
        next.directions.push("LEFT");
      }
      if (right) {
        right.fromDirection = "LEFT";
        next.tiles.push(right);
        next.directions.push("RIGHT");
      }
      break;
    }
    case "| RIGHT":
    case "| LEFT": {
      if (top) {
        top.fromDirection = "BOTTOM";
        next.tiles.push(top);
        next.directions.push("TOP");
      }
      if (bottom) {
        bottom.fromDirection = "TOP";
        next.tiles.push(bottom);
        next.directions.push("BOTTOM");
      }
      break;
    }
  }
  return next;
}

function printContraption(contraption) {
  for (let r = 0; r < contraption.length; r++) {
    let row = "";
    for (let c = 0; c < contraption[0].length; c++) {
      const tile = contraption[r][c];
      if (tile.fromDirection) {
        row += "#";
      } else {
        row += ".";
      }
    }
    console.log(row);
  }
}

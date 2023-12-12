import { readFileSync } from "fs";

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

const data = readFileSync("input.txt", "utf8").split("\n");
data.pop();

const { startCell, grid } = (() => {
  let startCell;
  const grid = [];

  for (let r = 0; r < data.length; r++) {
    const row = [];
    for (let c = 0; c < data[0].length; c++) {
      const pipe = data[r][c];
      row.push(createCell(pipe, r, c));
      if (!startCell && pipe === "S") {
        startCell = row[row.length - 1];
      }
    }
    grid.push(row);
  }

  return { startCell, grid };
})();

//#region BFS
let result = 0;
const queue = [startCell];

startCell.visited = true;

while (queue.length !== 0) {
  const parent = queue.shift();

  result = Math.max(result, parent.distance);

  for (const child of getChildren(parent, grid)) {
    if (child.visited) continue;

    parent.next.push(child);
    child.visited = true;
    child.distance = parent.distance + 1;
    queue.push(child);
  }
}
//#endregion BFS

// printGrid(startCell, grid);
console.log("Result:", result);

function createCell(pipe, row, col) {
  return {
    pipe,
    row,
    col,
    visited: false,
    distance: 0,
    next: [],
  };
}

function getChildren(cell, grid) {
  const children = [];
  const { row, col, pipe } = cell;

  switch (pipe) {
    case "|": {
      const up = getNextCell("UP", row, col, grid);
      up && children.push(up);

      const down = getNextCell("DOWN", row, col, grid);
      down && children.push(down);

      break;
    }
    case "-": {
      const left = getNextCell("LEFT", row, col, grid);
      left && children.push(left);

      const right = getNextCell("RIGHT", row, col, grid);
      right && children.push(right);

      break;
    }
    case "L": {
      const up = getNextCell("UP", row, col, grid);
      up && children.push(up);

      const right = getNextCell("RIGHT", row, col, grid);
      right && children.push(right);

      break;
    }
    case "J": {
      const up = getNextCell("UP", row, col, grid);
      up && children.push(up);

      const left = getNextCell("LEFT", row, col, grid);
      left && children.push(left);

      break;
    }
    case "7": {
      const down = getNextCell("DOWN", row, col, grid);
      down && children.push(down);

      const left = getNextCell("LEFT", row, col, grid);
      left && children.push(left);

      break;
    }
    case "F": {
      const down = getNextCell("DOWN", row, col, grid);
      down && children.push(down);

      const right = getNextCell("RIGHT", row, col, grid);
      right && children.push(right);

      break;
    }
    case "S": {
      const up = getNextCell("UP", row, col, grid);
      up && children.push(up);

      const down = getNextCell("DOWN", row, col, grid);
      down && children.push(down);

      const left = getNextCell("LEFT", row, col, grid);
      left && children.push(left);

      const right = getNextCell("RIGHT", row, col, grid);
      right && children.push(right);

      break;
    }
  }

  return children;
}

function getNextCell(direction, row, col, grid) {
  switch (direction) {
    case "UP": {
      if (
        grid[row - 1]?.[col] &&
        (grid[row - 1][col].pipe === "|" ||
          grid[row - 1][col].pipe === "7" ||
          grid[row - 1][col].pipe === "F")
      ) {
        return grid[row - 1][col];
      }
      break;
    }
    case "DOWN": {
      if (
        grid[row + 1]?.[col] &&
        (grid[row + 1][col].pipe === "|" ||
          grid[row + 1][col].pipe === "L" ||
          grid[row + 1][col].pipe === "J")
      ) {
        return grid[row + 1][col];
      }
      break;
    }
    case "RIGHT": {
      if (
        grid[row]?.[col + 1] &&
        (grid[row][col + 1].pipe === "-" ||
          grid[row][col + 1].pipe === "7" ||
          grid[row][col + 1].pipe === "J")
      ) {
        return grid[row][col + 1];
      }
      break;
    }
    case "LEFT": {
      if (
        grid[row]?.[col - 1] &&
        (grid[row][col - 1].pipe === "-" ||
          grid[row][col - 1].pipe === "F" ||
          grid[row][col - 1].pipe === "L")
      ) {
        return grid[row][col - 1];
      }
      break;
    }
  }
  return undefined;
}

function printGrid(startCell, grid) {
  const PATH_COLORS = [
    COLORS.RED,
    COLORS.GREEN,
    COLORS.YELLOW,
    COLORS.BLUE,
    COLORS.CYAN,
    COLORS.MAGENTA,
  ];
  const PATH_MAPPER = {
    "|": "║",
    "-": "═",
    L: "╚",
    J: "╝",
    7: "╗",
    F: "╔",
    S: "S",
    ".": ".",
  };
  const paths = getPaths(startCell, grid);
  for (let r = 0; r < grid.length; r++) {
    let colors = "";
    const str = [];
    for (let c = 0; c < grid[0].length; c++) {
      const cell = grid[r][c];
      const ui = PATH_MAPPER[cell.pipe];
      const foundIndex = paths.findIndex((path) => path.find((c) => c === cell));

      colors += `${
        foundIndex >= 0 ? PATH_COLORS[foundIndex % PATH_COLORS.length] : COLORS.BLACK
      }%s${COLORS.RESET}`;
      str.push(ui);
    }
    console.log(colors, ...str);
  }
}

function getPaths(startCell, grid) {
  const paths = [];
  const children = getChildren(startCell, grid);

  for (const child of children) {
    let curr = child;
    const path = [startCell, curr];

    while (curr.next.length !== 0) {
      curr = curr.next[0];
      path.push(curr);
    }
    paths.push(path);
  }
  return paths;
}

import { readFileSync } from "fs";

const COLORS = {
  BLACK: "\x1b[30m",
  RED: "\x1b[31m",
  GREEN: "\x1b[32m",
  YELLOW: "\x1b[33m",
  BLUE: "\x1b[34m",
  MAGENTA: "\x1b[35m",
  CYAN: "\x1b[36m",
  WHITE: "\x1b[37m",
  GRAY: "\x1b[90m",
  RESET: "\x1b[0m",
};

const data = readFileSync("input.txt", "utf8").split("\n");
data.pop();

const { startPoint, grid } = (() => {
  let startPoint;
  const grid = [];

  for (let r = 0; r < data.length; r++) {
    const row = [];
    for (let c = 0; c < data[0].length; c++) {
      const pipe = data[r][c];
      row.push(createCell(pipe, r, c));
      if (!startPoint && pipe === "S") {
        startPoint = { row: r, col: c };
      }
    }
    grid.push(row);
  }

  return { startPoint, grid };
})();

//#region BFS
let result = 0;
const queue = [];

const startCell = grid[startPoint.row][startPoint.col];
queue.push(startCell);
startCell.visited = true;

while (queue.length !== 0) {
  const cell = queue.shift();

  result = Math.max(result, cell.distance);

  for (const child of getChildren(cell, grid)) {
    if (child.visited) continue;
    child.visited = true;
    child.distance = cell.distance + 1;
    queue.push(child);
  }
}
//#endregion BFS

// printGrid(grid);
console.log("Result:", result);

function createCell(pipe, row, col) {
  return {
    pipe,
    row,
    col,
    visited: false,
    distance: 0,
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

function printGrid(grid) {
  const C = [
    COLORS.RED,
    COLORS.YELLOW,
    COLORS.GREEN,
    COLORS.BLUE,
    COLORS.CYAN,
    COLORS.MAGENTA,
  ];
  for (let r = 0; r < grid.length; r++) {
    let colors = "";
    const str = [];
    for (let c = 0; c < grid[0].length; c++) {
      const cell = grid[r][c];

      if (cell.pipe === "S" || cell.pipe === "." || !cell.visited) {
        colors += `${COLORS.BLACK}%s${COLORS.RESET}`;
        str.push(cell.pipe);
        continue;
      }

      colors += `${C[(cell.distance - 1) % C.length]}%s${COLORS.RESET}`;
      // colors += `${COLORS.RED}%s${COLORS.RESET}`;
      str.push(cell.distance);
    }
    console.log(colors, ...str);
  }
}

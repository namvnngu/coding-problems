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

//#region DFS
const stack = [startCell];
const path = [startCell];

startCell.visited = true;

while (stack.length !== 0) {
  const parent = stack.pop();

  for (const child of getChildren(parent, grid)) {
    if (child.visited) continue;

    child.visited = true;
    child.distance = parent.distance + 1;

    stack.push(child);
    path.push(child);
  }
}
//#endregion DFS

// printGrid(path, grid);
console.log("Result:", path.length / 2);

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
      if (up) {
        children.push(up);
        break;
      }

      const down = getNextCell("DOWN", row, col, grid);
      if (down) {
        children.push(down);
        break;
      }

      const left = getNextCell("LEFT", row, col, grid);
      if (left) {
        children.push(left);
        break;
      }

      const right = getNextCell("RIGHT", row, col, grid);
      if (right) {
        children.push(right);
        break;
      }

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

function printGrid(path, grid) {
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
  for (let r = 0; r < grid.length; r++) {
    let colors = "";
    const str = [];
    for (let c = 0; c < grid[0].length; c++) {
      const cell = grid[r][c];
      const ui = PATH_MAPPER[cell.pipe];

      colors += `${path.find((c) => c === cell) ? COLORS.RED : COLORS.BLACK}%s${
        COLORS.RESET
      }`;
      str.push(ui);
    }
    console.log(colors, ...str);
  }
}

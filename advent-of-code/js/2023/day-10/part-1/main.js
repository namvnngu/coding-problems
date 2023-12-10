import { readFileSync } from "fs";

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
  result = cell.distance;

  for (const neighbor of getNeighbors(cell, grid)) {
    if (neighbor.visited) continue;
    neighbor.visited = true;
    neighbor.distance = cell.distance + 1;
    queue.push(neighbor);
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

function getNeighbors(cell, grid) {
  const neighbors = [];
  const { row, col, pipe } = cell;

  switch (pipe) {
    case "|": {
      grid[row - 1]?.[col] && neighbors.push(grid[row - 1][col]);
      grid[row + 1]?.[col] && neighbors.push(grid[row + 1][col]);
      break;
    }
    case "-": {
      grid[row]?.[col + 1] && neighbors.push(grid[row][col + 1]);
      grid[row]?.[col - 1] && neighbors.push(grid[row][col - 1]);
      break;
    }
    case "L": {
      grid[row - 1]?.[col] && neighbors.push(grid[row - 1][col]);
      grid[row]?.[col + 1] && neighbors.push(grid[row][col + 1]);
      break;
    }
    case "J": {
      grid[row - 1]?.[col] && neighbors.push(grid[row - 1][col]);
      grid[row]?.[col - 1] && neighbors.push(grid[row][col - 1]);
      break;
    }
    case "7": {
      grid[row + 1]?.[col] && neighbors.push(grid[row + 1][col]);
      grid[row]?.[col - 1] && neighbors.push(grid[row][col - 1]);
      break;
    }
    case "F": {
      grid[row + 1]?.[col] && neighbors.push(grid[row + 1][col]);
      grid[row]?.[col + 1] && neighbors.push(grid[row][col + 1]);
      break;
    }
    case "S": {
      grid[row + 1]?.[col] && neighbors.push(grid[row + 1][col]);
      grid[row - 1]?.[col] && neighbors.push(grid[row - 1][col]);
      grid[row]?.[col + 1] && neighbors.push(grid[row][col + 1]);
      grid[row]?.[col - 1] && neighbors.push(grid[row][col - 1]);
      break;
    }
  }

  return neighbors;
}

function printGrid(grid) {
  let s = "";
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      const cell = grid[r][c];
      s += cell.pipe !== "." ? cell.distance : ".";
      s += " ";
    }
    s += "\n";
  }
  console.log(s);
}

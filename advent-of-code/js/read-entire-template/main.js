import { readFileSync } from "fs";

const data = readFileSync("test.txt", "utf8");
console.log(data);

function sum(numbers) {
  return numbers.reduce((accumulator, curr) => accumulator + curr, 0);
}

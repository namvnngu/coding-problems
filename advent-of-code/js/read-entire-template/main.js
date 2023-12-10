import { readFileSync } from "fs";

const data = readFileSync("test.txt", "utf8");
console.log(data);
console.log("Result:");

function sum(numbers) {
  return numbers.reduce((accumulator, curr) => accumulator + curr, 0);
}

function gcd(a, b) {
  return a ? gcd(b % a, a) : b;
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

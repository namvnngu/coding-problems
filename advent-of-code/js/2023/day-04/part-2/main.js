import { createInterface } from "readline";
import { createReadStream } from "fs";

const lineReader = createInterface({
  input: createReadStream("input.txt"),
  rlfDelay: Infinity,
});

let result = 0;
let cardNumber = 0;
let scratchcards = {};

lineReader.on("line", function (line) {
  cardNumber++;

  scratchcards[cardNumber] ??= 0;
  scratchcards[cardNumber] += 1;

  result += 1;

  const card = line.split(":")[1].trim().split("|");
  const winningNumbers = card[0].trim().split(/\s+/);
  const myNumbers = card[1].trim().split(/\s+/);

  let matchingNumberCount = 0;
  for (const myNumber of myNumbers) {
    if (winningNumbers.includes(myNumber)) {
      matchingNumberCount++;

      scratchcards[cardNumber + matchingNumberCount] ??= 0;
      scratchcards[cardNumber + matchingNumberCount] +=
        scratchcards[cardNumber];

      result += scratchcards[cardNumber];
    }
  }
});

lineReader.on("close", function () {
  console.log("Result:", result);
  // console.log(scratchcards);
});

function sum(numbers) {
  return numbers.reduce((accumulator, curr) => accumulator + curr, 0);
}

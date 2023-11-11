import { createInterface } from "readline";
import { createReadStream } from "fs";

const lineReader = createInterface({
  input: createReadStream("test.txt"),
  rlfDelay: Infinity,
});

let lineNumber = 0;

lineReader.on("line", function (line) {
  lineNumber++;
  console.log(`${lineNumber}. ${line}`);
});

lineReader.on("close", function () {});

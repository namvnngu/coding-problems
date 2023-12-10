import { createInterface } from "readline";
import { createReadStream } from "fs";

const CARD_RANKS = {
  2: 1,
  3: 2,
  4: 3,
  5: 4,
  6: 5,
  7: 6,
  8: 7,
  9: 8,
  T: 9,
  J: 10,
  Q: 11,
  K: 12,
  A: 13,
};

const HAND_TYPE_POINTS = {
  HIGH_CARD: 0,
  ONE_PAIR: 1,
  TWO_PAIR: 2,
  THREE_KIND: 3,
  FULL_HOUSE: 4,
  FOUR_KIND: 5,
  FIVE_KIND: 6,
};

const hands = [];

const lineReader = createInterface({
  input: createReadStream("input.txt"),
  rlfDelay: Infinity,
});

lineReader.on("line", function (line) {
  const split = line.trim().split(/\s+/);
  const type = getHandType(split[0]);
  hands.push({
    type,
    hand: split[0],
    bid: Number(split[1]),
    point: HAND_TYPE_POINTS[type],
  });
});

lineReader.on("close", function () {
  hands.sort((a, b) => {
    if (a.point !== b.point) {
      return a.point - b.point;
    }
    for (let i = 0; i < a.hand.length; i++) {
      if (a.hand[i] === b.hand[i]) continue;
      return CARD_RANKS[a.hand[i]] - CARD_RANKS[b.hand[i]];
    }
    return 0;
  });

  let result = 0;
  for (let i = 1; i <= hands.length; i++) {
    result += hands[i - 1].bid * i;
  }

  console.log("Result:", result);
});

function getHandType(hand) {
  const cards = {};

  for (let i = 0; i < hand.length; i++) {
    cards[hand[i]] ??= 0;
    cards[hand[i]]++;
  }

  const cardCounts = Object.values(cards);

  if (cardCounts.length === 1) {
    return "FIVE_KIND";
  }
  if (cardCounts.length === 2) {
    if (cardCounts.find((count) => count === 4)) {
      return "FOUR_KIND";
    }
    if (cardCounts.find((count) => count === 3)) {
      return "FULL_HOUSE";
    }
  }
  if (cardCounts.length === 3) {
    if (cardCounts.find((count) => count === 3)) {
      return "THREE_KIND";
    }
    if (cardCounts.find((count) => count === 2)) {
      return "TWO_PAIR";
    }
  }
  if (cardCounts.length === 4) {
    return "ONE_PAIR";
  }
  return "HIGH_CARD";
}

function sum(numbers) {
  return numbers.reduce((accumulator, curr) => accumulator + curr, 0);
}

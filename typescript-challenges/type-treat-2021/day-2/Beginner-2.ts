import { cookPumpkinSoup } from "type-or-treat"

// You're helping out at a local food-bank trying to sort a
// big pile of pumpkins into something which is usable for making
// Thai pumpkin soup (add some lemongrass, chilli and coconut milk.)

const pumpkins = [
  { color: "green", soundWhenHit: "dull thud" },
  { color: "purple", soundWhenHit: "echo-y" },
  { color: "green", soundWhenHit: "dull thud" },
  { color: "white", soundWhenHit: "squishy" },
  { color: "orange", soundWhenHit: "echo-y" },
  { color: "green", soundWhenHit: "dull thud" },
  { color: "orange", soundWhenHit: "echo-y" },
  { color: "blue", soundWhenHit: "echo-y" },
  { color: "orange", soundWhenHit: "echo-y" }
];

// Can you extract the types for three different categories of these pumpkins?
type UnderripePumpkin = {
  color: "green",
  soundWhenHit: "dull thud"
}
type RipePumpkin = {
  color: "purple" | "orange" | "blue"
  soundWhenHit: "echo-y"
}
type OverripePumpkin = {
  color: "green" | "whie",
  soundWhenHit: "squishy"
}

// We'll use a type union to say that a pumpkin can be any of these possible types

type Pumpkin = UnderripePumpkin | RipePumpkin | OverripePumpkin

// Looks good, now lets make a pie, we want to first get out all of the ripe pumpkins.
// This code works at runtime, but TypeScript doesn't seem to understand that `pumpkinsForPie`
// is only RipePumpkin's now. Can you think of a way to change the `isRipe` to "guard" the "type"?

function isRipe(pumpkin: any): pumpkin is RipePumpkin {
  return "soundWhenHit" in pumpkin && pumpkin.soundWhenHit === "echo-y";
}

const pumpkinsForPie = pumpkins.filter(isRipe)
//    ^?
const soup = cookPumpkinSoup(pumpkinsForPie)
//    ^?


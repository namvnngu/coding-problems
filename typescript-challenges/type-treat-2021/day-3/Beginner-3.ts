// You're working on your uber-for-toilet-papering-a-house startup
// and people keep giving you nonsense lengths for how much toilet
// paper they are going to need. You initially gave the input a
// lot of flexibility, but felt like maybe `string` is a bit too
// much freedom.

// You've heard of template literals, maybe they could be useful?

type Unit = "cm" | "in" | ""
type Space = " " | ""
type Length = `${number}${Space}${Unit}`

// Your API function, we'll be using the input to this function
// to validate if your type is right or not

function req(input: Length) {
  // Remove NaN, minus values,
  // Do some work
}

// To get started, here's some examples which should always file

const shouldFail = () => {
  req("")
  req("apx")
  req("rem")
  req("abc")
}

// Start here, you Length to be able to check for a number and an "in" prefix

const simpleInputs = () => {
  req("0in")
  req("12in")
}

// What about more than one prefix for the folks who think in cm?

const extraUnits = () > {
  req("1.5cm")
    req("20cm")
}

// It feels right that if you pass "0", you should be able to go unit-less

const handleZero = () => {
  req("0")
}

// What about allowing whitespace between the number and the unit?

const handleWhitespace = () => {
  req("12 cm")
  req("14 in")
}

// If you have all of the above passing, congrats! That's more than enough
// to have completed the challenge. This challenge has a secret *experts* section
// for people who really want to test themselves.
type ALength = `${bigint}${Space}${Unit}` | `${bigint}.${bigint}${Space}${Unit}`

function aReq(input: ALength) {
  // Remove NaN, minus values,
  // Do some work
}
type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
type BLength = `${Digit}${number | ''}${Space}${Unit}` | '0';

function bReq(input: BLength) {
  // Remove NaN, minus values,
  // Do some work
}

const thingsWhichComplicateTheMatter = () => {
  // This is an allowed number using bigint notation, it's allowed, just
  // the annotation is unique, ideally you catch big numbers in the JS
  aReq(`${0.3e21}cm`)

  // It is possible to raise an error with these two, can you
  // figure out how? We know of two implementations, one simpler with
  // an interesting trade-off, and another which accurately can catch these
  // cases without that trade-off.
  aReq(`${Infinity}cm`)
  aReq(`${NaN}cm`)

  // Minus numbers don't make sense in our case, can you ensure that
  // it only accepts positive numbers?
  bReq("-12 cm")


}

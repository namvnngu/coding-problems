## Beginner/Learner Challenge

I wonder if we over-indexed on the difficulty here, and we're interested if you dropped off somewhere through this task because we had less submissions than usual for this challenge. The goal was to have you build out a template string literal type which accounted for string input which roughly matched how CSS's stringy variables worked.

You started with:

```js
type Length = string;
```

Which accepts all possible strings, next we show some examples which should always fail. The key one here being that an empty string should fail: "". Next we provided some valid input for you to work with:

```js
type Length = `${number}in`

// Works with:
req("0in")
req("12in")
```

Giving you a sense that a number can be used in the template slot - which allows for all sorts of possibilities.

Next we gave samples with different prefixes, so "in" and "cm" would need to be handled. To get that right, you would need to use a union:

```js
type Unit = "cm" | "in"
type Length = `${number}${Unit}`

// Works with:
req("0in")
req("12in")
req("1.5cm")
req("20cm")
```

Next we threw a curve ball - "0" should also be acceptable, this is a bit of a curve ball, but also it's a bit of a trick:

```js
type Unit = "cm" | "in" | ""
type Length = `${number}${Unit}`

// Works with:
req("0in")
req("12in")
req("1.5cm")
req("20cm")
req("0")
```

The lack of a unit is just an empty string unit! Only one more thing now, and that is allowing a space inbetween the number and unit. This could be done via another type also:

```js
type Unit = "cm" | "in" | ""
type Space = " " | ""
type Length = `${number}${Space}${Unit}`

// Works with:
req("0in")
req("12in")
req("1.5cm")
req("20cm")
req("0")
req("12 cm")
req("14 in")
```

hat was is for the easy parts of the challenge. It's pretty tricky, because it requires that you understand that number can be anything in the template string and to understand how a union can allow for different types of strings inside the type. That's all in the main docs, but it could be a lot of ideas to learn at once.

This challenge also had a set of complications, cases where the version of the the Length type we expected people to build would provide interesting edge cases:

```js
req(`${0.3e21}cm`);
req("-12 cm");
req(`${Infinity}cm`);
req(`${NaN}cm`);
```

**Learn about these cases**

```js
req(`${0.3e21}cm`);
```

Acted as a potential clue to an alternative answer for these failing cases:

```js
req(`${Infinity}cm`);
req(`${NaN}cm`);
```

Because number can be switched out with bigint in the type of Length:

```js
- type Length = `${number}${Space}${Unit}`
+ type Length = `${bigint}${Space}${Unit}`
```

This meant you couldn't pass in Infinity or NaN but also broke req("1.5cm") because you can't have point values. This could be fixed via:

```js
type Length = `${bigint}${Space}${Unit}` | `${bigint}.${bigint}${Space}${Unit}`
```

Which describes both possibile cases with a "." and without. This technique still doesn't handle the req("-12 cm"), and actually, it introduces a whole new problem: req("-12.-12cm") is allowed!

We spotted a good answer from @danvdk which revolved around using string manipulation instead, by introducing a Digit type:

```js
type Whitespace = '' | ' ';
type Unit = 'in' | 'cm';
type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
type Length = `${Digit}${number | ''}${Whitespace}${Unit}` | '0';
```

This solution correctly handles the case of req("-12 cm") but via that number would allow something like req("1-22 cm") - which you can pretend is to handle an input range. It wouldn't be hard to take this solution and reasonably cover additional edge cases. Very cool solution.

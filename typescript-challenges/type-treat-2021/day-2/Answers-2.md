## Beginner/Learner Challenge

There is many ways to decide how to type existing data, you could use literal types when you're sure of the exact formats - or be more liberal and use string when you expect a variety. We opted for literals, but using string is totally cool too.

```js
type UnderripePumpkin = {
  color: "green",
  soundWhenHit: "dull thud",
};
type RipePumpkin = {
  color: "purple" | "orange" | "blue",
  soundWhenHit: "echo-y",
};
type OverripePumpkin = {
  color: "green" | "white",
  soundWhenHit: "squishy",
};
```

The second part of the challenge used type predicates (or type guards) annotates a function which returns a booleon with narrowing information about the paramters. This means we can tell TypeScript that when the return values to isRipeis true, then the argument pumpkin is of the type RipePumpkin:

```js
- function isRipe(pumpkin: any) {
+ function isRipe(pumpkin: any): pumpkin is RipePumpkin {
       return "soundWhenHit" in pumpkin && pumpkin.soundWhenHit === "echo-y"
  }

```

## Intermediate/Advanced Challenge

This challenge was first about understanding different read vs write properties available in both classes and interface/typed objects. Personally, I've seen this with document.location a lot where you always get a rich object when you read but can write to that property with a string. We wanted a similar concept, but using punch which for me is generally a 'throw it all in and see what happens' style of drink.

```js
class PunchMixer {
  #punch: Punch = {flavour: '', ingredients: []};

  public get punch(): Punch {
      return this.#punch;
  }

  public set punch(punch: Punch | Punch['ingredients'][number]) {
      if (typeof punch === 'string') {
          this.#punch.ingredients.push(punch);
      } else if ('flavour' in punch) {
          this.#punch = punch;
      } else {
          this.#punch.ingredients.push(punch);
      }
  }
}
```

This solution uses a mix of private class fields, indexed types and type narrowing to set up a local punch object which is always returned.

The next step was to make this class generic in some form so that a type parameter passed in to the class would dictate what the return value of a vend function was.

```js
- class PunchMixer {
+ class PunchMixer<MixerType> {
+    mixer!: MixerType;

  // ...
+   public vend(): MixerType {
+        return this.mixer;
+    }
  }
```

We were not too worried about how you passed back the MixerType - our first draft had return {} as MixerType but a private field feels nicer.

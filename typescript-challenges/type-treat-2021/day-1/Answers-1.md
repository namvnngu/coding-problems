## Beginner/Learner Challenge

The first part of the solution for this challenge used as const to trigger “Literal Inference” – basically telling TypeScript “Don’t convert the array to string[] but consider it a constant set of string literals. This meant that playlist[0] stopped returning string and started returning "The Legend of Sleepy Hollow by The Monotones.mp3".

```js
  const playlist = [
      "The Legend of Sleepy Hollow by The Monotones.mp3",
      ...
- ]
+ ] as const
```

The second part of the challenge used typeof types to extract the type from the playlist array. Without the first change, this would be string but after the change this meant the full array of different types. You then needed to use the type index syntax [number] to declare that you want any potential string from that array.

```js
- function playSong(song: string) {
+ function playSong(song: typeof playlist[number]) {
      api.play(song)
  }
```

## Intermediate/Advanced Challenge

This pattern is quite common in code we write in TypeScript codebases, you create one function which takes the result of another and keeps passing objects between functions in a pipeline. One of the best techniques for simplifying this design pattern is to use ReturnType with typeof myFunc to map the return type of one function to the paramter of another. This removes the need for intermediary types which need to be updated when the functions change.

```js
  const findOldCostume = () => {
      // ...
      return { jumpSuit, estimate }
  }

- const createNewMask = (costume: any) => {
+ const createNewMask = (costume: ReturnType<typeof findOldCostume>) => {
      // ...
      return { ...costume, mask }
  }
```

The little extra step at the end was a small reminder that you can use this technique to provide a type which can be re-used everywhere.

```js
type Costume = ReturnType<typeof assembleCostume>;
```

# 2025 Puzzle 01

[Puzzle link](https://adventofcode.com/2025/day/1)

## Part one

This puzzle revolves around the dial on a safe, pun intended. Starting from 50, we follow a set of instructions to turn the dial. For part one of the puzzle, we need to count the number of times we stop on zero.

The dial described in the puzzle wraps around so it doesn't have any numbers below zero or above 99. But we don't need to care about that, we have the modulo operator. With that tool, what we actually care about is how many times we stop on **a multiple of 100**.

```typescript
0 % 100;      // 0
50 % 100;     // 50
100 % 100;    // 0
2_000 % 100;  // 0
-1_300 % 100; // 0
```

Most of solving this first part of the puzzle is just the logistics of converting the input sequence into actual mathematical operations to go from one number to the next.

As always, programming is about breaking things down into small steps. Those logistics involve...

* reading a file
* splitting the file's contents into lines
* converting each line's instruction string into something easy to work with
* performing an instruction on an initial number to get a new number

This is my first Advent of Code puzzle, but I suspect this kind of small logistical challenge is likely going to be something each puzzle needs, given how every user has a unique input so we can't just copy one another's answers.

Then, each time we stop at a new number, we just need to check if its modulo with 100 is zero. This is checked in a very simple function called [`stoppedAtZero`](solve.ts#L65).

For my input, the correct solution to part one was **1023**.

## Part two

Part two has us also counting each time we _pass over_ zero during an operation. So, for example, if we start at 50 and rotate the dial right 359 times, we pass zero (still really meaning any multiple of 100) four times:

50 -> **100** -> **200** -> **300** -> **400** -> 409

Landing on zero still counts, just like before, and starting at zero doesn't.

To get these new zero passes, I kept the prior position to compare with the new one. I dropped the digits in the ones and tens columns by dividing by 100 and using the `Math.floor` function to round down to the nearest integer.

So in the above example, I would now be comparing a starting point of `0` with a final position of `4`.

At that point, it's simple to just take the difference by subtracting one number from the other, making sure to use `Math.abs` because we don't care about direction.

With this approach, I also had to handle subtraction instructions a little differently to make sure they would count landing on zero but not starting on zero. These edge cases caught me out on my first couple of attempts, because they're not both included in the test input the question steps through.

This logic is handled in a [`getZeroPassCount`](solve.ts#L76) function.

For my input, the solution to part two was **5899**.

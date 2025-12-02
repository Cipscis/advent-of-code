# 2015 Puzzle 01

[Puzzle link](https://adventofcode.com/2015/day/1)

## Part one

This is a very simple puzzle. You need to take an input string and either increment or decrement a number based on each character. Easy to achieve with a simple loop and a couple of conditions.

For my input, the correct solution to part one was **280**.

## Part two

Part two is also simple. We need to find the (1-based) index of the first character that causes the counter to tick down to -1. Because I'm already looping over them, an extra condition can check this.

I just needed to make a slight adjustment to the way I was iterating over the array, because the `for...of` loop I had used initially doesn't include the character's index. Looping through an array using `forEach` does provide this extra information, and converting a string into an array of characters is easy enough using `String.prototype.split`.

For my input, the solution to part two was **1797**.

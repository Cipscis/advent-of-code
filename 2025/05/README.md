# 2025 Puzzle 05

[Puzzle link](https://adventofcode.com/2025/day/5)

## Part one

This is a very easy puzzle. The input is slightly more complex to parse than previous inputs because it comes in two parts, but once it's parsed then it's just a matter of checking which of a bunch of numbers fit within any of a number of ranges.

I made a `Range` class, mainly since I have been tidying up my `Grid` and `Cursor` classes that I made for yesterday's puzzle. Working with classes involves thinking a little differently to how I normally do, so when it's a reasonable option I figure maybe it'll help me think about things in new ways.

Anyway. For my input, the correct solution to part one was **607**.

## Part two

Okay, part two involves checking how these ranges overlap with one another. My immediate thought is about how `Set` has methods for things like this, as well as built-in de-duplication. But I don't think that's quite the right approach here since the ranges can be quite broad and I don't want to be making integer ranges across their whole entire breadth.

This is making me glad I already made a `Range` class though, since it's easy to add more methods like `length`, `overlaps`, and `combine`.

I expect I'll need to iteratively combine ranges until there are no more changes, and then sum up the lengths of all ranges left at the end.

Huh. My first attempt works successfully on the (very simple) test input but fails as being too low on the real input. I would have expected failing as being too _high_ but not too low. This must mean I'm over-combining ranges somehow. Probably a good idea to step away for a bit to get some fresh eyes.

Okay, yeah, the problem here comes from attempting to modify arrays while I'm looping through them, and losing track of the correct indices.

Rewriting it from scratch was a good start. I'm now building a new array with each iteration instead. It's surely not the most efficient way possible to do this, but unlike before it actually works.

For my input, the solution to part two was **342,433,357,244,012**.

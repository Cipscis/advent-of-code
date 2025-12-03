# 2015 Puzzle 03

[Puzzle link](https://adventofcode.com/2015/day/3)

## Part one

This puzzle involves moving about on an infinite grid. We need to keep track not of our position, but of how many times each grid position is visited.

Creating a finite grid typically means a 2D array in JavaScript, but an infinite grid is less straightforward. We'll want to construct this grid as we navigate it.

My first thought is to use a [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map), where each key will be a serialised string representing our position.

I initially forgot to count my initial position, oops! I also didn't need to count the number of visits for this part of the puzzle, but it was easy to do and I figured it may be useful for the second part.

For my input, the correct solution to part one was **2,565**.

## Part two

Okay, I don't know if it's just me but this puzzle was really hard to understand. Sure, it's easy enough to see that we treat "Santa" and "RoboSanta" as two different cursors navigating the same infinite grid, and any visit from either cursor increments the count at that grid position.

But trying to figure out what instructions each cursor is following seems really unclear from the puzzle description. What does "reading from the same script as the previous year" mean when I've only been given one puzzle input file?

Even the examples aren't helpful. I'm guessing that the navigation is inverted for "RoboSanta"? I'm going to try that approach and see if my answer is accepted.

I encountered something weird while working on this. I still had the correct answer to part one if I just had "Santa" navigating. But if I also added in "RoboSanta" at the same time, the number of houses getting visited somehow dropped. This despite the two positions being independent of one another and only adding to the same count.

Oh, oops. I was counting the total the wrong way. Instead of the total number of visited cells I was counting number of time steps during which a new cell was visited, which means I under-counted on time steps when both cursors visited a new cell.

Well, after all that, my answer is wrong. Presumably because I've misunderstood the puzzle and so incorrectly programmed "RoboSanta" by inverting the instruction given to "Santa".

Ohhhhh! They take turns moving! Well that's much easier... also re-reading the instructions and examples that does make sense. Perhaps I'm just tired.

For my input, the solution to part two was **2,639**.

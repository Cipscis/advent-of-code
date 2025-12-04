# 2025 Puzzle 04

[Puzzle link](https://adventofcode.com/2025/day/4)

## Part one

I'd been warned by some of colleagues, who have done Advent of Code before, that navigating a 2D grid is a common theme across many puzzles. So for this one I decided it'd be worthwhile making some utility classes.

I don't often use class syntax in my day-to-day job, but in this case where I wanted to represent a 2D grid and a cursor that can navigate to different positions on the grid, I thought it would be worth doing.

I'm sure I will move these utilities out into the top level `util` folder once I need them for some other puzzle, and I've tried to make it so I can improve on them later by having things like a defined cursor behaviour that can later be extended for things like wrapping from edge to edge.

Once I had set up these classes, and in particular the `Grid.walk` method that allows me to call a function across each cell in a grid, calculating the correct answer was pretty easy. This puzzle was all about counting neighbours, so I also implemented a `Cursor.getNeighbours` method to help with that.

For my input, the correct solution to part one was **1,516**.

## Part two

TODO

For my input, the solution to part two was **TODO**.

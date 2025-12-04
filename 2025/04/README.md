# 2025 Puzzle 04

[Puzzle link](https://adventofcode.com/2025/day/4)

## Part one

I'd been warned by some of colleagues, who have done Advent of Code before, that navigating a 2D grid is a common theme across many puzzles. So for this one I decided it'd be worthwhile making some utility classes.

I don't often use class syntax in my day-to-day job, but in this case where I wanted to represent a 2D grid and a cursor that can navigate to different positions on the grid, I thought it would be worth doing.

I'm sure I will move these utilities out into the top level `util` folder once I need them for some other puzzle, and I've tried to make it so I can improve on them later by having things like a defined cursor behaviour that can later be extended for things like wrapping from edge to edge.

Once I had set up these classes, and in particular the `Grid.walk` method that allows me to call a function across each cell in a grid, calculating the correct answer was pretty easy. This puzzle was all about counting neighbours, so I also implemented a `Cursor.getNeighbours` method to help with that.

For my input, the correct solution to part one was **1,516**.

## Part two

Okay, part two requires an iterative process where those cells that are identified get removed. Honestly this is very similar to Conway's game of life, in that we're defining a set of rules the defines each cell's new state in the next time step based on its current state and number of neighbours. Conway's Game of Life is something I've hobby coded so many times, but I think I've always hard-coded the rules.

One of my most recent side projects (though it was a little while ago now) was about seeing how fast I could make a JavaScript implementation of Conway's Game of Life, spurred on by some learning I did last year about performance in the browser.

Since I don't plan on building a visualisation for this puzzle, I think I'll just hard-code these rules for now. But it could be cool to be able to define a ruleset to apply more generally.

Since I already had all the scaffolding of my `Grid` and `Cursor` types built, this part was quite a lot easier. I just had to loop over the grid multiple times, each time collecting all "removable" cells' positions and then once I had all those positions updating all their values. If there were no "removable" cells, that's the end of the iterations. And along the way I'm keeping track of how many I'm removing.

For my input, the solution to part two was **9,122**.

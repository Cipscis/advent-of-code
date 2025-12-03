# 2015 Puzzle 03

[Puzzle link](https://adventofcode.com/2015/day/3)

## Part one

This puzzle involves moving about on an infinite grid. We need to keep track not of our position, but of how many times each grid position is visited.

Creating a finite grid typically means a 2D array in JavaScript, but an infinite grid is less straightforward. We'll want to construct this grid as we navigate it.

My first thought is to use a [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map), where each key will be a serialised string representing our position.

I initially forgot to count my initial position, oops! I also didn't need to count the number of visits for this part of the problem, but it was easy to do and I figured it may be useful for the second part.

For my input, the correct solution to part one was **2565**.

## Part two

TODO

For my input, the solution to part two was **TODO**.

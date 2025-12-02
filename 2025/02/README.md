# 2025 Puzzle 01

[Puzzle link](https://adventofcode.com/2025/day/1)

## Part one

Part one of this problem is about finding all numbers within a sequence of ranges of integers that consist entirely of a repeated sequence, ignoring all leading zeroes. So numbers like `11` or `12,341,234`.

It's pretty easy to find all numbers that match that pattern - just count normally and then double the string. So if we can do that correctly around the start and end points of each range, then we've got our numbers.

At the end there's a final step of adding up all the numbers we found that match this pattern.

And as always there's also the minor logistical challenge of parsing the input file.

Actually converting that algorithm into code took a little more than expected though. By the end of it, things seemed clear that just iterating over every integer within a range would take a lot less code.

The method I've come with requires checking far fewer numbers, but given the Performance API reported that the solution was found in less than a millisecond perhaps I shouldn't have been so concerned with performance at the outset.

For my input, the correct solution to part one was **22062284697**.

## Part two

TODO

For my input, the solution to part two was **TODO**.

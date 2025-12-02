# 2025 Puzzle 01

[Puzzle link](https://adventofcode.com/2025/day/1)

## Part one

Part one of this problem is about finding all numbers within a sequence of ranges of integers that consist entirely of a repeated sequence, ignoring all leading zeroes. So numbers like `11` or `12,341,234`.

It's pretty easy to find all numbers that match that pattern - just count normally and then double the string. So if we can do that correctly around the start and end points of each range, then we've got our numbers.

At the end there's a final step of adding up all the numbers we found that match this pattern.

And as always there's also the minor logistical challenge of parsing the input file.

Actually converting that algorithm into code took a little more than expected though. By the end of it, things seemed clear that just iterating over every integer within a range would take a lot less code.

The method I've come with requires checking far fewer numbers, but given the Performance API reported that the solution was found in less than a millisecond perhaps I shouldn't have been so concerned with performance at the outset.

For my input, the correct solution to part one was **22,062,284,697**.

## Part two

Sure enough, my premature optimisation meant my code for solving part one was no longer going to be useful for part two. Invalid IDs are no longer just sequences of digits repeated twice, but instead sequences repeated any number of times.

If I wanted to do the same sort of optimisation again, then I'd be doing prime factorisation to figure out how many different ways each number could be split. That sounds like a bad time, so instead this time I'll try actually checking every number manually. It probably won't be that slow anyway, given how fast the solution to part one took to run.

Okay, yeah. That was much faster to write. Closer to 10 minutes than an hour for part one. It obviously ran quite a bit slower, but took less than a second overall according to the Performance API.

If the input were orders of magnitude larger then perhaps performance enhancements of the sort I tried before might be worth it. But that optimisation was difficult to scale, and the input is _not_ orders of magnitude larger.

For my input, the solution to part two was **46,666,175,279**.

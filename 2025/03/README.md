# 2025 Puzzle 03

[Puzzle link](https://adventofcode.com/2025/day/3)

## Part one

This puzzle gives us a large number of digit strings and, for each one, asks us to construct the largest two digit number we can by highlighting two digits with it. This largest two digit number is called the "**Joltage**" of the battery bank represented by the digit string.

For example, take the digit string "34218121". The largest two digit number we can construct here would be found by highlighting "3421**8**1**2**1". Even though the digits "3" and "4" are also present, we can't rearrange digits within one of these strings.

Thankfully, this puzzle is solved easily enough by just splitting it into the tens and ones column. First, find the highest digit available in the string. Then, take the substring following the first instance of that digit, and find the highest digit available in that substring. Then combine them.

For my input, the correct solution to part one was **17,244**.

## Part two

TODO

For my input, the solution to part two was **TODO**.

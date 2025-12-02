# 2015 Puzzle 01

[Puzzle link](https://adventofcode.com/2015/day/1)

## Part one

This is a pretty simple maths problem, coupled with a pretty simple logistics problem.

First, parse the input file, and convert each line into a trio of numbers.

Then, multiple each pair within the trio, and also determine which is the smallest. Then combine those numbers to get the final result.

Finally, add the result for each line.

For my input, the correct solution to part one was **1,586,300**.

## Part two

The second part is just doing a couple more simple calculations. Volume is the product of the trio of numbers on each line, and the minimum perimeter is the smallest sum of any two of them, doubled. I saved the doubling until after I found the minimum since it doesn't affect the comparison.

For my input, the solution to part two was **3,737,498**.

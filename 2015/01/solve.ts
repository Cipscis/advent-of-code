/**
 * @file
 * @see {@link https://adventofcode.com/2015/day/1 Day 01 - Advent of Code 2015}
 */

interface Solution {
	finalFloor: number;
}

/**
 * Provide a solution to part one of the puzzle.
 */
export function solve(rawInput: string): Solution {
	let floor = 0;

	for (const char of rawInput) {
		if (char === '(') {
			floor += 1;
		} else if (char === ')') {
			floor -= 1;
		} else {
			throw new Error(`Unrecognised character '${char}'`);
		}
	}

	return {
		finalFloor: floor,
	};
}
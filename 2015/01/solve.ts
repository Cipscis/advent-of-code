/**
 * @file
 * @see {@link https://adventofcode.com/2015/day/1 Day 01 - Advent of Code 2015}
 */

interface Solution {
	finalFloor: number;
	firstBasementIndex: number | null;
}

/**
 * Provide a solution to part one of the puzzle.
 */
export function solve(rawInput: string): Solution {
	let floor = 0;
	let firstBasementIndex: number | null = null;

	rawInput.split('').forEach((char, index) => {
		if (char === '(') {
			floor += 1;
		} else if (char === ')') {
			floor -= 1;

			if (firstBasementIndex === null) {
				if (floor < 0) {
					// Add 1 to convert from 0-based to 1-based
					firstBasementIndex = index + 1;
				}
			}
		} else {
			throw new Error(`Unrecognised character '${char}'`);
		}
	});

	return {
		finalFloor: floor,
		firstBasementIndex,
	};
}
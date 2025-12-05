/**
 * @file
 * @see {@link https://adventofcode.com/2025/day/5 Day 05 - Advent of Code 2025}
 */

import type { Input } from './parseInput.ts';

/**
 * Solve part one of this day's puzzle.
 */
export function solvePartOne({
	freshRanges,
	availableIngredientIds,
}: Input): number {
	let count = 0;

	for (const ingredient of availableIngredientIds) {
		if (freshRanges.some((range) => range.within(ingredient))) {
			count += 1;
		}
	}

	return count;
}
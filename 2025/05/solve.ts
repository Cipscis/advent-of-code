/**
 * @file
 * @see {@link https://adventofcode.com/2025/day/5 Day 05 - Advent of Code 2025}
 */

import type { Input } from './parseInput.ts';
import { Range } from './Range.ts';

/**
 * Solve part one of this day's puzzle.
 */
export function solvePartOne({
	freshRanges,
	availableIngredientIds,
}: Input): number {
	let count = 0;

	for (const ingredient of availableIngredientIds) {
		if (freshRanges.some((range) => range.includes(ingredient))) {
			count += 1;
		}
	}

	return count;
}

/**
 * Solve part two of this day's puzzle.
 */
export function solvePartTwo({ freshRanges }: Input): number {
	const combinedRanges = combineRangesIterative(freshRanges);

	let totalLength = 0;
	for (const range of combinedRanges) {
		totalLength += range.length;
	}

	return totalLength;
}

/**
 * Iteratively combines ranges until there are no more to combine.
 */
function combineRangesIterative(ranges: readonly Range[]): Range[] {
	let prevNumRanges = ranges.length;
	let combinedRanges: Range[] = Array.from(ranges);

	let numCombined = Infinity;
	while (numCombined > 0) {
		combinedRanges = combineRanges(combinedRanges);

		numCombined = prevNumRanges - combinedRanges.length;
		prevNumRanges = combinedRanges.length;
	}

	return combinedRanges;
}

/**
 * Performs a single pass over an array of ranges, and combines those combinations it finds that are overlapping.
 */
function combineRanges(ranges: readonly Range[]): Range[] {
	let combinedRanges: Range[] = [];
	let combinedRangeIndices: number[] = [];

	ranges.forEach((rangeA, i) => {
		if (combinedRangeIndices.includes(i)) {
			// We've already combined this range
			return;
		}

		let combined = false;
		for (let j = i+1; j < ranges.length; j++) {
			if (combinedRangeIndices.includes(j)) {
				// We've already combined this range
				continue;
			}

			const rangeB = ranges[j];
			try {
				const combinedRange = Range.combine(rangeA, rangeB);
				combinedRanges.push(combinedRange);
				combinedRangeIndices.push(j);
				combined = true;
			} catch (e) {
				// If we couldn't combine the ranges, do nothing
			}
		}

		if (!combined) {
			combinedRanges.push(rangeA);
		}
	});

	return combinedRanges;
}

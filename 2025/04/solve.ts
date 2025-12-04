/**
 * @file
 * @see {@link https://adventofcode.com/2025/day/4 Day 04 - Advent of Code 2025}
 */

import { Grid } from './Grid.ts';
import { CellValue } from './CellValue.ts';
import { Cursor } from './Cursor.ts';

interface Solution {
	movableRollCount: number;
}

/**
 * Solve this day's puzzle.
 */
export function solve(input: Grid<CellValue>): Solution {
	let movableRollCount = 0;

	input.walk((cursor) => {
		// Ignore empty rows
		if (cursor.value === CellValue.EMPTY) {
			return;
		}

		const neighbours = cursor.getNeighbours();
		const neighbourCount = neighbours.filter((value) => value === CellValue.ROLL).length;

		if (neighbourCount < 4) {
			movableRollCount += 1;
		}
	});

	return {
		movableRollCount,
	};
}
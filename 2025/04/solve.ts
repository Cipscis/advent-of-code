/**
 * @file
 * @see {@link https://adventofcode.com/2025/day/4 Day 04 - Advent of Code 2025}
 */

import { Grid, type GridPosition } from '../../util/Grid.ts';
import { CellValue } from './CellValue.ts';
import type { Cursor } from '../../util/Cursor.ts';

/**
 * Solve part one of this day's puzzle.
 */
export function solvePartOne(input: Grid<CellValue>): number {
	let movableRollCount = 0;

	input.walk((cursor) => {
		if (cellIsRemovable(cursor)) {
			movableRollCount += 1;
		}
	});

	return movableRollCount;
}

export function solvePartTwo(input: Grid<CellValue>): number {
	let stopFlag = false;
	let totalRemovedCount = 0;

	while (!stopFlag) {
		let cellsRemoved = 0;
		input.update((cursor) => {
			const isRemovable = cellIsRemovable(cursor);
			if (!isRemovable) { return cursor.value; }

			cellsRemoved += 1;
			totalRemovedCount += 1;
			return CellValue.EMPTY;
		});

		if (cellsRemoved === 0) {
			stopFlag = true;
		}
	}

	return totalRemovedCount;
}

function cellIsRemovable(cursor: Cursor<CellValue>): boolean {
	// Ignore empty rows
	if (cursor.value === CellValue.EMPTY) {
		return false;
	}

	const neighbours = cursor.getNeighbours();
	const neighbourCount = neighbours.filter((value) => value === CellValue.ROLL).length;

	return neighbourCount < 4;
}
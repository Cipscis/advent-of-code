/**
 * @file
 * @see {@link https://adventofcode.com/2025/day/4 Day 04 - Advent of Code 2025}
 */

import { Grid, type GridPosition } from './Grid.ts';
import { CellValue } from './CellValue.ts';
import type { Cursor } from './Cursor.ts';

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
	let removedCount = 0;

	while (!stopFlag) {
		let positionsToRemove: GridPosition[] = [];

		// First, collect all positions to remove
		input.walk((cursor) => {
			if (cellIsRemovable(cursor)) {
				positionsToRemove.push(cursor.position);
			}
		});

		// Then, update the values at each of those positions
		for (const position of positionsToRemove) {
			input.setValueAt(position, CellValue.EMPTY);
			removedCount += 1;
		}

		if (positionsToRemove.length === 0) {
			stopFlag = true;
		}
	}

	return removedCount;
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
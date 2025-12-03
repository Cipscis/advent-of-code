/**
 * @file
 * @see {@link https://adventofcode.com/2015/day/3 Day 03 - Advent of Code 2015}
 */

import { Direction } from './directions.ts';
import {
	navigate,
	serialiseCoords,
	type Coords,
	type CoordsString,
} from './navigation.ts';

interface Solution {
	numHousesSantaVisited: number;
	numHousesVisitedTotal: number;
}

/**
 * Solve this day's puzzle.
 */
export function solve(input: Direction[]): Solution {
	let positionASolo: Coords = [0, 0];

	let positionA: Coords = [0, 0];
	let positionB: Coords = [0, 0];

	// Doing two grids for the different parts for each count. I could do one, with both counts encoded in the key, but this is easier
	const santaGrid = new Map<CoordsString, number>([
		[serialiseCoords(positionASolo), 0],
	]);
	const sharedGrid = new Map<CoordsString, number>([
		[serialiseCoords(positionA), 0],
	]);

	// Follow all instructions, keeping count of each position visited
	let navigateB = false;
	for (const instruction of input) {
		// "Santa" navigation on unshared grid to keep part one solution
		positionASolo = processGridNavigation(
			santaGrid,
			positionASolo,
			instruction,
		);

		if (navigateB) {
			// "RoboSanta" navigation
			positionB = processGridNavigation(
				sharedGrid,
				positionB,
				instruction,
			);
		} else {
			// Also navigate "Santa" on the shared grid
			positionA = processGridNavigation(
				sharedGrid,
				positionA,
				instruction,
			);
		}
		navigateB = !navigateB;
	}

	const numHousesSantaVisited = Array.from(santaGrid.entries()).length;
	const numHousesVisitedTotal = Array.from(sharedGrid.entries()).length;

	return {
		numHousesSantaVisited,
		numHousesVisitedTotal,
	};
}

/**
 * Convert an initial {@linkcode Coords} to an updated one, based on a {@linkcode Direction}, and increment position visit counts in a specific grid.
 */
function processGridNavigation(
	grid: Map<CoordsString, number>,
	position: Coords,
	instruction: Direction,
): Coords {
	const newPosition = navigate(position, instruction);
	const serialisedNewPosition = serialiseCoords(newPosition);

	const thisPositionCount = grid.get(serialisedNewPosition);

	if (typeof thisPositionCount === 'undefined') {
		grid.set(serialisedNewPosition, 1);
	} else {
		grid.set(serialisedNewPosition, thisPositionCount+1);
	}

	return newPosition;
}

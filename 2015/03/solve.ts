/**
 * @file
 * @see {@link https://adventofcode.com/2015/day/3 Day 03 - Advent of Code 2015}
 */

interface Solution {
	numHousesVisited: number;
}

type Coords = readonly [x: number, y: number];
type CoordsString = `${number},${number}`;

/**
 * Solve this day's puzzle.
 */
export function solve(input: string[]): Solution {
	let numHousesVisited = 1;

	let position: Coords = [0, 0];
	const grid = new Map<CoordsString, number>([
		[serialiseCoords(position), 0],
	]);

	// Follow all instructions, keeping count of each position visited
	for (const instruction of input) {
		position = navigate(position, instruction);
		const serialisedPosition = serialiseCoords(position);

		const thisPositionCount = grid.get(serialisedPosition);
		if (typeof thisPositionCount === 'undefined') {
			grid.set(serialisedPosition, 1);
			numHousesVisited += 1;
		} else {
			grid.set(serialisedPosition, thisPositionCount+1);
		}
	}

	return {
		numHousesVisited,
	};
}

/**
 * Convert a numeric pair of coordinates into a {@linkcode CoordsString} string that can be used as a {@linkcode Map} key.
 *
 * @see {@linkcode deserialiseCoords} for the reverse operation.
 */
function serialiseCoords([x, y]: Coords): CoordsString {
	return `${x},${y}`;
}

/**
 * Convert a serialised {@linkcode CoordsString} string into its original numeric pair.
 *
 * **WARNING**: Does not contain error-checking code. Make sure it's passed a valid {@linkcode CoordsString} string or you will get garbage out.
 *
 * @see {@linkcode deserialiseCoords} for reverse operation.
 */
function deserialiseCoords(coords: CoordsString): Coords {
	const [x, y] = coords.split(',').map((value) => Number(value));
	return [x, y];
}

function navigate([x, y]: Coords, direction: string): Coords {
	switch (direction) {
		case '^':
			return [x, y+1];
		case '>':
			return [x+1, y];
		case 'v':
			return [x, y-1];
		case '<':
			return [x-1, y];
		default:
			throw new Error(`Unrecognised direction '${direction}'`);
	}
}

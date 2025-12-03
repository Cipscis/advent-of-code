import { Direction } from './directions.ts';

/**
 * A pair of integers representing a coordinate position in an infinite grid.
 *
 * Using {@linkcode Direction} terminology, East means increasing `x` and North means increasing `y`.
 */
export type Coords = readonly [x: number, y: number];

/**
 * A serialised form of {@linkcode}, usable as a {@linkcode Map} key.
 */
export type CoordsString = `${number},${number}`;

/**
 * Convert a numeric pair of coordinates into a {@linkcode CoordsString} string that can be used as a {@linkcode Map} key.
 *
 * @see {@linkcode deserialiseCoords} for the reverse operation.
 */
export function serialiseCoords([x, y]: Coords): CoordsString {
	return `${x},${y}`;
}

/**
 * Convert a serialised {@linkcode CoordsString} string into its original numeric pair.
 *
 * **WARNING**: Does not contain error-checking code. Make sure it's passed a valid {@linkcode CoordsString} string or you will get garbage out.
 *
 * @see {@linkcode deserialiseCoords} for reverse operation.
 */
export function deserialiseCoords(coords: CoordsString): Coords {
	const [x, y] = coords.split(',').map((value) => Number(value));
	return [x, y];
}

/**
 * Convert one {@linkcode Coords} to an updated one, based on a {@linkcode Direction}.
 */
export function navigate([x, y]: Coords, direction: Direction): Coords {
	switch (direction) {
		case Direction.NORTH:
			return [x, y+1];
		case Direction.EAST:
			return [x+1, y];
		case Direction.SOUTH:
			return [x, y-1];
		case Direction.WEST:
			return [x-1, y];
	}
}
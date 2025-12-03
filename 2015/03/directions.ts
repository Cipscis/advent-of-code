export const Direction = {
	NORTH: '^',
	EAST: '>',
	SOUTH: 'v',
	WEST: '<',
} as const;
export type Direction = typeof Direction[keyof typeof Direction];

/**
 * Checks that a string is a valid {@linkcode Direction}.
 */
export function isDirection(str: string): str is Direction {
	return ([
		Direction.NORTH,
		Direction.EAST,
		Direction.SOUTH,
		Direction.WEST,
	] as string[]).includes(str);
}

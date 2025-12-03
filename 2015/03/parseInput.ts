import { isDirection, type Direction } from './directions.ts';

/**
 * Convert this puzzle's raw input, as a string, into usable data.
 */
export function parseInput(rawInput: string): Direction[] {
	return rawInput.split('').filter(isDirection);
}
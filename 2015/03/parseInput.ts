/**
 * Convert this puzzle's raw input, as a string, into usable data.
 */
export function parseInput(rawInput: string): string[] {
	return rawInput.split('').filter(Boolean);
}
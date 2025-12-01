/**
 * @file
 * @see {@link https://adventofcode.com/2025/day/1 Day 1 - Advent of Code 2025}
 */

type Direction = 'L' | 'R';

interface Instruction {
	direction: Direction;
	length: number;
};

interface Solution {
	/** The solution to part 1. */
	zeroStopCount: number;
	/** The solution to part 2. */
	zeroPassCount: number;
}

/**
 * Convert a single line of the raw input string into an {@linkcode Instruction}.
 */
function parseInputLine(rawInputLine: string, index: number): Instruction {
	const direction = rawInputLine.at(0);
	if (direction !== 'L' && direction !== 'R') {
		throw new Error(`Unrecognised direction ${direction} on line ${index}: "${rawInputLine}".`);
	}

	const length = Number(rawInputLine.slice(1));
	if (isNaN(length)) {
		throw new Error(`Unrecognised length on line ${index}: "${rawInputLine}".`);
	}

	return { direction, length };
}

/** Convert the entire raw input string into {@linkcode Instruction}s. */
function parseInput(rawInput: string): Instruction[] {
	// Split on newlines and ignore last line (empty)
	const rawInputLines = rawInput.split('\n').slice(0, -1);
	const parsedLines = rawInputLines.map(parseInputLine);
	return parsedLines;
}

/**
 * With a given initial number, move based on a provided {@linkcode Instruction}.
 *
 * This process does not care about looping around 0/100, so can give results outside that range. Because the problem only cares about stopping on zero, this means we can just care about stopping on or passing thresholds that are multiples of 100.
 */
function processInstruction(initialNumber: number, instruction: Instruction): number {
	if (instruction.direction === 'L') {
		return initialNumber - instruction.length;
	} else if (instruction.direction === 'R') {
		return initialNumber + instruction.length;
	} else {
		throw new Error(`Unrecognised direction "${instruction.direction}"`);
	}
}

/**
 * Determine whether or not a number counts as stopped at zero.
 *
 * Used for solving part 1.
 */
function stoppedAtZero(position: number): boolean {
	return position % 100 === 0;
}

/**
 * Determine how many times moving from one number to another passes zero.
 *
 * Starting on zero doesn't count, but ending on zero does.
 *
 * Used for solving part 2.
 */
function getZeroPassCount(start: number, end: number): number {
	// We don't care about the ones or tens digits, only if we pass a threshold of 100
	const startHundreds = Math.floor(start / 100);
	const endHundreds = Math.floor(end / 100);

	// If we didn't cross a threshold, just check if we ended on zero
	if (startHundreds === endHundreds) {
		return stoppedAtZero(end) ? 1 : 0;
	}

	// Otherwise, start by counting how many hundreds apart we are
	let difference = Math.abs(startHundreds - endHundreds);

	// If we went left, count boundaries we crossed differently
	if (end < start) {
		// If we started on zero it doesn't count
		if (start % 100 === 0) {
			difference -= 1;
		}

		// If we ended on zero, count that
		if (end % 100 === 0 ) {
			difference += 1;
		}
	}

	return difference;
}

/**
 * Provide solutions to both parts of the problem.
 */
export function solve(rawInput: string): Solution {
	const input = parseInput(rawInput);

	let position = 50;

	let zeroStopCount = 0;
	let zeroPassCount = 0;

	for (const instruction of input) {
		const prevPosition = position;
		position = processInstruction(position, instruction);

		if (stoppedAtZero(position)) {
			zeroStopCount += 1;
		}

		zeroPassCount += getZeroPassCount(prevPosition, position);
	}

	return {
		zeroStopCount,
		zeroPassCount,
	};
}
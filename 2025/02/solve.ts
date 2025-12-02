/**
 * @file
 *
 * Functions in this file refer to "invalid IDs".
 *
 * For the purpose of this puzzle, a number is an invalid ID if it consists entirely of a string of digits repeated twice.
 *
 * For example, `11` or `12_341_234`.
 *
 * @see {@link https://adventofcode.com/2025/day/1 Day 01 - Advent of Code 2025}
 */

interface Solution {
	sum: number;
}

type Range = [start: number, end: number];

/**
 * Parse an input string of ranges like '1-5,23-120' into usable data.
 */
function parseInput(input: string): Range[] {
	const ranges: Range[] = [];

	const rangeStrings = input.split(',');
	for (const rangeString of rangeStrings) {
		const rangeEndStrings = rangeString.split('-');
		if (rangeEndStrings.length !== 2) {
			throw new Error(`Encountered invalid range syntax ${rangeString}`);
		}

		const range: Range = [Number(rangeEndStrings[0]), Number(rangeEndStrings[1])];
		if (isNaN(range[0]) || isNaN(range[1])) {
			throw new Error(`Encountered invalid range ${rangeString}`);
		}

		ranges.push(range);
	}

	return ranges;
}

/**
 * Find all "invalid ID" numbers within a range.
 */
function getInvalidIds(range: Range): number[] {
	// Start by finding the first and last invalid IDs in a range
	const startDoubled = getNextInvalidId(range[0]);
	if (startDoubled > range[1]) {
		return [];
	}
	const endDoubled = getPreviousInvalidId(range[1]);
	if (endDoubled < range[0]) {
		return [];
	}

	// Cut those first and last invalid IDs in half
	const start = getFirstHalfDigits(startDoubled);
	const end = getFirstHalfDigits(endDoubled);

	// Turn that into an array of integers
	const intRange = getIntRange(start, end);
	// Turn every integer in that range into an invalid ID
	const invalidIds = intRange.map(doubleDigits);

	return invalidIds;
}

/**
 * Construct an array of integers from `start` to `end`.
 *
 * Both `start` and `end` must be integers, and `start` must be no larger than `end`.
 */
function getIntRange(start: number, end: number): number[] {
	if (!Number.isInteger(start)) {
		throw new Error(`Param \`start\` must be an integer. Received ${start}`);
	}

	if (!Number.isInteger(end)) {
		throw new Error(`Param \`end\` must be an integer. Received ${end}`);
	}

	if (start > end) {
		throw new Error(`Param \`start\` was larger than \`end\`. Received ${start} and ${end}`);
	}

	const length = end - start + 1;
	const intRange = Array.from({ length }).map((_value, index) => start + index);

	return intRange;
}

/**
 * For a given integer with an even number of digits, return the first half.
 */
function getFirstHalfDigits(number: number): number {
	if (!Number.isInteger(number)) {
		throw new Error(`Encountered non-integer ${number}`);
	}

	const strNum = String(number);
	const length = strNum.length;

	if (length % 2 === 1) {
		throw new Error(`Encountered number with odd number of digits ${number}`);
	}

	const firstHalf = strNum.slice(0, length / 2);

	return Number(firstHalf);
}

/**
 * Convert a number into another number that consists of its digits doubled.
 *
 * For example, `23` becomes `2323`.
 */
function doubleDigits(number: number): number {
	const strNum = String(number);
	return Number(`${strNum}${strNum}`);
}

/**
 * For a given number, find the next number that counts as an "invalid ID".
 *
 * If the specified number is itself invalid, return it.
 */
function getNextInvalidId(number: number): number {
	const firstHalf = (() => {
		try {
			return getFirstHalfDigits(number);
		} catch (e) {
			// Assume the number has an odd number of digits
			// Construct the next largest power of 10
			return getFirstHalfDigits(Number(
				`1${Array.from(String(number)).fill('0').join('')}`
			));
		}
	})();
	const doubledNum = doubleDigits(firstHalf);

	if (doubledNum >= number) {
		return doubledNum;
	}
	return doubleDigits(firstHalf + 1);
}

/**
 * For a given number, find the previous number that counts as an "invalid ID".
 *
 * If the specified number is itself invalid, return it.
 */
function getPreviousInvalidId(number: number): number {
	const firstHalf = (() => {
		try {
			return getFirstHalfDigits(number);
		} catch (e) {
			// Assume the number has an odd number of digits
			// Construct the next smallest sequence of all 9s
			return getFirstHalfDigits(Number(
				Array.from(String(number)).slice(1).fill('9').join('')
			));
		}
	})();
	const doubledNum = doubleDigits(firstHalf);

	if (doubledNum <= number) {
		return doubledNum;
	}
	return doubleDigits(firstHalf - 1);
}

/**
 * Calculate the sum of an array of numbers.
 */
function getSum(...array: number[]): number {
	let sum = 0;
	for (const number of array) {
		sum += number;
	}
	return sum;
}

/**
 * Provide a solution to part one of the puzzle.
 */
export function solve(rawInput: string): Solution {
	let sum = 0;

	const ranges = parseInput(rawInput);

	for (const range of ranges) {
		const invalidIdsInRange = getInvalidIds(range);
		const invalidIdSum = getSum(...invalidIdsInRange);
		sum += invalidIdSum;
	}

	return {
		sum,
	};
}
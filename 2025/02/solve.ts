/**
 * @file
 *
 * Functions in this file refer to "invalid IDs".
 *
 * For the purpose of part one of this puzzle, a number is an invalid ID if it consists entirely of a string of digits repeated twice.
 *
 * For part two, invalid IDs are numbers that consist entirely of a string of digits repeated twice **or more**.
 *
 * For example, `11` `12_341_234`, or `121_212`.
 *
 * @see {@link https://adventofcode.com/2025/day/1 Day 01 - Advent of Code 2025}
 */

interface Solution {
	/** Solution to part one. */
	sumOne: number;
	/** Solution to part two. */
	sumTwo: number;
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
 * Find all "invalid ID" numbers within a range, according to part one rules.
 */
function getInvalidIdsOne(range: Range): number[] {
	const intRange = getIntRange(range[0], range[1]);
	const invalidIds = intRange.filter(isInvalidIdOne);

	return invalidIds;
}

/**
 * Find all "invalid ID" numbers within a range, according to part two rules.
 */
function getInvalidIdsTwo(range: Range): number[] {
	const intRange = getIntRange(range[0], range[1]);
	const invalidIds = intRange.filter(isInvalidIdTwo);

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
 * Checks if a number counts as an invalid ID, according to part one rules.
 */
function isInvalidIdOne(number: number): boolean {
	const strNum = String(number);
	const length = strNum.length;

	const numDigits = length / 2;

	if (length % numDigits !== 0) {
		// Skip substring lengths that couldn't repeat to make the whole number
		return false;
	}

	const subStr = strNum.slice(0, numDigits);
	const fitTimes = length / numDigits;
	// Repeat the string the appropriate number of times to match the number's length
	const compareStr = new Array(fitTimes).fill(subStr).join('');

	if (compareStr === strNum) {
		return true;
	}

	return false;
}

/**
 * Checks if a number counts as an invalid ID, according to part two rules.
 */
function isInvalidIdTwo(number: number): boolean {
	const strNum = String(number);
	const length = strNum.length;

	for (let numDigits = 0; numDigits < length; numDigits++) {
		if (length % numDigits !== 0) {
			// Skip substring lengths that couldn't repeat to make the whole number
			continue;
		}

		const subStr = strNum.slice(0, numDigits);
		const fitTimes = length / numDigits;
		// Repeat the string the appropriate number of times to match the number's length
		const compareStr = new Array(fitTimes).fill(subStr).join('');

		if (compareStr === strNum) {
			return true;
		}
	}

	return false;
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
	let sumOne = 0;
	let sumTwo = 0;

	const ranges = parseInput(rawInput);

	for (const range of ranges) {
		const invalidIdsOneInRange = getInvalidIdsOne(range);
		const invalidIdOneSum = getSum(...invalidIdsOneInRange);
		sumOne += invalidIdOneSum;

		const invalidIdsTwoInRange = getInvalidIdsTwo(range);
		const invalidIdTwoSum = getSum(...invalidIdsTwoInRange);
		sumTwo += invalidIdTwoSum;
	}

	return {
		sumOne,
		sumTwo,
	};
}
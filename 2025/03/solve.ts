/**
 * @file
 * @see {@link https://adventofcode.com/2025/day/3 Day 03 - Advent of Code 2025}
 */

import type { BatteryBank } from './BatteryBank.ts';

interface Solution {
	totalSmallJoltage: number;
	totalLargeJoltage: number;
}

/**
 * Provide a solution to part one of the puzzle.
 */
export function solve(batteryBanks: BatteryBank[]): Solution {
	let totalSmallJoltage = 0;
	let totalLargeJoltage = 0;

	for (const bank of batteryBanks) {
		const maxSmallJoltage = getMaxJoltage(bank, 2);
		totalSmallJoltage += maxSmallJoltage;

		const maxLargeJoltage = getMaxJoltage(bank, 12);
		totalLargeJoltage += maxLargeJoltage;
	}

	return {
		totalSmallJoltage,
		totalLargeJoltage,
	};
}

/**
 * @see [README.md](README.md) for a description of "joltage".
 */
export function getMaxJoltage(bank: BatteryBank, joltageLength = 2): number {
	if (!Number.isInteger(joltageLength)) {
		throw new TypeError(`Expected an integer for \`joltageLength\`. Received ${joltageLength}`);
	}

	if (joltageLength < 1) {
		return 0;
	}

	if (joltageLength > bank.length) {
		throw new Error(`Insufficient space remains to search bank ${bank.join('')} for joltage of length ${joltageLength}`);
	}

	// Ensure enough space remains to search for all remaining digits
	const searchableBank = joltageLength === 1
		? bank
		: bank.slice(0, 1-joltageLength);

	// Find the highest digit with enough space remaining
	const maxDigit = Math.max(...searchableBank);
	const maxDigitIndex = bank.indexOf(maxDigit);
	const maxDigitContribution = Math.pow(10, joltageLength-1) * maxDigit;

	// Recurse down to find the remaining joltage
	const remainingJoltage = getMaxJoltage(bank.slice(maxDigitIndex+1), joltageLength-1);

	return maxDigitContribution + remainingJoltage;
}

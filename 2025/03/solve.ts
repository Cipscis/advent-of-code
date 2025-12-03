/**
 * @file
 * @see {@link https://adventofcode.com/2025/day/3 Day 03 - Advent of Code 2025}
 */

import type { BatteryBank } from './BatteryBank.ts';

interface Solution {
	totalJoltage: number;
}

/**
 * Provide a solution to part one of the puzzle.
 */
export function solve(batteryBanks: BatteryBank[]): Solution {
	let totalJoltage = 0;
	for (const bank of batteryBanks) {
		const maxJoltage = getMaxJoltage(bank);
		totalJoltage += maxJoltage;
	}

	return {
		totalJoltage,
	};
}

/**
 * @see [README.md](README.md) for a description of "joltage".
 */
export function getMaxJoltage(bank: BatteryBank): number {
	// First, get the largest digit in the bank, excluding the last digit
	const maxDigit = Math.max(...bank.slice(0, -1));
	const maxDigitIndex = bank.indexOf(maxDigit);

	// Then, get the largest digit in what's left after it
	const remainder = bank.slice(maxDigitIndex + 1);
	const maxDigitRemaining = Math.max(...remainder);

	return maxDigit * 10 + maxDigitRemaining;
}

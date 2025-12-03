import type { BatteryBank } from './BatteryBank.ts';

/**
 * Convert this puzzle's raw input, as a string, into usable data.
 */
export function parseInput(rawInput: string): BatteryBank[] {
	const rawBanks = rawInput.split('\r\n');
	const banks: BatteryBank[] = [];

	for (const rawBank of rawBanks) {
		if (!rawBank.trim()) { continue; }

		const rawBatteries = rawBank.trim().split('');
		const batteries = rawBatteries.map((value) => parseInt(value, 10))
		banks.push(batteries);
	}

	return banks;
}
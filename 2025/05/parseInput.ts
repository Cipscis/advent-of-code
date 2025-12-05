import { Range } from './Range.ts';

export interface Input {
	freshRanges: readonly Range[];
	availableIngredientIds: readonly number[];
}

/**
 * Convert this puzzle's raw input, as a string, into usable data.
 */
export function parseInput(rawInput: string): Input {
	const lines = rawInput.split('\n').map((line) => line.trim());

	const freshRanges: Range[] = [];
	const availableIngredientIds: number[] = [];

	let part: keyof Input = 'freshRanges';
	for (const line of lines) {
		if (part === 'freshRanges') {
			if (!line) {
				part = 'availableIngredientIds';
				continue;
			}

			const [min, max] = line.split('-').map((part) => Number(part));
			const range = new Range({ min, max });
			freshRanges.push(range);
		} else {
			if (!line) {
				continue;
			}

			const ingredientId = Number(line);
			availableIngredientIds.push(ingredientId);
		}
	}

	return {
		freshRanges,
		availableIngredientIds,
	};
}
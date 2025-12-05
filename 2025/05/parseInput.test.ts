import { describe, test } from 'node:test';
import { strict as assert } from 'node:assert';

import { parseInput } from './parseInput.ts';

describe('parseInput', () => {
	test('correctly parses input', () => {
		const result = parseInput(`3-5
10-14
16-20
12-18

1
5
8
11
17
32`);

		assert.deepEqual(
			result.freshRanges.map((range) => [range.min, range.max]),
			[[3, 5], [10, 14], [16, 20], [12, 18]]
		);
		assert.deepEqual(
			result.availableIngredientIds,
			[1, 5, 8, 11, 17, 32]
		);
	});
});
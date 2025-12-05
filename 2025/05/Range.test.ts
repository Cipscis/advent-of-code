import { describe, test } from 'node:test';
import { strict as assert } from 'node:assert';

import { Range } from './Range.ts';

describe('Range', () => {
	test('can be created with a given min and max', () => {
		const range = new Range({ min: 0, max: 10 });

		assert.equal(range.min, 0);
		assert.equal(range.max, 10);
	});

	test('can check if a number is within its range', () => {
		const range = new Range({ min: 5, max: 10 });

		assert.equal(range.within(4), false);
		assert.equal(range.within(5), true);
		assert.equal(range.within(6), true);
		assert.equal(range.within(9), true);
		assert.equal(range.within(10), true);
		assert.equal(range.within(11), false);
	});
});
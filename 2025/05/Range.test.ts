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

		assert.equal(range.includes(4), false);
		assert.equal(range.includes(5), true);
		assert.equal(range.includes(6), true);
		assert.equal(range.includes(9), true);
		assert.equal(range.includes(10), true);
		assert.equal(range.includes(11), false);
	});

	test('can return its length', () => {
		const range = new Range({ min: 1, max: 2 });

		assert.equal(range.length, 2);
	});

	test('can check if it overlaps with another range', () => {
		const rangeA = new Range({ min: 1, max: 2 });
		const rangeB = new Range({ min: 1, max: 4 });
		const rangeC = new Range({ min: 3, max: 5 });

		assert.equal(Range.overlap(rangeA, rangeB), true);
		assert.equal(Range.overlap(rangeA, rangeC), false);
		assert.equal(Range.overlap(rangeC, rangeB), true);
	});

	test('can combine overlapping ranges', () => {
		const rangeA = new Range({ min: 1, max: 2 });
		const rangeB = new Range({ min: 1, max: 4 });
		const rangeC = new Range({ min: 3, max: 5 });

		const rangeAB = Range.combine(rangeA, rangeB);
		assert.equal(rangeAB.min, 1);
		assert.equal(rangeAB.max, 4);

		assert.throws(() => Range.combine(rangeA, rangeC));

		const rangeBC = Range.combine(rangeB, rangeC);
		assert.equal(rangeBC.min, 1);
		assert.equal(rangeBC.max, 5);

	});
});
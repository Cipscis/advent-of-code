import { describe, test } from 'node:test';
import { strict as assert } from 'node:assert';

import { Grid } from './Grid.ts';
import { Cursor } from './Cursor.ts';

describe('Grid', () => {
	test('creates a grid with specified width and height', () => {
		const grid = new Grid({
			width: 50,
			height: 100,
			initialValue: null,
		});

		assert.equal(grid.width, 50);
		assert.equal(grid.height, 100);
	});

	test('creates a grid with specified initial values', () => {
		const grid = new Grid({
			width: 2,
			height: 3,
			initialValue: ([x, y]) => `${x},${y}`,
		});

		assert.equal(grid.valueAt([0, 0]), '0,0');
		assert.equal(grid.valueAt([0, 1]), '0,1');
		assert.equal(grid.valueAt([0, 2]), '0,2');
		assert.equal(grid.valueAt([1, 0]), '1,0');
		assert.equal(grid.valueAt([1, 1]), '1,1');
		assert.equal(grid.valueAt([1, 2]), '1,2');
	});

	test('allows values to be set', () => {
		const grid = new Grid({
			width: 2,
			height: 3,
			initialValue: 0,
		});

		grid.setValueAt([0, 0], 100);
		grid.setValueAt([1, 1], 200);
		assert.equal(grid.valueAt([0, 0]), 100);
		assert.equal(grid.valueAt([1, 1]), 200);
	});

	test('correctly checks if a position is within its bounds', () => {
		const grid = new Grid({
			width: 50,
			height: 100,
			initialValue: null,
		});

		assert.equal(grid.isInBounds([49, 0]), true);
		assert.equal(grid.isInBounds([49, 99]), true);
		assert.equal(grid.isInBounds([0, 0]), true);

		assert.equal(grid.isInBounds([49, -1]), false);
		assert.equal(grid.isInBounds([50, 0]), false);
		assert.equal(grid.isInBounds([-1, 99]), false);
		assert.equal(grid.isInBounds([50, 99]), false);
		assert.equal(grid.isInBounds([49, 100]), false);
	});

	test('correctly allows asserting that a position is within its bounds', () => {
		const grid = new Grid({
			width: 50,
			height: 100,
			initialValue: null,
		});

		assert.doesNotThrow(() => grid.assertInBounds([49, 0]));
		assert.doesNotThrow(() => grid.assertInBounds([49, 99]));
		assert.doesNotThrow(() => grid.assertInBounds([0, 0]));

		assert.throws(() => grid.assertInBounds([49, -1]));
		assert.throws(() => grid.assertInBounds([50, 0]));
		assert.throws(() => grid.assertInBounds([-1, 99]));
		assert.throws(() => grid.assertInBounds([50, 99]));
		assert.throws(() => grid.assertInBounds([49, 100]));
	});

	test('can provide a cursor', () => {
		const grid = new Grid({
			width: 2,
			height: 3,
			initialValue: null,
		});

		const cursor = grid.getCursor({
			position: [1, 1],
		});

		assert.equal(cursor instanceof Cursor, true);
		assert.deepEqual(cursor.position, [1, 1]);
	});

	test('can be walked', () => {
		const grid = new Grid({
			width: 2,
			height: 3,
			initialValue: ([x, y]) => x + y,
		});

		let count = 0;
		grid.walk((cursor) => {
			count += cursor.value;
		});

		assert.equal(count, 9);
	});

	test('can be updated', () => {
		const grid = new Grid({
			width: 2,
			height: 3,
			initialValue: ([x, y]) => x*10 + y,
		});

		grid.update((cursor) => cursor.value * 2);

		let count = 0;
		grid.walk((cursor) => count += cursor.value);
		assert.equal(count, 72);
	});

	test('prints correctly', () => {
		const input = [
			['a', 'b'],
			['c', 'd'],
			['e', 'f'],
		];

		const grid = new Grid({
			width: 2,
			height: 3,
			initialValue: ([x, y]) => input[y][x],
		});

		const gridString = grid.print(',');
		assert.equal(gridString, 'a,b\nc,d\ne,f');
	});
});

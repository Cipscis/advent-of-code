import { describe, test } from 'node:test';
import { strict as assert } from 'node:assert';

import { Grid } from './Grid.ts';

describe('Cursor', () => {
	test('can read grid values', () => {
		const grid = new Grid({
			width: 2,
			height: 3,
			initialValue: ([x, y]) => `${x},${y}`,
		});

		const cursor = grid.getCursor();
		assert.equal(cursor.value, '0,0');
	});

	test('can initialise at specific positions', () => {
		const grid = new Grid({
			width: 2,
			height: 3,
			initialValue: ([x, y]) => `${x},${y}`,
		});

		const cursor = grid.getCursor({ position: [1, 1] });
		assert.equal(cursor.value, '1,1');
	});

	test('can move to relative positions', () => {
		const grid = new Grid({
			width: 2,
			height: 3,
			initialValue: ([x, y]) => `${x},${y}`,
		});

		const cursor = grid.getCursor();
		cursor.move([1, 2]);
		assert.equal(cursor.value, '1,2');
		cursor.move([-1, -1]);
		assert.equal(cursor.value, '0,1');
	});

	test('can jump to absolute positions', () => {
		const grid = new Grid({
			width: 2,
			height: 3,
			initialValue: ([x, y]) => `${x},${y}`,
		});

		const cursor = grid.getCursor();
		cursor.jump([1, 2]);
		assert.equal(cursor.value, '1,2');
	});

	test('can return its neighbours', () => {
		const grid = new Grid({
			width: 3,
			height: 3,
			initialValue: ([x, y]) => `${x},${y}`,
		});

		const cursor = grid.getCursor({ position: [1, 1] });
		const neighbours = cursor.getNeighbours();
		assert.deepEqual(neighbours, [
			'0,0', '1,0', '2,0',
			'0,1',        '2,1',
			'0,2', '1,2', '2,2',
		]);
	});

	test('throws a RangeError, if told to jump out of bounds', () => {
		const grid = new Grid({
			width: 2,
			height: 3,
			initialValue: ([x, y]) => `${x},${y}`,
		});

		const cursor = grid.getCursor();

		assert.throws(() => cursor.jump([5, 5]));
		assert.throws(() => cursor.jump([-2, 5]));
		assert.throws(() => cursor.jump([5, -3]));
		assert.throws(() => cursor.jump([-2, -5]));
	});
});

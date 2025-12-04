import { Cursor } from './Cursor.ts';

export type GridPosition = [x: number, y: number];

export interface GridOptions<T> {
	width: number;
	height: number;
	/**
	 * The default value to fill each grid cell with on construction.
	 * May be a function which converts a {@linkcode GridPosition} into an initial value.
	 */
	initialValue:
		| ((position: GridPosition) => T)
		| T;
}

export class Grid<T> {
	#width: number;
	#height: number;
	#rows: T[][];

	constructor({
		width,
		height,
		initialValue,
	}: GridOptions<T>) {
		this.#width = width;
		this.#height = height;

		this.#rows = new Array(height);
		// Construct 2D array of specified dimensions
		for (let i = 0; i < height; i++) {
			this.#rows[i] = new Array(width);
			for (let j = 0; j < width; j++) {
				// Fill each cell accroding to initialValue
				if (typeof initialValue === 'function') {
					// This type assertion is safe so long as we never make a grid of functions
					const getInitialValue = initialValue as ((position: GridPosition) => T)
					this.#rows[i][j] = getInitialValue([i, j]);
				} else {
					this.#rows[i][j] = initialValue;
				}
			}
		}
	}

	get width() { return this.#width; }
	get height() { return this.#height; }

	valueAt([x, y]: GridPosition): T {
		if (x < 0 || x >= this.#width) {
			throw new RangeError(`Cannot get value at out of bounds x position ${x} on grid with width ${this.width}`);
		}

		if (y < 0 || y >= this.#height) {
			throw new RangeError(`Cannot get value at out of bounds y position ${y} on grid with height ${this.height}`);
		}

		return this.#rows[y][x];
	}

	/**
	 * Create a cursor starting at position [0, 0] and walking across the grid like reading - moving left to right across a row and then starting at the left position of the next row - call a function for each cell.
	 */
	walk(fn: (cursor: Cursor<T>) => unknown): void {
		const cursor = new Cursor({
			grid: this,
			x: 0,
			y: 0,
		});

		while (cursor.y < this.height) {
			while (cursor.x < this.width) {
				fn(cursor);

				// Go to next cell
				cursor.move([+1, 0]);
			}
			// Go to first cell of next row
			cursor.jump([0, cursor.y+1]);
		}
	}

	get [Symbol.toStringTag]() {
		return '\n' + this.#rows
			.map((row) => row.map(
				(cell) => String(cell)
			).join(''))
			.join('\n') + '\n';
	}
}
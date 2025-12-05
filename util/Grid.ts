import { Cursor, type CursorOptions } from './Cursor.ts';

export type GridPosition = readonly [x: number, y: number];

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

/**
 * A representation of a finite 2D grid with fixed dimensions.
 *
 * For easy navigation of the grid, see {@linkcode Grid.getCursor} which provides a {@linkcode Cursor} object.
 */
export class Grid<T> {
	#width: number;
	#height: number;
	#rows: T[][];

	constructor({
		width,
		height,
		initialValue,
	}: GridOptions<T>) {
		// Assert valid options
		if (!(
			Number.isInteger(width) &&
			width > 0
		)) {
			throw new RangeError(`Grid width must be a positive integer, was ${width}`);
		}

		if (!(
			Number.isInteger(height) &&
			height > 0
		)) {
			throw new RangeError(`Grid height must be a positive integer, was ${height}`);
		}

		// Construct initial rows based on passed options
		const initialRows = new Array(height);
		for (let i = 0; i < height; i++) {
			initialRows[i] = new Array(width);
			for (let j = 0; j < width; j++) {
				// Fill each cell according to initialValue
				if (typeof initialValue === 'function') {
					// This type assertion is safe so long as we never make a grid of functions
					const getInitialValue = initialValue as ((position: GridPosition) => T)
					initialRows[i][j] = getInitialValue([j, i]);
				} else {
					initialRows[i][j] = initialValue;
				}
			}
		}

		// Set properties
		this.#width = width;
		this.#height = height;
		this.#rows = initialRows;
	}

	get width() { return this.#width; }
	get height() { return this.#height; }

	/**
	 * @returns whether or not the specified position is within bounds.
	 */
	isInBounds([x, y]: GridPosition): boolean {
		if (x < 0 || x >= this.#width) {
			return false;
		}

		if (y < 0 || y >= this.#height) {
			return false;
		}

		return true;
	}

	/**
	 * @throws {RangeError} if specified position is out of bounds.
	 */
	assertInBounds([x, y]: GridPosition): void {
		if (!this.isInBounds([x, y])) {
			throw new RangeError(`Cannot get value at out of bounds position ${x}, ${y} on grid with dimensions ${this.width}, ${this.height}`);
		}
	}

	/**
	 * Get a {@linkcode Cursor}
	 *
	 * @param [position] The starting position of the cursor.
	 */
	getCursor(options?: Omit<CursorOptions<T>, "grid">): Cursor<T> {
		const cursor = new Cursor<T>({
			grid: this,
			...options,
		});

		return cursor;
	}

	/**
	 * Read the value of the grid cell at a specified {@linkcode GridPosition}.
	 */
	valueAt([x, y]: GridPosition): T {
		this.assertInBounds([x, y]);

		return this.#rows[y][x];
	}

	/**
	 * Set the value of the grid cell at a specified {@linkcode GridPosition}.
	 */
	setValueAt([x, y]: GridPosition, value: T): void {
		this.assertInBounds([x, y]);

		this.#rows[y][x] = value;
	}

	/**
	 * Create an iterable iterator of all cells in the grid, each represented by a {@linkcode Cursor}.
	 *
	 * **Important note:** The same {@linkcode Cursor} is reused for the duration of the iterator, with its position being reset each time. This is usable when each entry is consumed sequentially, but using something like `Array.from(grid.cells())` would result in an array filled with the same {@linkcode Cursor} all pointing at the final cell in the grid.
	 */
	*#cells(): IterableIterator<Cursor<T>> {
		const cursor = this.getCursor();

		for (let y = 0; y < this.height; y++) {
			for (let x = 0; x < this.width; x++) {
				// Use jump instead of move in case the cursor has been moved outside this generator function
				cursor.jump([x, y]);
				yield cursor;
			}
		}
	}

	/**
	 * Create a {@linkcode Cursor} starting at position [0, 0] and walk across the grid like reading - moving left to right across a row and then starting at the left position of the next row - calling a function for each cell.
	 */
	walk(fn: (cursor: Cursor<T>) => void): void {
		for (const cell of this.#cells()) {
			fn(cell);
		}
	}

	/**
	 * Construct a new value for each cell in the grid, then override the current values all at once.
	 *
	 * @param updateCell A function to run over every cell, returning the value the cell should have after updating.
	 */
	update(updateCell: (cursor: Cursor<T>) => T): void {
		// Construct a 2D array with empty cells to fill with new values
		const newValues: T[][] = new Array(this.height);
		for (let i = 0; i < this.height; i++) {
			newValues[i] = new Array(this.width);
		}

		// Fill those cells based on the grid's current cell values at the same positions
		for (const cell of this.#cells()) {
			newValues[cell.y][cell.x] = updateCell(cell);
		};

		// Override all cell values at once
		this.#rows = newValues;
	}

	/**
	 * Convert the grid into a string.
	 *
	 * @param [separator] An optional separator string to include between cells.
	 */
	print(separator: string = ''): string {
		return this.#rows
			.map((row) => row.map(
				(cell) => String(cell)
			).join(separator))
			.join('\n');
	}

	get [Symbol.toStringTag]() { return 'grid'; }
}

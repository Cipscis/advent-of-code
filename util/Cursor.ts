import type { Grid, GridPosition } from './Grid.ts';

export interface CursorOptions<T> {
	grid: Grid<T>;
	position?: GridPosition;
}

const defaultOptions = {
	position: [0, 0] as GridPosition,
};

/**
 * A movable window into a {@linkcode Grid} that views one cell at a time. Can be used for easy navigation of the grid.
 */
export class Cursor<T> {
	#grid: Grid<T>;
	#position: GridPosition;

	constructor(options: CursorOptions<T>) {
		const {
			grid,
			position,
		} = {
			...defaultOptions,
			...options,
		};

		this.#grid = grid;
		this.#position = position;
	}

	get x() { return this.#position[0]; }
	get y() { return this.#position[1]; }
	get position(): GridPosition { return [...this.#position]; }

	get value() { return this.#grid.valueAt(this.#position); }

	/**
	 * Jump to a new absolute grid position.
	 *
	 * @throws {RangeError} if the new position is out of range.
	 */
	jump([x, y]: GridPosition) {
		this.#grid.assertInBounds([x, y]);

		this.#position = [x, y];
	}

	/**
	 * Move by to a new grid position specified relative to the starting position.
	 *
	 * @throws {RangeError} if the new position is out of range.
	 */
	move([x, y]: GridPosition) {
		let newX = this.x + x;
		let newY = this.y + y;

		this.jump([newX, newY]);
	}

	/**
	 * Return an array of the current cursor position's neighbours. Any neighbour positions that would be out of bounds are ignored.
	 */
	getNeighbours(): T[] {
		const neighbours: T[] = [];
		for (let yRel = -1; yRel <= +1; yRel++) {
			for (let xRel = -1; xRel <= +1; xRel++) {
				if (xRel === 0 && yRel === 0) {
					// Skip the current cell
					continue;
				}

				try {
					neighbours.push(this.#grid.valueAt(
						[this.x + xRel, this.y + yRel]
					));
				} catch (e) {
					// In this case, just ignore any attempted out-of-bounds reads.
				}
			}
		}

		return neighbours;
	}
}

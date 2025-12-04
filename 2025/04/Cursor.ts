import type { Grid, GridPosition } from './Grid.ts';

export const CursorBehaviour = {
	/**
	 * A cursor that doesn't wrap treats the edge of a grid as an unpassable boundary. Attempts to move the cursor will leave it in the same position.
	 */
	NO_WRAP: 'no-wrap',
} as const;
export type CursorBehaviour = typeof CursorBehaviour[keyof typeof CursorBehaviour];

export interface CursorOptions<T> {
	grid: Grid<T>;
	x: number;
	y: number;

	/**
	 * @default CursorBehaviour.NO_WRAP
	 */
	behaviour?: CursorBehaviour;
}

const defaultOptions = {
	behaviour: CursorBehaviour.NO_WRAP,
};

export class Cursor<T> {
	#grid: Grid<T>;
	#x: number;
	#y: number;
	#behaviour: CursorBehaviour;

	constructor(options: CursorOptions<T>) {
		const {
			grid,
			x,
			y,
			behaviour,
		} = {
			...defaultOptions,
			...options,
		};

		this.#grid = grid;
		this.#x = x;
		this.#y = y;
		this.#behaviour = behaviour;
	}

	get x() { return this.#x; }
	get y() { return this.#y; }
	get position(): GridPosition { return [this.#x, this.#y]; }

	get value() { return this.#grid.valueAt([this.#x, this.#y]); }

	/**
	 * Jump to a new absolute grid position.
	 */
	jump([x, y]: GridPosition) {
		if (x < 0 || x > this.#grid.width) {
			if (this.#behaviour === CursorBehaviour.NO_WRAP) {
				throw new RangeError(`Cannot move cursor to out of bounds x position ${x} on grid with width ${this.#grid.width}`);
			}
		}
		this.#x = x;

		if (y < 0 || y > this.#grid.height) {
			if (this.#behaviour === CursorBehaviour.NO_WRAP) {
				throw new RangeError(`Cannot move cursor to out of bounds y position ${y} on grid with height ${this.#grid.height}`);
			}
		}
		this.#y = y;
	}

	/**
	 * Move by to a new grid position specified relative to the starting position.
	 */
	move([x, y]: GridPosition) {
		const newX = this.#x + x;
		const newY = this.#y + y;
		this.jump([newX, newY]);
	}

	/**
	 * Return an array of the current cursor position's neighbours.
	 */
	getNeighbours(): T[] {
		const neighbours: T[] = [];
		for (let xRel = -1; xRel <= +1; xRel++) {
			for (let yRel = -1; yRel <= +1; yRel++) {
				if (xRel === 0 && yRel === 0) {
					// Skip the current cell
					continue;
				}

				try {
					neighbours.push(this.#grid.valueAt(
						[this.#x + xRel, this.#y + yRel]
					));
				} catch (e) {
					// In this case, just ignore any attempted out-of-bounds reads.
				}
			}
		}

		return neighbours;
	}
}
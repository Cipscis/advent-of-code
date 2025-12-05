export interface RangeOptions {
	min: number;
	max: number;
}

export class Range {
	#min: number;
	#max: number;

	constructor(options: RangeOptions) {
		const {
			min,
			max,
		} = options;

		if (min > max) {
			throw new Error(`\`min\` cannot be larger than \`max\`. Received ${{ min, max }}`);
		}

		this.#min = min;
		this.#max = max;
	}

	/**
	 * Checks whether or not two ranges overlap.
	 */
	static overlap(rangeA: Range, rangeB: Range): boolean {
		return (
			rangeA.includes(rangeB.min) ||
			rangeA.includes(rangeB.max) ||
			rangeB.includes(rangeA.max) ||
			rangeB.includes(rangeA.max)
		);
	}

	/**
	 * Combines two overlapping ranges into one.
	 *
	 * @throws {RangeError} if the ranges do not overlap.
	 */
	static combine(rangeA: Range, rangeB: Range): Range {
		if (!Range.overlap(rangeA, rangeB)) {
			throw new RangeError(`Could not combine non-overlapping Ranges ${rangeA.min}-${rangeA.max} and ${rangeB.min}-${rangeB.max}`);
		}

		return new Range({
			min: Math.min(rangeA.min, rangeB.min),
			max: Math.max(rangeA.max, rangeB.max),
		});
	}

	get min() { return this.#min; }
	get max() { return this.#max; }
	get length() { return this.#max - this.#min + 1; }

	/**
	 * Checks whether or not a given number is within the bounds of a range.
	 */
	includes(value: number): boolean {
		if (value < this.#min) {
			return false;
		}
		if (value > this.#max) {
			return false;
		}

		return true;
	}
}
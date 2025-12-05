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

	get min() { return this.#min; }
	get max() { return this.#max; }

	/**
	 * Checks whether or not a given number is within the bounds of a range.
	 */
	within(value: number): boolean {
		if (value < this.#min) {
			return false;
		}
		if (value > this.#max) {
			return false;
		}

		return true;
	}
}
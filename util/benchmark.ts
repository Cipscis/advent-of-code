import { styleText } from 'node:util';

export interface BenchmarkOptions {
	/**
	 * A name to be reported in the console output.
	 */
	name?: string;
}

const defaultOptions: Required<BenchmarkOptions> = {
	name: 'fn',
};

/**
 * Executes a function and reports on how long it took to complete.
 *
 * @param fn The function to execute.
 *
 * @example
 * ```typescript
 * const input = await benchmark(
 *     () => parseInput(rawInput),
 *     { name: 'parsing raw input' }
 * );
 * // Completed parsing raw input in ABCms
 *
 * const solution = await benchmark(
 *     () => solve(input)),
 *     { name: 'solving puzzle' }
 * );
 * // Completed solving puzzle in XYZms
 * ```
 */
export async function benchmark<T>(
	fn: () => T | PromiseLike<T>,
	options?: BenchmarkOptions,
): Promise<T> {
	const {
		name,
	} = {
		...defaultOptions,
		...options,
	};
	const perfId = crypto.randomUUID();

	try {
		performance.mark(`${perfId}_start`);
		return await fn();
	} finally {
		performance.mark(`${perfId}_end`);

		const measure = performance.measure(
			`${perfId}_measure`,
			`${perfId}_start`,
			`${perfId}_end`,
		);

		const { duration } = measure;
		const formatter = new Intl.NumberFormat('en-nz');
		const displayDuration = formatter.format(duration);

		console.log(`Completed ${
			styleText(['bold'], name)
		} in ${
			styleText([duration > 500 ? 'red' : 'green'], displayDuration)
		}ms`);
	}
}

import fs from 'node:fs/promises';

import { benchmark } from '../../util/benchmark.ts';

import { solve } from './solve.ts';

const input = await fs.readFile('./test-input.txt', { encoding: 'utf8' });

const solution = await benchmark(
	() => solve(input),
	{ name: 'solving puzzle' }
);

console.log(solution);

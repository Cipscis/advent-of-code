import fs from 'node:fs/promises';

import { benchmark } from '../../util/benchmark.ts';

import { parseInput } from './parseInput.ts';
import { solve } from './solve.ts';

const rawInput = await fs.readFile('./input.txt', { encoding: 'utf8' });
const input = await benchmark(
	() => parseInput(rawInput),
	{ name: 'parsing raw input' }
);

const solution = await benchmark(
	() => solve(input),
	{ name: 'solving puzzle' }
);

console.log(solution);

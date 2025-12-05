import fs from 'node:fs/promises';

import { benchmark } from '../../util/benchmark.ts';

import { parseInput } from './parseInput.ts';
import { solvePartOne } from './solve.ts';

const rawInput = await fs.readFile('./input.txt', { encoding: 'utf8' });
const input = await benchmark(
	() => parseInput(rawInput),
	{ name: 'parsing raw input' }
);

const solution = await benchmark(
	() => solvePartOne(input),
	{ name: 'solving part one' }
);

console.log(solution);

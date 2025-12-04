import fs from 'node:fs/promises';

import { benchmark } from '../../util/benchmark.ts';

import { parseInput } from './parseInput.ts';
import { solvePartOne, solvePartTwo } from './solve.ts';

const rawInput = await fs.readFile('./input.txt', { encoding: 'utf8' });
const input = await benchmark(
	() => parseInput(rawInput),
	{ name: 'parsing raw input' }
);

console.log(await benchmark(
	() => solvePartOne(input),
	{ name: 'solving part one' }
));

console.log(await benchmark(
	() => solvePartTwo(input),
	{ name: 'solving part two' }
));

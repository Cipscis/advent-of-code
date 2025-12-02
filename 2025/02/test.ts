import fs from 'node:fs/promises';

import { solve } from './solve.ts';

const input = await fs.readFile('./test-input.txt', { encoding: 'utf8' });

const solution = solve(input);

console.log(solution);

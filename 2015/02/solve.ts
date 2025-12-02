/**
 * @file
 * @see {@link https://adventofcode.com/2015/day/1 Day 01 - Advent of Code 2015}
 */

interface Solution {
	area: number;
}

function getArea(line: string): number {
	const sideLengths = line.split('x').map((length) => Number(length));
	const faceAreas = [
		sideLengths[0] * sideLengths[1],
		sideLengths[0] * sideLengths[2],
		sideLengths[1] * sideLengths[2],
	];

	const minFaceArea = Math.min(...faceAreas);

	const totalArea =
		2*faceAreas[0] +
		2*faceAreas[1] +
		2*faceAreas[2] +
		minFaceArea;

	if (isNaN(totalArea)) {
		throw new Error(`NaN encountered. Original line: '${line}'.`);
	}

	return totalArea;
}

/**
 * Provide a solution to part one of the puzzle.
 */
export function solve(rawInput: string): Solution {
	let area = 0;

	for (const line of rawInput.split('\n')) {
		if (!line) {
			continue;
		}

		area += getArea(line);
	}

	return {
		area,
	};
}
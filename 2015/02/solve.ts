/**
 * @file
 * @see {@link https://adventofcode.com/2015/day/1 Day 01 - Advent of Code 2015}
 */

interface Solution {
	area: number;
	ribbonLength: number;
}

function parseLine(line: string): [number, number, number] {
		// The type assertion here is safe because of the following checks
		const sideLengths = line
		.split('x')
		.map(
			(length) => Number(length)
		) as [number, number, number];

		if (sideLengths.length !== 3)
		{
			throw new Error(`Encountered unexpected line length with line '${line}'`);
		}

		if (isNaN(sideLengths[0] + sideLengths[1] + sideLengths[2])) {
			throw new Error(`Encountered NaN with line '${line}'`);
		}

		return sideLengths;
}

function getArea(...sideLengths: [
	width: number,
	height: number,
	length: number,
]): number {
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

	return totalArea;
}

function getMinPerimeter(...sideLengths: [
	width: number,
	height: number,
	length: number,
]): number {
	const faceHalfPerimeters = [
		sideLengths[0] + sideLengths[1],
		sideLengths[0] + sideLengths[2],
		sideLengths[1] + sideLengths[2],
	];

	const minFaceHalfPerimeter = Math.min(...faceHalfPerimeters);

	return minFaceHalfPerimeter * 2;
}

function getVolume(...sideLengths: [
	width: number,
	height: number,
	length: number,
]): number {
	return sideLengths[0] * sideLengths[1] * sideLengths[2];
}

/**
 * Provide a solution to part one of the puzzle.
 */
export function solve(rawInput: string): Solution {
	let area = 0;
	let ribbonLength = 0;

	for (const line of rawInput.split('\n')) {
		if (!line) {
			continue;
		}

		const sideLengths = parseLine(line);

		area += getArea(...sideLengths);
		ribbonLength +=
			getMinPerimeter(...sideLengths) +
			getVolume(...sideLengths);
	}

	return {
		area,
		ribbonLength: ribbonLength,
	};
}
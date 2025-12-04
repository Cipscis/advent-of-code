import { Grid, type GridPosition } from './Grid.ts';
import { CellValue } from './CellValue.ts';

/**
 * Convert this puzzle's raw input, as a string, into usable data.
 */
export function parseInput(rawInput: string): Grid<CellValue> {
	const rows = rawInput
		// Split by newlines
		.split('\n')
		// Remove leading and trailing spaces
		.map((row) => row.trim())
		// Remove any remaining empty lines
		.filter(Boolean);

	const getInitialCellValue = ([x, y]: GridPosition): CellValue => {
		const value = rows[y][x];
		if (value === '@') {
			return CellValue.ROLL;
		} else if (value === '.') {
			return CellValue.EMPTY;
		} else {
			throw new Error(`Encountered unexpected character '${value} at position ${x}, ${y}`);
		}
	};

	const height = rows.length;
	const width = rows[0].length;

	const grid = new Grid({
		width,
		height,
		initialValue: getInitialCellValue,
	});

	return grid;
}
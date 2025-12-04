export const CellValue = {
	ROLL: '@',
	EMPTY: '.',
} as const;
export type CellValue = typeof CellValue[keyof typeof CellValue];

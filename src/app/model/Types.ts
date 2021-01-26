const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'] as const;
export type Column = typeof columns[number];
export type Row = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type Square = { column: Column; row: Row };
export type Side = 'WHITE' | 'BLACK';

export type Column = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H';
export type Row = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type Square = { column: Column; row: Row; isEmpty: boolean; piece?: Piece };
export type Side = 'WHITE' | 'BLACK';
export type Board = Square[][];
export type Piece = { id: string; side: Side };

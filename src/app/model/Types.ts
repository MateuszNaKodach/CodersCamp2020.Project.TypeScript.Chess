export enum Column {
  'A' = 1,
  'B' = 2,
  'C' = 3,
  'D' = 4,
  'E' = 5,
  'F' = 6,
  'G' = 7,
  'H' = 8,
}
export type Row = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type Square = { row: Row; column: Column; piece: Piece | null };
export type Side = 'WHITE' | 'BLACK';
export type Piece = { id: string; side: Side };

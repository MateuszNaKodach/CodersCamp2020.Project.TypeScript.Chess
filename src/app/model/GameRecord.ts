import { Piece } from './pieces/Piece';
import { Side, Square } from './Types';

export type GameRecord = {
  side: Side;
  piece: Piece;
  moveFrom: Square;
  moveTo: Square;
};

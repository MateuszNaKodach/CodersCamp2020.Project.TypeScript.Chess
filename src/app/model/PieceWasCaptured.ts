import { Piece } from './pieces/Piece';
import { Square } from './Types';

export type PieceWasCaptured = {
  eventType: 'PieceWasCaptured';
  piece: Piece;
  onSquare: Square;
};

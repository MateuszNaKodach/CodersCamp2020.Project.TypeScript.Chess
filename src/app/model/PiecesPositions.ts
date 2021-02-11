import { Piece } from './pieces/Piece';
import { Square } from './Types';

export interface PiecePositions {
  onPositionPiece(sqaure: Square): Piece | undefined;
}

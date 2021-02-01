import { Piece } from './Piece';
import { Square } from './Types';

export interface PiecePositions {
  onPositionPiece(sqaure: Square): Piece | undefined;
}

import { Piece } from './pieces';
import { Square } from './Types';

export interface PiecePositions {
  onPositionPiece(sqaure: Square): Piece | undefined;
}

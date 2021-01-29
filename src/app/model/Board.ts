import { Piece } from './Piece';
import { Square } from './Types';

export interface Board {
  onPositionPiece(sqaure: Square): Piece | undefined;
}

import { Piece } from './Piece';
import { Square } from './Types';

export interface PieceMoves {
  movePiece(squareFrom: Square, squareTo: Square): void;
}

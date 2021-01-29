import { Piece } from './Piece';
import { Square } from './Types';

export interface PieceMoves {
  movePiece(piece: Piece, squareFrom: Square, squareTo: Square): void;
}

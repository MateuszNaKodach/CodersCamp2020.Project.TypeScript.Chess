import { Board, Piece, Square } from './Types';

export interface PieceMovement {
  possibleMoves(position: Square, board: Board): Square[];
  isPositionEmpty(position: Square): boolean;
  onPositionPiece(position: Square): Piece;
}

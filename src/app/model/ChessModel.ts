import { Square, SquareWithPiece } from './Types';
import { MoveResult } from './MoveResult';

export interface ChessModel {
  readonly squaresWithPiece: SquareWithPiece;
  possibleMoves(position: Square): Square[];
  move(squareFrom: Square, squareTo: Square): MoveResult[];
}

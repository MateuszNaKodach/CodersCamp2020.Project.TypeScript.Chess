import { Square, SquareWithPiece } from './Types';
import { MoveResult } from './MoveResult';
import { PawnWasPromoted } from './PawnWasPromoted';

export interface ChessModel {
  readonly squaresWithPiece: SquareWithPiece;
  possibleMoves(position: Square): Square[];
  move(squareFrom: Square, squareTo: Square): MoveResult[];
  pawnWasPromoted(chosenPiece: string): PawnWasPromoted | undefined;
}

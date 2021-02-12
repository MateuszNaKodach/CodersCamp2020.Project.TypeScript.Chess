import { Side, Square, SquareWithPiece } from './Types';
import { PieceWasMoved } from './PieceWasMoved';
import { PieceWasCaptured } from './PieceWasCaptured';

export interface ChessModel {
  readonly squaresWithPiece: SquareWithPiece;
  possibleMoves(position: Square): Square[];
  move(side: Side, squareFrom: Square, squareTo: Square): (PieceWasMoved | PieceWasCaptured)[];
}

import { Player } from './Player';
import { Square, SquareWithPiece } from './Types';
import { PieceWasMoved } from './PieceWasMoved';
import { PieceWasCaptured } from './PieceWasCaptured';

export interface ChessModel {
  readonly squaresWithPiece: SquareWithPiece;
  move(byPlayer: Player, squareFrom: Square, squareTo: Square): (PieceWasMoved | PieceWasCaptured)[];
}

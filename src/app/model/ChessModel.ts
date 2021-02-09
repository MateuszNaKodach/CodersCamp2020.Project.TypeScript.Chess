import { Player } from './Player';
import { Square } from './Types';
import { PieceWasMoved } from './PieceWasMoved';
import { PieceWasCaptured } from './PieceWasCaptured';
import { SquareWithPiece } from './Types';

export interface ChessModel {
  readonly piecesPositions: SquareWithPiece;
  move(byPlayer: Player, squareFrom: Square, squareTo: Square): (PieceWasMoved | PieceWasCaptured)[];
}

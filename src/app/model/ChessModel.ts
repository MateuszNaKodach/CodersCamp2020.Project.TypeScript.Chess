import { Player } from './Player';
import { PiecesBoardPositions, Square } from './Types';
import { PieceWasMoved } from './PieceWasMoved';
import { PieceWasCaptured } from './PieceWasCaptured';

export interface ChessModel {
  readonly piecesPositions: PiecesBoardPositions;
  // getPiecesPosition(piecesPositions: PiecesBoardPositions): void;
  move(byPlayer: Player, squareFrom: Square, squareTo: Square): (PieceWasMoved | PieceWasCaptured)[];
}

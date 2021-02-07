import { Player } from './Player';
import { PieceWasCaptured, PieceWasMoved, Square } from './Types';
import { ChessBoard } from './ChessBoard';

export interface ChessModel {
  move(byPlayer: Player, squareFrom: Square, squareTo: Square, board: ChessBoard): (PieceWasMoved | PieceWasCaptured)[];
}

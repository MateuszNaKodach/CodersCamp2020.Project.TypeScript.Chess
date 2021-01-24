import { Board } from './Board';
import { Square } from './Types';

export interface PieceMovement {
  possibleMoves(position: Square, board: Board): Square[];
}

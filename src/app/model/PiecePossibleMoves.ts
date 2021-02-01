import { PiecePositions } from './PiecesPositions';
import { Square } from './Types';

export interface PiecePossibleMoves {
  possibleMoves(position: Square, board: PiecePositions): Square[];
}

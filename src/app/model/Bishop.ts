import { PiecePositions } from './PiecesPositions';
import { Piece } from './Piece';
import { Side, Square } from './Types';
import { PiecePossibleMoves } from './PiecePossibleMoves';

export class Bishop extends Piece implements PiecePossibleMoves {
  constructor(side: Side) {
    super(side);
  }

  possibleMoves(position: Square, board: PiecePositions): Square[] {
    return [
      ...this.lineMoves(board, position, { row: -1, col: -1 }),
      ...this.lineMoves(board, position, { row: -1, col: 1 }),
      ...this.lineMoves(board, position, { row: 1, col: 1 }),
      ...this.lineMoves(board, position, { row: 1, col: -1 }),
    ];
  }
}

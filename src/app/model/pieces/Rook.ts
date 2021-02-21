import { PiecePositions } from '../PiecesPositions';
import { Piece } from './Piece';
import { PiecePossibleMoves } from '../PiecePossibleMoves';
import { Side, Square } from '../Types';

export class Rook extends Piece implements PiecePossibleMoves {
  readonly name = 'Rook';
  constructor(side: Side) {
    super(side);
  }

  possibleMoves(position: Square, board: PiecePositions): Square[] {
    return [
      ...this.lineMoves(board, position, { col: 0, row: -1 }),
      ...this.lineMoves(board, position, { col: 0, row: 1 }),
      ...this.lineMoves(board, position, { col: -1, row: 0 }),
      ...this.lineMoves(board, position, { col: 1, row: 0 }),
    ];
  }
}

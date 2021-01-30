import { Board } from './Board';
import { Piece } from './Piece';
import { PieceMovement } from './PieceMovement';
import { columns, Row, Side, Square } from './Types';

type RowDifference = 1 | -1;
const NEXT_ROW_DIFFERENCE: { WHITE: RowDifference; BLACK: RowDifference } = {
  WHITE: 1,
  BLACK: -1,
};

export class Pawn extends Piece implements PieceMovement {
  constructor(id: string, side: Side) {
    super('uselessId', side);
  }

  possibleMoves(position: Square, board: Board): Square[] {
    const aheadSquare = { column: position.column, row: (position.row + 1 * this.nextRowDifference()) as Row };
    const doubleAheadSquare = { column: position.column, row: (position.row + 2 * this.nextRowDifference()) as Row };
    const aheadMoves: Square[] = this.isOnStartingPosition(position) ? [aheadSquare, doubleAheadSquare] : [aheadSquare];
    return this.goAhead(board, aheadMoves).concat(this.goDiagonalAhead(position, board));
  }

  private goAhead(board: Board, aheadMoves: Square[]): Square[] {
    if (aheadMoves.length === 0) {
      return [];
    }
    const [nextMove, ...otherMoves] = aheadMoves;
    const isPieceOnNextSquare = board.onPositionPiece(nextMove) !== undefined;
    return isPieceOnNextSquare ? [] : [nextMove, ...this.goAhead(board, otherMoves)];
  }

  private nextRowDifference(): RowDifference {
    return NEXT_ROW_DIFFERENCE[this.side];
  }

  private isOnStartingPosition(position: Square) {
    return (position.row === 2 && this.side === 'WHITE') || (position.row === 7 && this.side === 'BLACK');
  }

  private goDiagonalAhead(position: Square, board: Board): Square[] {
    const movesToGo: Square[] = [];
    const currentColumnNumber = columns.indexOf(position.column);
    const currentRowNumber = position.row;

    const rightDiagonal: Square = {
      column: columns[currentColumnNumber + 1],
      row: (currentRowNumber + 1 * this.nextRowDifference()) as Row,
    };
    if (board.onPositionPiece(rightDiagonal) && this.checkIfOponent(rightDiagonal, board)) {
      movesToGo.push(rightDiagonal);
    }

    const leftDiagonal: Square = {
      column: columns[currentColumnNumber - 1],
      row: (currentRowNumber + 1 * this.nextRowDifference()) as Row,
    };
    if (board.onPositionPiece(leftDiagonal) && this.checkIfOponent(leftDiagonal, board)) {
      movesToGo.push(leftDiagonal);
    }

    return movesToGo;
  }

  private checkIfOponent(position: Square, board: Board): boolean {
    return board.onPositionPiece(position)?.side !== this.side;
  }
}

import { PiecePositions } from './PiecesPositions';
import { Piece } from './Piece';
import { PiecePossibleMoves } from './PiecePossibleMoves';
import { columns, Row, Side, Square } from './Types';

type RowDifference = 1 | -1;
const NEXT_ROW_DIFFERENCE: { WHITE: RowDifference; BLACK: RowDifference } = {
  WHITE: 1,
  BLACK: -1,
};

export class Pawn extends Piece implements PiecePossibleMoves {
  readonly name = 'Pawn';
  constructor(side: Side) {
    super(side);
  }

  possibleMoves(position: Square, board: PiecePositions): Square[] {
    const aheadSquare = { column: position.column, row: (position.row + 1 * this.nextRowDifference()) as Row };
    const doubleAheadSquare = { column: position.column, row: (position.row + 2 * this.nextRowDifference()) as Row };
    const aheadMoves: Square[] = this.isOnStartingPosition(position) ? [aheadSquare, doubleAheadSquare] : [aheadSquare];
    return this.normalMoves(board, aheadMoves).concat(this.captureMoves(position, board));
  }

  private normalMoves(board: PiecePositions, aheadMoves: Square[]): Square[] {
    if (aheadMoves.length === 0) {
      return [];
    }
    const [nextMove, ...otherMoves] = aheadMoves;
    const isPieceOnNextSquare = board.onPositionPiece(nextMove) !== undefined;
    return isPieceOnNextSquare ? [] : [nextMove, ...this.normalMoves(board, otherMoves)];
  }

  private nextRowDifference(): RowDifference {
    return NEXT_ROW_DIFFERENCE[this.side];
  }

  private isOnStartingPosition(position: Square) {
    return (position.row === 2 && this.side === Side.WHITE) || (position.row === 7 && this.side === Side.BLACK);
  }

  private captureMoves(position: Square, board: PiecePositions): Square[] {
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
}

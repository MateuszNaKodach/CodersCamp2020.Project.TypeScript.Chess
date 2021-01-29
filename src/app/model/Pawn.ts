import { Board } from './Board';
import { Piece } from './Piece';
import { PieceMovement } from './PieceMovement';
import { Column, columns, Row, Side, Square } from './Types';

const NEXT_ROW_DIFFERENCE = {
  WHITE: 1,
  BLACK: -1,
};

export class Pawn extends Piece implements PieceMovement {
  private nextRowDifference = 1;

  constructor(id: string, side: Side) {
    super('uselessId', side);
    if (this.side !== 'WHITE') this.nextRowDifference = -1;
    this.nextRowDifference = this.side === 'WHITE' ? NEXT_ROW_DIFFERENCE.WHITE : NEXT_ROW_DIFFERENCE.BLACK;
  }

  possibleMoves(position: Square, board: Board): Square[] {
    let movesToGo: Square[] = [] as Square[];
    movesToGo = movesToGo.concat(this.goAhead(position, board), this.goDoubleAhead(position, board), this.goDiagonalAhead(position, board));
    return movesToGo;
  }

  private goAhead(position: Square, board: Board): Square[] {
    const movesToGo: Square[] = [];
    if (!board.onPositionPiece({ column: position.column, row: (position.row + 1 * this.nextRowDifference) as Row })) {
      movesToGo.push({ column: position.column, row: (position.row + 1 * this.nextRowDifference) as Row });
    }
    return movesToGo;
  }

  private goDoubleAhead(position: Square, board: Board): Square[] {
    const movesToGo: Square[] = [];
    if ((position.row === 2 && this.side === 'WHITE') || (position.row === 7 && this.side === 'BLACK')) {
      // console.log()
      if (
        !board.onPositionPiece({ column: position.column, row: (position.row + 1 * this.nextRowDifference) as Row }) &&
        !board.onPositionPiece({ column: position.column, row: (position.row + 2 * this.nextRowDifference) as Row })
      ) {
        movesToGo.push({ column: position.column, row: (position.row + 2 * this.nextRowDifference) as Row });
      }
    }
    return movesToGo;
  }

  private goDiagonalAhead(position: Square, board: Board): Square[] {
    const movesToGo: Square[] = [];
    const currentColumnNumber = columns.indexOf(position.column);
    const currentRowNumber = position.row;

    if (
      board.onPositionPiece({ column: columns[currentColumnNumber + 1], row: (currentRowNumber + 1 * this.nextRowDifference) as Row }) &&
      this.checkIfOponent(columns[currentColumnNumber + 1], (currentRowNumber + 1 * this.nextRowDifference) as Row, board)
    ) {
      movesToGo.push({ column: columns[currentColumnNumber + 1], row: (currentRowNumber + 1 * this.nextRowDifference) as Row });
    }

    if (
      board.onPositionPiece({ column: columns[currentColumnNumber - 1], row: (currentRowNumber + 1 * this.nextRowDifference) as Row }) &&
      this.checkIfOponent(columns[currentColumnNumber - 1], (currentRowNumber + 1 * this.nextRowDifference) as Row, board)
    ) {
      movesToGo.push({ column: columns[currentColumnNumber - 1], row: (currentRowNumber + 1 * this.nextRowDifference) as Row });
    }

    return movesToGo;
  }

  private checkIfOponent(columnPosition: Column, rowPosition: Row, board: Board): boolean {
    return board.onPositionPiece({ column: columnPosition, row: rowPosition })?.side !== this.side;
  }
}

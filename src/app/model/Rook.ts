import { PiecePositions } from './PiecesPositions';
import { BOARDSIZE } from './Constances';
import { Piece } from './Piece';
import { PiecePossibleMoves } from './PiecePossibleMoves';
import { Column, columns, Row, Side, Square } from './Types';

export class Rook extends Piece implements PiecePossibleMoves {
  constructor(side: Side) {
    super(side);
  }

  possibleMoves(position: Square, board: PiecePositions): Square[] {
    const movesToGo = this.goUp(position, board).concat(
      this.goDown(position, board),
      this.goLeft(position, board),
      this.goRight(position, board),
    );
    return movesToGo;
  }

  private goUp(position: Square, board: PiecePositions): Square[] {
    const movesToGo: Square[] = [];

    for (let i = position.row + 1; i <= BOARDSIZE; i++) {
      if (!board.onPositionPiece({ column: position.column, row: i as Row })) {
        movesToGo.push({ column: position.column, row: i as Row });
      } else {
        if (this.checkIfOponent(position.column, i as Row, board)) {
          movesToGo.push({ column: position.column, row: i as Row });
          break;
        } else break;
      }
    }

    return movesToGo;
  }

  private goDown(position: Square, board: PiecePositions): Square[] {
    const movesToGo: Square[] = [];

    for (let i = position.row - 1; i >= 1; i--) {
      if (!board.onPositionPiece({ column: position.column, row: i as Row })) {
        movesToGo.push({ column: position.column, row: i as Row });
      } else {
        if (this.checkIfOponent(position.column, i as Row, board)) {
          movesToGo.push({ column: position.column, row: i as Row });
          break;
        } else break;
      }
    }

    return movesToGo;
  }

  private goLeft(position: Square, board: PiecePositions): Square[] {
    const movesToGo: Square[] = [];

    for (let i = columns.indexOf(position.column) - 1; i >= 0; i--) {
      if (!board.onPositionPiece({ column: columns[i], row: position.row })) {
        movesToGo.push({ column: columns[i], row: position.row });
      } else {
        if (this.checkIfOponent(columns[i], position.row, board)) {
          movesToGo.push({ column: columns[i], row: position.row });
          break;
        } else break;
      }
    }

    return movesToGo;
  }

  private goRight(position: Square, board: PiecePositions): Square[] {
    const movesToGo: Square[] = [];

    for (let i = columns.indexOf(position.column) + 1; i < BOARDSIZE; i++) {
      if (!board.onPositionPiece({ column: columns[i], row: position.row })) {
        movesToGo.push({ column: columns[i], row: position.row });
      } else {
        if (this.checkIfOponent(columns[i], position.row, board)) {
          movesToGo.push({ column: columns[i], row: position.row });
          break;
        } else break;
      }
    }

    return movesToGo;
  }

  private checkIfOponent(columnPosition: Column, rowPosition: Row, board: PiecePositions): boolean {
    return board.onPositionPiece({ column: columnPosition, row: rowPosition })?.side !== this.side;
  }
}

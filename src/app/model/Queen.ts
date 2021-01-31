import { Board } from './Board';
import { BOARDSIZE } from './Constances';
import { Piece } from './Piece';
import { PieceMovement } from './PieceMovement';
import { columns, Row, Side, Square } from './Types';

export class Queen extends Piece implements PieceMovement {
  constructor(id: string, side: Side) {
    super('uselessId', side);
  }

  possibleMoves(position: Square, board: Board): Square[] {
    return this.squaresUp(position, board).concat(
      this.squaresDown(position, board),
      this.squaresLeft(position, board),
      this.squaresRight(position, board),
      this.squaresDiagonalLeftUp(position, board),
      this.squaresDiagonalRightUp(position, board),
    );
  }

  private squaresUp(position: Square, board: Board): Square[] {
    const squaresToGo: Square[] = [];

    for (let i = position.row + 1; i <= BOARDSIZE; i++) {
      const square = { column: position.column, row: i as Row };
      if (!board.onPositionPiece(square)) {
        squaresToGo.push(square);
      } else {
        if (this.checkIfOponent(square, board)) {
          squaresToGo.push(square);
          break;
        } else break;
      }
    }

    return squaresToGo;
  }

  private squaresDown(position: Square, board: Board): Square[] {
    const squaresToGo: Square[] = [];

    for (let i = position.row - 1; i >= 1; i--) {
      const square = { column: position.column, row: i as Row };
      if (!board.onPositionPiece(square)) {
        squaresToGo.push(square);
      } else {
        if (this.checkIfOponent(square, board)) {
          squaresToGo.push(square);
          break;
        } else break;
      }
    }

    return squaresToGo;
  }

  private squaresLeft(position: Square, board: Board): Square[] {
    const squaresToGo: Square[] = [];

    for (let i = columns.indexOf(position.column) - 1; i >= 0; i--) {
      const square = { column: columns[i], row: position.row };
      if (!board.onPositionPiece(square)) {
        squaresToGo.push(square);
      } else {
        if (this.checkIfOponent(square, board)) {
          squaresToGo.push(square);
          break;
        } else break;
      }
    }

    return squaresToGo;
  }

  private squaresRight(position: Square, board: Board): Square[] {
    const squaresToGo: Square[] = [];

    for (let i = columns.indexOf(position.column) + 1; i < BOARDSIZE; i++) {
      const square = { column: columns[i], row: position.row };
      if (!board.onPositionPiece(square)) {
        squaresToGo.push(square);
      } else {
        if (this.checkIfOponent(square, board)) {
          squaresToGo.push(square);
          break;
        } else break;
      }
    }

    return squaresToGo;
  }

  private squaresDiagonalLeftUp(position: Square, board: Board): Square[] {
    const squaresToGo: Square[] = [];
    const numberOfIterations = columns.indexOf(position.column);
    let rowIncrementor = 1;

    for (let i = numberOfIterations; i > 0; i--) {
      const leftDiagonal: Square = {
        column: columns[i - 1],
        row: (position.row + rowIncrementor) as Row,
      };
      rowIncrementor++;
      if (!board.onPositionPiece(leftDiagonal)) {
        squaresToGo.push(leftDiagonal);
      } else {
        if (this.checkIfOponent(leftDiagonal, board)) {
          squaresToGo.push(leftDiagonal);
          break;
        } else break;
      }
    }
    return squaresToGo;
  }

  private squaresDiagonalRightUp(position: Square, board: Board): Square[] {
    const squaresToGo: Square[] = [];
    const currentColumn = columns.indexOf(position.column);
    const numberOfIterations = BOARDSIZE - columns.indexOf(position.column) + 1;
    let rowIncrementor = 1;

    for (let i = currentColumn; i <= numberOfIterations; i++) {
      const rightDiagonal: Square = {
        column: columns[i + 1],
        row: (position.row + rowIncrementor) as Row,
      };
      rowIncrementor++;
      if (!board.onPositionPiece(rightDiagonal)) {
        squaresToGo.push(rightDiagonal);
      } else {
        if (this.checkIfOponent(rightDiagonal, board)) {
          squaresToGo.push(rightDiagonal);
          break;
        } else break;
      }
    }
    return squaresToGo;
  }

  private checkIfOponent(position: Square, board: Board): boolean {
    return board.onPositionPiece(position)?.side !== this.side;
  }
}

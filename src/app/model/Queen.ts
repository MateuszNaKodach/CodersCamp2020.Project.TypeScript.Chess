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
      this.squaresLeftUpDiagonal(position, board),
      this.squaresRightUpDiagonal(position, board),
      this.squaresLeftDownDiagonal(position, board),
      this.squaresRightDownDiagonal(position, board),
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

  private squaresLeftUpDiagonal(position: Square, board: Board): Square[] {
    const squaresToGo: Square[] = [];
    const upLeftDiagonalSquares: Square[] = this.findUpLeftDiagonalSquares(position);

    for (let i = 0; i < upLeftDiagonalSquares.length; i++) {
      const leftDiagonal: Square = {
        column: upLeftDiagonalSquares[i].column,
        row: upLeftDiagonalSquares[i].row as Row,
      };
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

  private squaresRightUpDiagonal(position: Square, board: Board): Square[] {
    const squaresToGo: Square[] = [];
    const upRightDiagonalSquares: Square[] = this.findUpRightDiagonalSquares(position);

    for (let i = 0; i < upRightDiagonalSquares.length; i++) {
      const rightDiagonal: Square = {
        column: upRightDiagonalSquares[i].column,
        row: upRightDiagonalSquares[i].row as Row,
      };
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

  private squaresLeftDownDiagonal(position: Square, board: Board): Square[] {
    const squaresToGo: Square[] = [];
    const downLeftDiagonalSquares: Square[] = this.findDownLeftDiagonalSquares(position);

    for (let i = 0; i < downLeftDiagonalSquares.length; i++) {
      const leftDiagonal: Square = {
        column: downLeftDiagonalSquares[i].column,
        row: downLeftDiagonalSquares[i].row as Row,
      };
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

  private squaresRightDownDiagonal(position: Square, board: Board): Square[] {
    const squaresToGo: Square[] = [];
    const downRightDiagonalSquares: Square[] = this.findDownRightDiagonalSquares(position);

    for (let i = 0; i < downRightDiagonalSquares.length; i++) {
      const rightDiagonal: Square = {
        column: downRightDiagonalSquares[i].column,
        row: downRightDiagonalSquares[i].row as Row,
      };
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

  private findUpLeftDiagonalSquares(position: Square): Square[] {
    const diagonalSquares: Square[] = [];
    let nextSquareColumn = columns.indexOf(position.column) - 1;
    let nextSquareRow = (position.row + 1) as Row;

    while (nextSquareColumn >= 0 && nextSquareRow <= BOARDSIZE) {
      const upLeftDiagonal: Square = {
        column: columns[nextSquareColumn],
        row: nextSquareRow,
      };
      nextSquareColumn--;
      nextSquareRow++;
      diagonalSquares.push(upLeftDiagonal);
    }
    return diagonalSquares;
  }

  private findUpRightDiagonalSquares(position: Square): Square[] {
    const diagonalSquares: Square[] = [];
    let nextSquareColumn = columns.indexOf(position.column) + 1;
    let nextSquareRow = (position.row + 1) as Row;

    while (nextSquareColumn < BOARDSIZE && nextSquareRow <= BOARDSIZE) {
      const upLeftDiagonal: Square = {
        column: columns[nextSquareColumn],
        row: nextSquareRow,
      };
      nextSquareColumn++;
      nextSquareRow++;
      diagonalSquares.push(upLeftDiagonal);
    }
    return diagonalSquares;
  }

  private findDownLeftDiagonalSquares(position: Square): Square[] {
    const diagonalSquares: Square[] = [];
    let nextSquareColumn = columns.indexOf(position.column) - 1;
    let nextSquareRow = (position.row - 1) as Row;

    while (nextSquareColumn >= 0 && nextSquareRow > 0) {
      const upLeftDiagonal: Square = {
        column: columns[nextSquareColumn],
        row: nextSquareRow,
      };
      nextSquareColumn--;
      nextSquareRow--;
      diagonalSquares.push(upLeftDiagonal);
    }
    return diagonalSquares;
  }

  private findDownRightDiagonalSquares(position: Square): Square[] {
    const diagonalSquares: Square[] = [];
    let nextSquareColumn = columns.indexOf(position.column) + 1;
    let nextSquareRow = (position.row - 1) as Row;

    while (nextSquareColumn < BOARDSIZE && nextSquareRow > 0) {
      const upLeftDiagonal: Square = {
        column: columns[nextSquareColumn],
        row: nextSquareRow,
      };
      nextSquareColumn++;
      nextSquareRow--;
      diagonalSquares.push(upLeftDiagonal);
    }
    return diagonalSquares;
  }

  private checkIfOponent(position: Square, board: Board): boolean {
    return board.onPositionPiece(position)?.side !== this.side;
  }
}

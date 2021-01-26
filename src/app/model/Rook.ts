import { Board } from './Board';
import { Piece } from './Piece';
import { PieceMovement } from './PieceMovement';
import { Side, Square } from './Types';

export class Rook extends Piece implements PieceMovement {
  readonly boardSize = 8;

  constructor(id: string, side: Side) {
    super(id, side);
  }

  possibleMoves(position: Square, board: Board): Square[] {
    let movesToGo: Square[] = [];
    movesToGo = this.goUp(position, board).concat(
      this.goDown(position, board),
      this.goLeft(position, board),
      this.goRight(position, board),
    );

    return movesToGo;
  }

  private goUp(position: Square, board: Board): Square[] {
    const movesToGo: Square[] = [];

    if (position.row === 8) {
      return movesToGo;
    } else {
      for (let i = position.row; i < this.boardSize; i++) {
        if (board.squares[i][position.column.indexOf(position.column)].piece == null) {
          movesToGo.push(board.squares[i][position.column.indexOf(position.column)]);
        } else {
          if (this.checkIfOponent(i, position.column.indexOf(position.column), board, this.side)) {
            movesToGo.push(board.squares[i][position.column.indexOf(position.column)]);
            break;
          } else break;
        }
      }
    }

    return movesToGo;
  }

  private goDown(position: Square, board: Board): Square[] {
    const movesToGo: Square[] = [];

    if (position.row === 1) {
      return movesToGo;
    } else {
      for (let i = position.row - 2; i >= 0; i--) {
        if (board.squares[i][position.column.indexOf(position.column)].piece == null) {
          movesToGo.push(board.squares[i][position.column.indexOf(position.column)]);
        } else {
          if (this.checkIfOponent(i, position.column.indexOf(position.column), board, this.side)) {
            movesToGo.push(board.squares[i][position.column.indexOf(position.column)]);
            break;
          } else break;
        }
      }
    }

    return movesToGo;
  }

  private goLeft(position: Square, board: Board): Square[] {
    const movesToGo: Square[] = [];

    if (position.column.indexOf(position.column) === 1) {
      return movesToGo;
    } else {
      for (let i = position.column.indexOf(position.column) - 1; i >= 0; i--) {
        if (board.squares[position.row - 1][i].piece == null) {
          movesToGo.push(board.squares[position.row - 1][i]);
        } else {
          if (this.checkIfOponent(position.row - 1, i, board, this.side)) {
            movesToGo.push(board.squares[position.row - 1][i]);
            break;
          } else break;
        }
      }
    }

    return movesToGo;
  }

  private goRight(position: Square, board: Board): Square[] {
    const movesToGo: Square[] = [];

    if (position.column.indexOf(position.column) === 8) {
      return movesToGo;
    } else {
      for (let i = position.column.indexOf(position.column); i < this.boardSize; i++) {
        if (board.squares[position.row - 1][i].piece == null) {
          movesToGo.push(board.squares[position.row - 1][i]);
        } else {
          if (this.checkIfOponent(position.row - 1, i, board, this.side)) {
            movesToGo.push(board.squares[position.row - 1][i]);
            break;
          } else break;
        }
      }
    }

    return movesToGo;
  }

  private checkIfOponent(rowPosition: number, columnPosition: number, board: Board, side: Side): boolean {
    return board.squares[rowPosition][columnPosition].piece?.side !== side ? true : false;
  }
}

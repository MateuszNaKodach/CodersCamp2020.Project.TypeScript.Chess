import { Board } from './Board';
import { PieceMovement } from './PieceMovement';
import { Side, Square } from './Types';

export class Rock implements PieceMovement {
  readonly boardSize = 8;

  constructor(private id: string, private side: Side) {}

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
        if (board.squares[i][position.column - 1].piece == null) {
          movesToGo.push(board.squares[i][position.column - 1]);
        } else {
          if (this.checkIfOponent(i, position.column - 1, board, this.side)) {
            // if (board.squares[i][position.column - 1].piece?.side !== this.side) {
            movesToGo.push(board.squares[i][position.column - 1]);
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
        if (board.squares[i][position.column - 1].piece == null) {
          movesToGo.push(board.squares[i][position.column - 1]);
        } else {
          if (this.checkIfOponent(i, position.column - 1, board, this.side)) {
            // if (board.squares[i][position.column - 1].piece?.side !== this.side) {
            movesToGo.push(board.squares[i][position.column - 1]);
            break;
          } else break;
        }
      }
    }

    return movesToGo;
  }

  private goLeft(position: Square, board: Board): Square[] {
    const movesToGo: Square[] = [];

    if (position.column === 1) {
      return movesToGo;
    } else {
      for (let i = position.column - 2; i >= 0; i--) {
        if (board.squares[position.row - 1][i].piece == null) {
          movesToGo.push(board.squares[position.row - 1][i]);
        } else {
          if (this.checkIfOponent(position.row - 1, i, board, this.side)) {
            // if (board.squares[position.row - 1][i].piece?.side !== this.side) {
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

    if (position.column === 8) {
      return movesToGo;
    } else {
      for (let i = position.column; i < this.boardSize; i++) {
        if (board.squares[position.row - 1][i].piece == null) {
          movesToGo.push(board.squares[position.row - 1][i]);
        } else {
          if (this.checkIfOponent(position.row - 1, i, board, this.side)) {
            // if (board.squares[position.row - 1][i].piece?.side !== this.side) {
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

import { Board } from './Board';
import { PieceMovement } from './PieceMovement';
import { Side, Square } from './Types';

export class Rock implements PieceMovement {
  id: string;
  side: Side;

  constructor(id: string, side: Side) {
    this.id = id;
    this.side = side;
  }

  possibleMoves(position: Square, board: Board): Square[] {
    let movesToGo: Square[] = [];
    movesToGo.concat(this._goUp(position, board));
    movesToGo.concat(this._goDown(position, board));
    movesToGo.concat(this._goLeft(position, board));
    movesToGo.concat(this._goRight(position, board));

    return movesToGo;
  }

  _goUp(position: Square, board: Board): Square[] {
    let movesToGo: Square[] = [];
    let matrixDimension = board.squares[0].length;

    if (position.row === 8) {
      return movesToGo;
    } else {
      for (let i = position.row; i < matrixDimension; i++) {
        if (board.squares[i][position.column - 1].piece == null) {
          movesToGo.push(board.squares[i][position.column - 1]);
        } else {
          if (board.squares[i][position.column - 1].piece?.side !== this.side) {
            movesToGo.push(board.squares[i][position.column - 1]);
            break;
          } else break;
        }
      }
    }

    return movesToGo;
  }

  _goDown(position: Square, board: Board): Square[] {
    let movesToGo: Square[] = [];

    if (position.row === 1) {
      return movesToGo;
    } else {
      for (let i = position.row - 2; i >= 0; i--) {
        if (board.squares[i][position.column - 1].piece == null) {
          movesToGo.push(board.squares[i][position.column - 1]);
        } else {
          if (board.squares[i][position.column - 1].piece?.side !== this.side) {
            movesToGo.push(board.squares[i][position.column - 1]);
            break;
          } else break;
        }
      }
    }

    return movesToGo;
  }

  _goLeft(position: Square, board: Board): Square[] {
    let movesToGo: Square[] = [];

    if (position.column === 1) {
      return movesToGo;
    } else {
      for (let i = position.column - 2; i >= 0; i--) {
        if (board.squares[position.row - 1][i].piece == null) {
          movesToGo.push(board.squares[position.row - 1][i]);
        } else {
          if (board.squares[position.row - 1][i].piece?.side !== this.side) {
            movesToGo.push(board.squares[position.row - 1][i]);
            break;
          } else break;
        }
      }
    }

    return movesToGo;
  }

  _goRight(position: Square, board: Board): Square[] {
    let movesToGo: Square[] = [];
    let matrixDimension = board.squares[0].length;

    if (position.column === 8) {
      return movesToGo;
    } else {
      for (let i = position.column; i < matrixDimension; i++) {
        if (board.squares[position.row - 1][i].piece == null) {
          movesToGo.push(board.squares[position.row - 1][i]);
        } else {
          if (board.squares[position.row - 1][i].piece?.side !== this.side) {
            movesToGo.push(board.squares[position.row - 1][i]);
            break;
          } else break;
        }
      }
    }

    return movesToGo;
  }
}

import { PieceMovement } from './PieceMovement';
import { Side, Square, Board, Piece } from './Types';

export class Rock implements PieceMovement {
  id: string;
  side: Side;

  constructor(id: string, side: Side) {
    this.id = id;
    this.side = side;
  }

  isPositionEmpty(position: Square): boolean {
    return position.isEmpty;
  }

  onPositionPiece(position: Square): Piece {
    return position.piece;
  }

  possibleMoves(position: Square, board: Board): Square[] {
    let movesToGo: Square[] = [];
    if (position.column === 'A') {
      if (position.row === 1) {
        // loop up for the move
        for (let i = 1; i < board[0].length; i++) {
          if (this.isPositionEmpty(board[0][i])) {
            // może być w łatwiej! if (board[0][i].isEmpty)
            movesToGo.push(board[0][i]);
          } else if (this.onPositionPiece(board[0][i]).side !== this.side) {
            movesToGo.push(board[0][i]);
            break;
          } else break;
        }
      }
      if (position.row === 8) {
        // loook down for move
      }
      // look right for move

      return movesToGo;
    }
    if (position.column === 'H') {
      if (position.row === 1) {
        // look up for move
      }
      if (position.row === 8) {
        // loook down for move
      }
      // look left for move

      return movesToGo;
    }
    if (position.row === 1) {
      // look left, right and up for move

      return movesToGo;
    }
    if (position.row === 8) {
      // look left, right and down for move

      return movesToGo;
    } else {
      // look left, right, up and down for move

      return movesToGo;
    }
  }
}

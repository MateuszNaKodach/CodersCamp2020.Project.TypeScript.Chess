import { Board } from './Board';
import { BOARDSIZE } from './Constances';
import { Piece } from './Piece';
import { PieceMovement } from './PieceMovement';
import { Column, columns, Row, Side, Square } from './Types';

export class Pawn extends Piece implements PieceMovement {
  constructor(id: string, side: Side) {
    super(id, side);
  }

  possibleMoves(position: Square, board: Board): Square[] {
    let movesToGo: Square[] = [] as Square[];
    movesToGo = movesToGo.concat(this.goAhead(position, board), this.goDoubleAhead(position, board), this.goDiagonalAhead(position, board));
    return movesToGo;
  }

  private goAhead(position: Square, board: Board): Square[] {
    const movesToGo: Square[] = [];
    if (board.onPositionPiece({ column: position.column, row: (position.row + 1) as Row }) === null) {
      movesToGo.push({ column: position.column, row: (position.row + 1) as Row });
    }
    return movesToGo;
  }

  private goDoubleAhead(position: Square, board: Board): Square[] {
    const movesToGo: Square[] = [];

    return movesToGo;
  }

  private goDiagonalAhead(position: Square, board: Board): Square[] {
    const movesToGo: Square[] = [];
    return movesToGo;
  }

  private checkIfOponent(columnPosition: Column, rowPosition: Row, board: Board): boolean {
    // ! nie rozumiem tego znaka zapytania na końcu
    return board.onPositionPiece({ column: columnPosition, row: rowPosition })?.side !== this.side;
  }
}

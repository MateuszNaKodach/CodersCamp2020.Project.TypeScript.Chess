import { Board } from './Board';
import { Piece } from './Piece';
import { BOARDSIZE } from './Constances';
import { PieceMovement } from './PieceMovement';
import { Column, columns, Row, Side, Square } from './Types';

export class Knight extends Piece implements PieceMovement {
  constructor(id: string, side: Side) {
    super('uselessId', side);
  }

  possibleMoves(position: Square, board: Board): Square[] {
    let movesToGo = [] as Square[];
    // TODO: wypisz wszystkie pola
    movesToGo = movesToGo.concat(this.movesOnEmptyBoard(position, board));
    // TODO: usuń pola zajęte
    return movesToGo;
  }

  private movesOnEmptyBoard(position: Square, board: Board): Square[] {
    const movesToGo: Square[] = [];
    const currentColumnNumber = columns.indexOf(position.column);
    const currentRowNumber = position.row;

    if (currentColumnNumber + 2 < BOARDSIZE && currentRowNumber + 1 < BOARDSIZE) {
      movesToGo.push({ column: columns[currentColumnNumber + 2], row: (currentRowNumber + 1) as Row });
    }
    if (currentColumnNumber + 2 < BOARDSIZE && currentRowNumber - 1 < BOARDSIZE) {
      movesToGo.push({ column: columns[currentColumnNumber + 2], row: (currentRowNumber - 1) as Row });
    }
    if (currentColumnNumber + 1 < BOARDSIZE && currentRowNumber + 2 < BOARDSIZE) {
      movesToGo.push({ column: columns[currentColumnNumber + 1], row: (currentRowNumber + 2) as Row });
    }
    if (currentColumnNumber + 1 < BOARDSIZE && currentRowNumber - 2 < BOARDSIZE) {
      movesToGo.push({ column: columns[currentColumnNumber + 1], row: (currentRowNumber - 2) as Row });
    }
    if (currentColumnNumber - 1 < BOARDSIZE && currentRowNumber + 2 < BOARDSIZE) {
      movesToGo.push({ column: columns[currentColumnNumber - 1], row: (currentRowNumber + 2) as Row });
    }
    if (currentColumnNumber - 1 < BOARDSIZE && currentRowNumber - 2 < BOARDSIZE) {
      movesToGo.push({ column: columns[currentColumnNumber - 1], row: (currentRowNumber - 2) as Row });
    }
    if (currentColumnNumber - 2 < BOARDSIZE && currentRowNumber + 1 < BOARDSIZE) {
      movesToGo.push({ column: columns[currentColumnNumber - 2], row: (currentRowNumber + 1) as Row });
    }
    if (currentColumnNumber - 2 < BOARDSIZE && currentRowNumber - 1 < BOARDSIZE) {
      movesToGo.push({ column: columns[currentColumnNumber - 2], row: (currentRowNumber - 1) as Row });
    }

    return movesToGo;
  }
}

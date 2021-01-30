import { Board } from './Board';
import { Piece } from './Piece';
import { BOARDSIZE } from './Constances';
import { PieceMovement } from './PieceMovement';
import { columns, Row, Side, Square } from './Types';

export class Knight extends Piece implements PieceMovement {
  constructor(id: string, side: Side) {
    super('uselessId', side);
  }

  possibleMoves(position: Square, board: Board): Square[] {
    return this.removeSquaresWithAllyPieces(Knight.movesOnEmptyBoard(position), board);
  }

  private static movesOnEmptyBoard(position: Square): Square[] {
    const currentColumnNumber = columns.indexOf(position.column);
    const currentRowNumber = position.row;

    return [
      { column: columns[currentColumnNumber + 2], row: (currentRowNumber + 1) as Row },
      { column: columns[currentColumnNumber + 2], row: (currentRowNumber - 1) as Row },
      { column: columns[currentColumnNumber + 1], row: (currentRowNumber + 2) as Row },
      { column: columns[currentColumnNumber + 1], row: (currentRowNumber - 2) as Row },
      { column: columns[currentColumnNumber - 1], row: (currentRowNumber + 2) as Row },
      { column: columns[currentColumnNumber - 1], row: (currentRowNumber - 2) as Row },
      { column: columns[currentColumnNumber - 2], row: (currentRowNumber + 1) as Row },
      { column: columns[currentColumnNumber - 2], row: (currentRowNumber - 1) as Row },
    ].filter(Knight.isWithinChessboardBorders);
  }

  private static isWithinChessboardBorders(position: Square): boolean {
    const columnNumber = columns.indexOf(position.column);
    return columnNumber < BOARDSIZE && columnNumber >= 0 && position.row <= BOARDSIZE && position.row > 0;
  }

  private removeSquaresWithAllyPieces(movesToGoOnEmptyBoard: Square[], board: Board): Square[] {
    const movesToGo = movesToGoOnEmptyBoard.filter((checkedPosition) => {
      return board.onPositionPiece(checkedPosition)?.side !== this.side;
    });
    return movesToGo as Square[];
  }
}

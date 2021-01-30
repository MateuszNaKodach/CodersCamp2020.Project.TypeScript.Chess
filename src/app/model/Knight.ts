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
    let movesToGo = [] as Square[];
    movesToGo = movesToGo.concat(this.movesOnEmptyBoard(position, board));
    // TODO: usuń pola zajęte
    movesToGo = this.removeImpossibleSquares(movesToGo, board);
    return movesToGo;
  }

  private movesOnEmptyBoard(position: Square, board: Board): Square[] {
    const movesToGo: Square[] = [];
    const currentColumnNumber = columns.indexOf(position.column);
    const currentRowNumber = position.row;

    if (this.isWithinChessboardBorders(currentColumnNumber + 2, currentRowNumber + 1)) {
      movesToGo.push({ column: columns[currentColumnNumber + 2], row: (currentRowNumber + 1) as Row });
    }
    if (this.isWithinChessboardBorders(currentColumnNumber + 2, currentRowNumber - 1)) {
      movesToGo.push({ column: columns[currentColumnNumber + 2], row: (currentRowNumber - 1) as Row });
    }
    if (this.isWithinChessboardBorders(currentColumnNumber + 1, currentRowNumber + 2)) {
      movesToGo.push({ column: columns[currentColumnNumber + 1], row: (currentRowNumber + 2) as Row });
    }
    if (this.isWithinChessboardBorders(currentColumnNumber + 1, currentRowNumber - 2)) {
      movesToGo.push({ column: columns[currentColumnNumber + 1], row: (currentRowNumber - 2) as Row });
    }
    if (this.isWithinChessboardBorders(currentColumnNumber - 1, currentRowNumber + 2)) {
      movesToGo.push({ column: columns[currentColumnNumber - 1], row: (currentRowNumber + 2) as Row });
    }
    if (this.isWithinChessboardBorders(currentColumnNumber - 1, currentRowNumber - 2)) {
      movesToGo.push({ column: columns[currentColumnNumber - 1], row: (currentRowNumber - 2) as Row });
    }
    if (this.isWithinChessboardBorders(currentColumnNumber - 2, currentRowNumber + 1)) {
      movesToGo.push({ column: columns[currentColumnNumber - 2], row: (currentRowNumber + 1) as Row });
    }
    if (this.isWithinChessboardBorders(currentColumnNumber - 2, currentRowNumber - 1)) {
      movesToGo.push({ column: columns[currentColumnNumber - 2], row: (currentRowNumber - 1) as Row });
    }

    return movesToGo;
  }

  private isWithinChessboardBorders(checkedColumnNumber: number, checkedRowNumber: number): boolean {
    return checkedColumnNumber < BOARDSIZE && checkedColumnNumber >= 0 && checkedRowNumber <= BOARDSIZE && checkedRowNumber > 0;
  }

  private removeImpossibleSquares(movesToGoOnEmptyBoard: Square[], board: Board): Square[] {
    const movesToGo = movesToGoOnEmptyBoard.filter((checkedPosition) => {
      return board.onPositionPiece(checkedPosition)?.side !== this.side;
    });
    return movesToGo as Square[];
  }
}

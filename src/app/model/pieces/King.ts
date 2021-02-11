import { PiecePositions } from '../PiecesPositions';
import { Piece } from './Piece';
import { columns, Row, Side, Square } from '../Types';
import { PiecePossibleMoves } from '../PiecePossibleMoves';

export class King extends Piece implements PiecePossibleMoves {
  readonly name = 'King';
  constructor(side: Side) {
    super(side);
  }

  possibleMoves(position: Square, board: PiecePositions): Square[] {
    const currentColumnNumber = columns.indexOf(position.column);
    const currentRowNumber = position.row;
    return [
      { column: columns[currentColumnNumber - 1], row: (currentRowNumber - 1) as Row },
      { column: columns[currentColumnNumber - 1], row: currentRowNumber as Row },
      { column: columns[currentColumnNumber - 1], row: (currentRowNumber + 1) as Row },
      { column: columns[currentColumnNumber], row: (currentRowNumber - 1) as Row },
      { column: columns[currentColumnNumber], row: (currentRowNumber + 1) as Row },
      { column: columns[currentColumnNumber + 1], row: (currentRowNumber - 1) as Row },
      { column: columns[currentColumnNumber + 1], row: currentRowNumber as Row },
      { column: columns[currentColumnNumber + 1], row: (currentRowNumber + 1) as Row },
    ]
      .filter(King.isWithinChessboardBorders)
      .filter((square) => this.checkIfNotSameColorPiece(square, board));
  }
}

import { columns, Row, Side, Square, Vector } from './Types';
import { PiecePositions } from './PiecesPositions';
import { BOARDSIZE } from './Constances';

export abstract class Piece {
  protected constructor(public side: Side) {}

  abstract possibleMoves(position: Square, board: PiecePositions): Square[];

  protected lineMoves(board: PiecePositions, actualPosition: Square, vector: Vector): Square[] {
    const nextSquare: Square = {
      column: columns[columns.indexOf(actualPosition.column) + vector.col],
      row: (actualPosition.row + vector.row) as Row,
    };
    const isWithinChessboard = Piece.isWithinChessboardBorders(nextSquare);
    if (!isWithinChessboard) {
      return [];
    }
    const isSquareOccupied = board.onPositionPiece(nextSquare);
    if (isSquareOccupied) {
      return this.checkIfOponent(nextSquare, board) ? [nextSquare] : [];
    } else {
      return [nextSquare].concat(this.lineMoves(board, nextSquare, vector));
    }
  }

  protected static isWithinChessboardBorders(position: Square): boolean {
    const columnNumber = columns.indexOf(position.column);
    return columnNumber < BOARDSIZE && columnNumber >= 0 && position.row <= BOARDSIZE && position.row > 0;
  }

  protected checkIfOponent(position: Square, board: PiecePositions): boolean {
    return board.onPositionPiece(position)?.side !== this.side;
  }
}

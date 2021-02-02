import { PiecePositions } from './PiecesPositions';
import { BOARDSIZE } from './Constances';
import { Piece } from './Piece';
import { columns, Row, Side, Square, Vector } from './Types';
import { PiecePossibleMoves } from './PiecePossibleMoves';

export class Bishop extends Piece implements PiecePossibleMoves {
  constructor(side: Side) {
    super(side);
  }

  possibleMoves(position: Square, board: PiecePositions): Square[] {
    return [
      ...this.lineMoves(board, position, { row: -1, col: -1 }),
      ...this.lineMoves(board, position, { row: -1, col: 1 }),
      ...this.lineMoves(board, position, { row: 1, col: 1 }),
      ...this.lineMoves(board, position, { row: 1, col: -1 }),
    ];
  }

  private lineMoves(board: PiecePositions, actualPosition: Square, vector: Vector): Square[] {
    const nextSquare: Square = {
      column: columns[columns.indexOf(actualPosition.column) + vector.col],
      row: (actualPosition.row + vector.row) as Row,
    };
    const isWithinChessboard = Bishop.isWithinChessboardBorders(nextSquare);
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

  private static isWithinChessboardBorders(position: Square): boolean {
    const columnNumber = columns.indexOf(position.column);
    return columnNumber < BOARDSIZE && columnNumber >= 0 && position.row <= BOARDSIZE && position.row > 0;
  }

  private checkIfOponent(position: Square, board: PiecePositions): boolean {
    return board.onPositionPiece(position)?.side !== this.side;
  }
}
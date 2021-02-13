import { columns, Row, Side, Square, Vector } from '../Types';
import { PiecePositions } from '../PiecesPositions';
import { BOARD_SIZE } from '../Constances';
import { King } from './King';

export abstract class Piece {
  protected constructor(public side: Side) {}

  abstract name: string;
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
      return this.checkIfNotSameColorPiece(nextSquare, board) ? [nextSquare] : [];
    } else {
      return [nextSquare].concat(this.lineMoves(board, nextSquare, vector));
    }
  }

  protected static isWithinChessboardBorders(position: Square): boolean {
    const columnNumber = columns.indexOf(position.column);
    return columnNumber < BOARD_SIZE && columnNumber >= 0 && position.row <= BOARD_SIZE && position.row > 0;
  }

  protected checkIfNotSameColorPiece(position: Square, board: PiecePositions): boolean {
    return board.onPositionPiece(position)?.side !== this.side;
  }

  isOpponentOf(anotherPiece: Piece): boolean {
    return anotherPiece.side !== this.side;
  }

  isKing(piece: Piece | undefined): piece is King {
    return piece !== undefined && piece.name === 'King';
  }
}

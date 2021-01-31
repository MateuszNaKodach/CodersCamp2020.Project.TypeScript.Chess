import { PiecePositions } from './PiecesPositions';
import { Piece } from './Piece';
import { SquareWithPiece, Square } from './Types';
import { PieceMoves } from './PieceMoves';

export class ChessBoard implements PieceMoves, PiecePositions {
  constructor(private boardWithPieces: SquareWithPiece) {}

  onPositionPiece(square: Square): Piece | undefined {
    return this.boardWithPieces[`${square.column}${square.row}`] ? this.boardWithPieces[`${square.column}${square.row}`] : undefined;
  }

  movePiece(squareFrom: Square, squareTo: Square): void {
    const piece = this.onPositionPiece(squareFrom);
    if (!piece) {
      throw new Error(`There is no piece on square!`);
    }
    delete this.boardWithPieces[`${squareFrom.column}${squareFrom.row}`];
    this.boardWithPieces[`${squareTo.column}${squareTo.row}`] = piece;
  }
}

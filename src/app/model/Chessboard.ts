import { PiecePositions } from './PiecesPositions';
import { Piece } from './Piece';
import { SquareWithPiece, Square } from './Types';
import { PieceMoves } from './PieceMoves';
import { PIECES_START_POSITION } from './Constances';

export class Chessboard implements PieceMoves, PiecePositions {
  constructor(public boardWithPieces: SquareWithPiece = PIECES_START_POSITION) {}

  onPositionPiece(square: Square): Piece | undefined {
    return this.boardWithPieces[`${square.column}${square.row}`];
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

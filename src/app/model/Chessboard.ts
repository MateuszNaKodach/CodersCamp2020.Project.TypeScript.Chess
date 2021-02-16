import { PiecePositions } from './PiecesPositions';
import { Piece } from './pieces';
import { Square, SquareWithPiece } from './Types';
import { PieceMoves } from './PieceMoves';
import { PIECES_START_POSITION } from './constances';

export class Chessboard implements PieceMoves, PiecePositions {
  constructor(public squaresWithPiece: SquareWithPiece = PIECES_START_POSITION) {}

  onPositionPiece(square: Square): Piece | undefined {
    return this.squaresWithPiece[`${square.column}${square.row}`];
  }

  movePiece(squareFrom: Square, squareTo: Square): void {
    const piece = this.onPositionPiece(squareFrom);
    if (!piece) {
      throw new Error(`There is no piece on square!`);
    }
    delete this.squaresWithPiece[`${squareFrom.column}${squareFrom.row}`];
    this.squaresWithPiece[`${squareTo.column}${squareTo.row}`] = piece;
  }

  removePiece(square: Square): void {
    delete this.squaresWithPiece[`${square.column}${square.row}`];
  }
}

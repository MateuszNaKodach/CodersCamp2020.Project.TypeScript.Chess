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
    // this.onPositionPiece(squareFrom ?
    //   this.boardWithPieces[`${squareFrom.column}${squareFrom.row}`] = this.boardWithPieces[`${squareTo.column}${squareTo.row}`] :
    //   () => {throw Error(`There is no Piece on square!`)}();

    if (this.onPositionPiece(squareFrom)) {
      this.boardWithPieces[`${squareFrom.column}${squareFrom.row}`] = this.boardWithPieces[`${squareTo.column}${squareTo.row}`];
    } else {
      throw new Error(`There is no Piece on square!`);
    }
  }
}

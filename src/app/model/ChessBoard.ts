import { PiecePositions } from './PiecesPositions';
import { Piece } from './Piece';
import { SquareWithPiece, Square } from './Types';
import { PieceMoves } from './PieceMoves';

export class ChessBoard implements PieceMoves, PiecePositions {
  constructor(private boardWithPieces: SquareWithPiece) {}

  onPositionPiece(square: Square): Piece | undefined {
    // if (!this.boardWithPieces[`${square.column}${square.row}`]) {
    //   return this.boardWithPieces[`${square.column}${square.row}`]
    // }
    // return;
    return this.boardWithPieces[`${square.column}${square.row}`] ? this.boardWithPieces[`${square.column}${square.row}`] : undefined;
  }

  movePiece(piece: Piece, squareFrom: Square, squareTo: Square): void {
    // to implement
  }
}

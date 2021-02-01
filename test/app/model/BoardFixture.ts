import { PiecePositions } from '../../../src/app/model/PiecesPositions';
import { Square } from '../../../src/app/model/Types';
import { Piece } from '../../../src/app/model/Piece';

export const emptyBoard: PiecePositions = { onPositionPiece: (square: Square) => undefined };
export type SquareWithPiece = { [key: string]: Piece };

export const boardWithPieces: (squaresWithPiece: SquareWithPiece) => PiecePositions = (squaresWithPiece) => {
  return {
    onPositionPiece: (square: Square) => squaresWithPiece[`${square.column}${square.row}`],
  };
};

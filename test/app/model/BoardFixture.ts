import { Board } from '../../../src/app/model/Board';
import { Square } from '../../../src/app/model/Types';
import { Piece } from '../../../src/app/model/Piece';

export const emptyBoard: Board = { onPositionPiece: (square: Square) => null };
export type SquareWithPiece = { [key: string]: Piece };

export const boardWithPieces: (squaresWithPiece: SquareWithPiece) => Board = (squaresWithPiece) => {
  return {
    onPositionPiece: (square: Square) => {
      const pieceOnSquare = squaresWithPiece[`${square.column}${square.row}`];
      return pieceOnSquare ? pieceOnSquare : null;
    },
  };
};

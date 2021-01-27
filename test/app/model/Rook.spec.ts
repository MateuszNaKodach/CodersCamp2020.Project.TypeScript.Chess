import { Rook } from '../../../src/app/model/Rook';
import { Square } from '../../../src/app/model/Types';
import { Board } from '../../../src/app/model/Board';
import 'jest-extended';
import { Piece } from '../../../src/app/model/Piece';

describe('Rook movement', () => {
  it("Check possible squares to go, when Rook is on A1 and there is no pieces on Roook's way", () => {
    const possibleMovesWhenRookOnA1 = [
      { column: 'B', row: 1 },
      { column: 'C', row: 1 },
      { column: 'D', row: 1 },
      { column: 'E', row: 1 },
      { column: 'F', row: 1 },
      { column: 'G', row: 1 },
      { column: 'H', row: 1 },
      { column: 'A', row: 2 },
      { column: 'A', row: 3 },
      { column: 'A', row: 4 },
      { column: 'A', row: 5 },
      { column: 'A', row: 6 },
      { column: 'A', row: 7 },
      { column: 'A', row: 8 },
    ];
    const rook = new Rook('1', 'WHITE');
    const rockPosition: Square = { column: 'A', row: 1 };

    const rockPossibleMoves = rook.possibleMoves(rockPosition, emptyBoard);

    expect(rockPossibleMoves).toIncludeSameMembers(possibleMovesWhenRookOnA1);
  });

  it("Check possible squares to go, when Rook is on D4 and there is no pieces on Roook's way", () => {
    const possibleMovesWhenRookOnD4 = [
      { column: 'D', row: 8 },
      { column: 'D', row: 7 },
      { column: 'D', row: 6 },
      { column: 'D', row: 5 },
      { column: 'D', row: 3 },
      { column: 'D', row: 2 },
      { column: 'D', row: 1 },
      { column: 'A', row: 4 },
      { column: 'B', row: 4 },
      { column: 'C', row: 4 },
      { column: 'E', row: 4 },
      { column: 'F', row: 4 },
      { column: 'G', row: 4 },
      { column: 'H', row: 4 },
    ];
    const rook = new Rook('1', 'WHITE');
    const rockPosition: Square = { column: 'D', row: 4 };

    const rockPossibleMoves = rook.possibleMoves(rockPosition, emptyBoard);

    expect(rockPossibleMoves).toIncludeSameMembers(possibleMovesWhenRookOnD4);
  });

  it('Check possible squares to go, when Rook is on D4 and there are some pieces on D7 and F4', () => {
    const board = boardWithPieces({
      D7: { id: '10', side: 'BLACK' },
      F4: { id: '11', side: 'WHITE' },
    });
    const possibleMovesWhenRookOnD4 = [
      { column: 'D', row: 7 },
      { column: 'D', row: 6 },
      { column: 'D', row: 5 },
      { column: 'D', row: 3 },
      { column: 'D', row: 2 },
      { column: 'D', row: 1 },
      { column: 'A', row: 4 },
      { column: 'B', row: 4 },
      { column: 'C', row: 4 },
      { column: 'E', row: 4 },
    ];
    const rook = new Rook('1', 'WHITE');
    const rockPosition: Square = { column: 'D', row: 4 };

    const rockPossibleMoves = rook.possibleMoves(rockPosition, board);

    expect(rockPossibleMoves).toIncludeSameMembers(possibleMovesWhenRookOnD4);
  });
});

const emptyBoard: Board = { onPositionPiece: (square: Square) => null };
type SquareWithPiece = { [key: string]: Piece };

const boardWithPieces: (squaresWithPiece: SquareWithPiece) => Board = (squaresWithPiece) => {
  return {
    onPositionPiece: (square: Square) => {
      const pieceOnSquare = squaresWithPiece[`${square.column}${square.row}`];
      return pieceOnSquare ? pieceOnSquare : null;
    },
  };
};

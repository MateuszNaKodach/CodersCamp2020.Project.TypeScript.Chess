import 'jest-extended';
import { boardWithPieces, emptyBoard } from './BoardFixture';
import { Side, Square } from '../../../src/app/model/Types';
import { Bishop } from '../../../src/app/model/Bishop';
import { Piece } from '../../../src/app/model/Piece';

describe('Bishop possible moves', () => {
  it('When Bishop is on D4 and there is no pieces on its way', () => {
    const whiteBishop = new Bishop(Side.WHITE);
    const whiteBishopPosition: Square = { column: 'D', row: 4 };
    const expectedBishopPossibleMoves = [
      { column: 'C', row: 5 },
      { column: 'B', row: 6 },
      { column: 'A', row: 7 },
      { column: 'E', row: 5 },
      { column: 'F', row: 6 },
      { column: 'G', row: 7 },
      { column: 'H', row: 8 },
      { column: 'C', row: 3 },
      { column: 'B', row: 2 },
      { column: 'A', row: 1 },
      { column: 'E', row: 3 },
      { column: 'F', row: 2 },
      { column: 'G', row: 1 },
    ];

    const bishopPossibleMoves = whiteBishop.possibleMoves(whiteBishopPosition, emptyBoard);

    expect(bishopPossibleMoves).toIncludeSameMembers(expectedBishopPossibleMoves);
  });
  it('When white Bishop is on starting position C1 and there are pieces all around', () => {
    const testBoard = boardWithPieces({
      B1: { side: Side.WHITE } as Piece,
      B2: { side: Side.WHITE } as Piece,
      C2: { side: Side.WHITE } as Piece,
      D1: { side: Side.WHITE } as Piece,
      D2: { side: Side.WHITE } as Piece,
    });
    const whiteBishopPosition: Square = { column: 'C', row: 1 };
    const whiteBishop = new Bishop(Side.WHITE);
    const bishopPossibleMoves = whiteBishop.possibleMoves(whiteBishopPosition, testBoard);

    expect(bishopPossibleMoves).toBeEmpty();
  });
  it('When white Bishop is on D4 on given test board', () => {
    const testBoard = boardWithPieces({
      B2: { side: Side.WHITE } as Piece,
      C5: { side: Side.WHITE } as Piece,
      G7: { side: Side.BLACK } as Piece,
    });
    const whiteBishop = new Bishop(Side.WHITE);
    const whiteBishopPosition: Square = { column: 'D', row: 4 };
    const expectedBishopPossibleMoves = [
      { column: 'C', row: 3 },
      { column: 'E', row: 5 },
      { column: 'F', row: 6 },
      { column: 'G', row: 7 },
      { column: 'E', row: 3 },
      { column: 'F', row: 2 },
      { column: 'G', row: 1 },
    ];

    const bishopPossibleMoves = whiteBishop.possibleMoves(whiteBishopPosition, testBoard);

    expect(bishopPossibleMoves).toIncludeSameMembers(expectedBishopPossibleMoves);
  });

  it('When white Bishop is on starting position C1 and other pieces are not blocking his diagonal moves', () => {
    const testBoard = boardWithPieces({
      B1: { side: Side.WHITE } as Piece,
      C2: { side: Side.WHITE } as Piece,
      D1: { side: Side.WHITE } as Piece,
    });
    const whiteBishop = new Bishop(Side.WHITE);
    const whiteBishopPosition: Square = { column: 'C', row: 1 };
    const expectedBishopPossibleMoves = [
      { column: 'B', row: 2 },
      { column: 'A', row: 3 },
      { column: 'D', row: 2 },
      { column: 'E', row: 3 },
      { column: 'F', row: 4 },
      { column: 'G', row: 5 },
      { column: 'H', row: 6 },
    ];

    const bishopPossibleMoves = whiteBishop.possibleMoves(whiteBishopPosition, testBoard);

    expect(bishopPossibleMoves).toIncludeSameMembers(expectedBishopPossibleMoves);
  });
  it('When white Bishop is on starting position C1 and other pieces are not blocking his left diagonal moves', () => {
    const testBoard = boardWithPieces({
      D2: { side: Side.WHITE } as Piece,
    });
    const whiteBishop = new Bishop(Side.WHITE);
    const whiteBishopPosition: Square = { column: 'C', row: 1 };
    const expectedBishopPossibleMoves = [
      { column: 'B', row: 2 },
      { column: 'A', row: 3 },
    ];

    const bishopPossibleMoves = whiteBishop.possibleMoves(whiteBishopPosition, testBoard);

    expect(bishopPossibleMoves).toIncludeSameMembers(expectedBishopPossibleMoves);
  });
});

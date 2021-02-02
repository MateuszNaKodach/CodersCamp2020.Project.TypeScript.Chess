import 'jest-extended';
import { boardWithPieces, emptyBoard } from './BoardFixture';
import { Side, Square } from '../../../src/app/model/Types';
import { Queen } from '../../../src/app/model/Queen';
import { Piece } from '../../../src/app/model/Piece';

describe('Queen possible moves', () => {
  it('When Queen is on D4 and there is no pieces on Queens way', () => {
    const whiteQueen = new Queen(Side.WHITE);
    const whiteQueenPosition: Square = { column: 'D', row: 4 };
    const expectedQueenPossibleMoves = [
      { column: 'D', row: 1 },
      { column: 'D', row: 2 },
      { column: 'D', row: 3 },
      { column: 'D', row: 5 },
      { column: 'D', row: 6 },
      { column: 'D', row: 7 },
      { column: 'D', row: 8 },
      { column: 'A', row: 4 },
      { column: 'B', row: 4 },
      { column: 'C', row: 4 },
      { column: 'E', row: 4 },
      { column: 'F', row: 4 },
      { column: 'G', row: 4 },
      { column: 'H', row: 4 },
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

    const queenPossibleMoves = whiteQueen.possibleMoves(whiteQueenPosition, emptyBoard);

    expect(queenPossibleMoves).toIncludeSameMembers(expectedQueenPossibleMoves);
  });
  it('When white Queen is on starting position D1 and there are pieces all around', () => {
    const testBoard = boardWithPieces({
      C1: { side: Side.WHITE } as Piece,
      C2: { side: Side.WHITE } as Piece,
      D2: { side: Side.WHITE } as Piece,
      E1: { side: Side.WHITE } as Piece,
      E2: { side: Side.WHITE } as Piece,
    });
    const whiteQueen = new Queen(Side.WHITE);
    const whiteQueenPosition: Square = { column: 'D', row: 1 };

    const queenPossibleMoves = whiteQueen.possibleMoves(whiteQueenPosition, testBoard);

    expect(queenPossibleMoves).toBeEmpty();
  });
  it('When white Queen is on D4 on given test board', () => {
    const testBoard = boardWithPieces({
      C3: { side: Side.WHITE } as Piece,
      B4: { side: Side.WHITE } as Piece,
      C5: { side: Side.WHITE } as Piece,
      D6: { side: Side.WHITE } as Piece,
      E5: { side: Side.BLACK } as Piece,
      F4: { side: Side.BLACK } as Piece,
      E3: { side: Side.BLACK } as Piece,
      D2: { side: Side.BLACK } as Piece,
    });
    const whiteQueen = new Queen(Side.WHITE);
    const whiteQueenPosition: Square = { column: 'D', row: 4 };
    const expectedQueenPossibleMoves = [
      { column: 'C', row: 4 },
      { column: 'D', row: 5 },
      { column: 'D', row: 3 },
      { column: 'D', row: 2 },
      { column: 'E', row: 5 },
      { column: 'E', row: 4 },
      { column: 'E', row: 3 },
      { column: 'F', row: 4 },
    ];

    const queenPossibleMoves = whiteQueen.possibleMoves(whiteQueenPosition, testBoard);

    expect(queenPossibleMoves).toIncludeSameMembers(expectedQueenPossibleMoves);
  });
  it('When white Queen is on D5 and there are black pieces on D7 and D8', () => {
    const testBoard = boardWithPieces({
      D7: { side: Side.BLACK } as Piece,
      D8: { side: Side.BLACK } as Piece,
    });
    const whiteQueen = new Queen(Side.WHITE);
    const whiteQueenPosition: Square = { column: 'D', row: 5 };
    const expectedQueenPossibleMoves = [
      { column: 'D', row: 6 },
      { column: 'D', row: 7 },
    ];
    const invalidMove = [{ column: 'D', row: 8 }];

    const queenPossibleMoves = whiteQueen.possibleMoves(whiteQueenPosition, testBoard);

    expect(queenPossibleMoves).toIncludeAllMembers(expectedQueenPossibleMoves);
    expect(queenPossibleMoves).not.toIncludeAllMembers(invalidMove);
  });
  it('When white Queen is on starting position D1 and other pieces are not blocking her diagonal moves', () => {
    const testBoard = boardWithPieces({
      D2: { side: Side.WHITE } as Piece,
      C1: { side: Side.WHITE } as Piece,
      E1: { side: Side.WHITE } as Piece,
    });
    const whiteQueen = new Queen(Side.WHITE);
    const whiteQueenPosition: Square = { column: 'D', row: 1 };
    const expectedQueenPossibleMoves = [
      { column: 'A', row: 4 },
      { column: 'B', row: 3 },
      { column: 'C', row: 2 },
      { column: 'E', row: 2 },
      { column: 'F', row: 3 },
      { column: 'G', row: 4 },
      { column: 'H', row: 5 },
    ];

    const queenPossibleMoves = whiteQueen.possibleMoves(whiteQueenPosition, testBoard);

    expect(queenPossibleMoves).toIncludeSameMembers(expectedQueenPossibleMoves);
  });
  it('When white Queen is on starting position D1 and other pieces are not blocking her left diagonal moves', () => {
    const testBoard = boardWithPieces({
      D2: { side: Side.WHITE } as Piece,
      C1: { side: Side.WHITE } as Piece,
      E1: { side: Side.WHITE } as Piece,
      E2: { side: Side.WHITE } as Piece,
    });
    const whiteQueen = new Queen(Side.WHITE);
    const whiteQueenPosition: Square = { column: 'D', row: 1 };
    const expectedQueenPossibleMoves = [
      { column: 'A', row: 4 },
      { column: 'B', row: 3 },
      { column: 'C', row: 2 },
    ];

    const queenPossibleMoves = whiteQueen.possibleMoves(whiteQueenPosition, testBoard);

    expect(queenPossibleMoves).toIncludeSameMembers(expectedQueenPossibleMoves);
  });
});

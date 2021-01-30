import 'jest-extended';
import { boardWithPieces, emptyBoard } from './BoardFixture';
import { Square } from '../../../src/app/model/Types';
import { Queen } from '../../../src/app/model/Queen';

describe('Queen possible moves', () => {
  it('When Queen is on D4 and there is no pieces on Queens way', () => {
    const whiteQueen = new Queen('useless', 'WHITE');
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
      C1: { id: '', side: 'WHITE' },
      C2: { id: '', side: 'WHITE' },
      D2: { id: '', side: 'WHITE' },
      E1: { id: '', side: 'WHITE' },
      E2: { id: '', side: 'WHITE' },
    });
    const whiteQueen = new Queen('useless', 'WHITE');
    const whiteQueenPosition: Square = { column: 'D', row: 1 };

    const queenPossibleMoves = whiteQueen.possibleMoves(whiteQueenPosition, testBoard);

    expect(queenPossibleMoves).toBeEmpty();
  });
  it('When white Queen is on D4 on given test board', () => {
    const testBoard = boardWithPieces({
      C3: { id: '', side: 'WHITE' },
      B4: { id: '', side: 'WHITE' },
      C5: { id: '', side: 'WHITE' },
      D6: { id: '', side: 'WHITE' },
      E5: { id: '', side: 'BLACK' },
      F4: { id: '', side: 'BLACK' },
      E3: { id: '', side: 'BLACK' },
      D2: { id: '', side: 'BLACK' },
    });
    const whiteQueen = new Queen('useless', 'WHITE');
    const whiteQueenPosition: Square = { column: 'D', row: 1 };
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
      C3: { id: '', side: 'WHITE' },
      B4: { id: '', side: 'WHITE' },
      C5: { id: '', side: 'WHITE' },
      D6: { id: '', side: 'WHITE' },
      E5: { id: '', side: 'BLACK' },
      F4: { id: '', side: 'BLACK' },
      E3: { id: '', side: 'BLACK' },
      D2: { id: '', side: 'BLACK' },
    });
    const whiteQueen = new Queen('useless', 'WHITE');
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
});

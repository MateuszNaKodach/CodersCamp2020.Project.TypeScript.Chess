import { Pawn } from '../../../src/app/model/Pawn';
import { Square } from '../../../src/app/model/Types';
import { Board } from '../../../src/app/model/Board';
import 'jest-extended';
import { boardWithPieces, emptyBoard } from './BoardFixture';

describe('Pawn movement', () => {
  it("Check possible squares to go, when White Pawn is on D4 and there is no pieces on Pawn's way", () => {
    const expectedPossibleMoves = [{ column: 'D', row: 5 }];

    const whitePawn = new Pawn('testId', 'WHITE');
    const whitePawnPosition: Square = { column: 'A', row: 1 };
    const whitePawnPossibleMoves = whitePawn.possibleMoves(whitePawnPosition, emptyBoard);

    expect(whitePawnPossibleMoves).toIncludeSameMembers(expectedPossibleMoves);
  });

  it("Check possible squares to go, when White Pawn is on D7 and there is no pieces on Pawn's way", () => {
    const expectedPossibleMoves = [{ column: 'D', row: 8 }];

    const whitePawn = new Pawn('testId', 'WHITE');
    const whitePawnPosition: Square = { column: 'D', row: 7 };
    const whitePawnPossibleMoves = whitePawn.possibleMoves(whitePawnPosition, emptyBoard);

    expect(whitePawnPossibleMoves).toIncludeSameMembers(expectedPossibleMoves);
  });

  it("Check possible squares to go, when White Pawn is on B4 and there is no pieces on Pawn's way and it's black piece on A5", () => {
    const testBoard = boardWithPieces({
      A5: { id: 'testId', side: 'BLACK' },
    });
    const expectedPossibleMoves = [
      { column: 'A', row: 5 },
      { column: 'B', row: 5 },
    ];

    const whitePawn = new Pawn('testId', 'WHITE');
    const whitePawnPosition: Square = { column: 'B', row: 4 };
    const whitePawnPossibleMoves = whitePawn.possibleMoves(whitePawnPosition, testBoard);

    expect(whitePawnPossibleMoves).toIncludeSameMembers(expectedPossibleMoves);
  });

  it("Check possible squares to go, when White Pawn is on B4 and there is no pieces on Pawn's way and it's black piece on A5 and it's white piece on C5", () => {
    const testBoard = boardWithPieces({
      A5: { id: 'testId', side: 'BLACK' },
      C5: { id: 'testId', side: 'WHITE' },
    });

    const expectedPossibleMoves = [
      { column: 'A', row: 5 },
      { column: 'B', row: 5 },
    ];

    const whitePawn = new Pawn('testId', 'WHITE');
    const whitePawnPosition: Square = { column: 'B', row: 4 };
    const whitePawnPossibleMoves = whitePawn.possibleMoves(whitePawnPosition, testBoard);

    expect(whitePawnPossibleMoves).toIncludeSameMembers(expectedPossibleMoves);
  });
});

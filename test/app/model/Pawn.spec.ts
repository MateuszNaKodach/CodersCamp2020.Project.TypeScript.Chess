import { Pawn } from '../../../src/app/model/Pawn';
import { Square } from '../../../src/app/model/Types';
import { Board } from '../../../src/app/model/Board';
import 'jest-extended';
import { boardWithPieces, emptyBoard } from './BoardFixture';

describe('Pawn movement', () => {
  it("Check possible squares to go, when White Pawn is on D4 and there is no pieces on Pawn's way", () => {
    const expectedPossibleMoves = [{ column: 'D', row: 5 }];
    const whitePawn = new Pawn('testId', 'WHITE');
    const whitePawnPosition: Square = { column: 'D', row: 4 };
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

  it("Check possible squares to go, when White Pawn is on E2 and there is no pieces on Pawn's way", () => {
    const expectedPossibleMoves = [
      { column: 'E', row: 3 },
      { column: 'E', row: 4 },
    ];
    const whitePawn = new Pawn('testId', 'WHITE');
    const whitePawnPosition: Square = { column: 'E', row: 2 };
    const whitePawnPossibleMoves = whitePawn.possibleMoves(whitePawnPosition, emptyBoard);
    expect(whitePawnPossibleMoves).toIncludeSameMembers(expectedPossibleMoves);
  });

  it('Check possible squares to go, when White Pawn is on E2 and there is black piece on E3', () => {
    const testBoard = boardWithPieces({
      E3: { id: 'testId', side: 'BLACK' },
    });
    const expectedPossibleMoves = [] as Square[];
    const whitePawn = new Pawn('testId', 'WHITE');
    const whitePawnPosition: Square = { column: 'E', row: 2 };
    const whitePawnPossibleMoves = whitePawn.possibleMoves(whitePawnPosition, testBoard);
    expect(whitePawnPossibleMoves).toIncludeSameMembers(expectedPossibleMoves);
  });

  it('Check possible squares to go, when White Pawn is on E2 and there is black piece on E4', () => {
    const testBoard = boardWithPieces({
      E4: { id: 'testId', side: 'BLACK' },
    });
    const expectedPossibleMoves = [{ column: 'E', row: 3 }];
    const whitePawn = new Pawn('testId', 'WHITE');
    const whitePawnPosition: Square = { column: 'E', row: 2 };
    const whitePawnPossibleMoves = whitePawn.possibleMoves(whitePawnPosition, testBoard);
    expect(whitePawnPossibleMoves).toIncludeSameMembers(expectedPossibleMoves);
  });

  it('Check possible squares to go, when White Pawn is on E2 and there is black pieces on E4 and on C3', () => {
    const testBoard = boardWithPieces({
      E4: { id: 'testId', side: 'BLACK' },
      C3: { id: 'testId', side: 'BLACK' },
    });
    const expectedPossibleMoves = [{ column: 'E', row: 3 }];
    const whitePawn = new Pawn('testId', 'WHITE');
    const whitePawnPosition: Square = { column: 'E', row: 2 };
    const whitePawnPossibleMoves = whitePawn.possibleMoves(whitePawnPosition, testBoard);
    expect(whitePawnPossibleMoves).toIncludeSameMembers(expectedPossibleMoves);
  });

  it('Check possible squares to go, when White Pawn is on E2 and there is black pieces on E4 and on D3', () => {
    const testBoard = boardWithPieces({
      E4: { id: 'testId', side: 'BLACK' },
      D3: { id: 'testId', side: 'BLACK' },
    });
    const expectedPossibleMoves = [
      { column: 'E', row: 3 },
      { column: 'D', row: 3 },
    ];
    const whitePawn = new Pawn('testId', 'WHITE');
    const whitePawnPosition: Square = { column: 'E', row: 2 };
    const whitePawnPossibleMoves = whitePawn.possibleMoves(whitePawnPosition, testBoard);
    expect(whitePawnPossibleMoves).toIncludeSameMembers(expectedPossibleMoves);
  });

  it('Check possible squares to go, when White Pawn is on E2 and there is black piece on E4 and white piece on D3', () => {
    const testBoard = boardWithPieces({
      D3: { id: 'testId', side: 'WHITE' },
      E4: { id: 'testId', side: 'BLACK' },
    });
    const expectedPossibleMoves = [{ column: 'E', row: 3 }];
    const whitePawn = new Pawn('testId', 'WHITE');
    const whitePawnPosition: Square = { column: 'E', row: 2 };
    const whitePawnPossibleMoves = whitePawn.possibleMoves(whitePawnPosition, testBoard);
    expect(whitePawnPossibleMoves).toIncludeSameMembers(expectedPossibleMoves);
  });

  it("Check possible squares to go, when BLACK Pawn is on E2 and there is no pieces on Pawn's way", () => {
    const testBoard = emptyBoard;
    const expectedPossibleMoves = [{ column: 'E', row: 1 }];
    const pawn = new Pawn('testId', 'BLACK');
    const pawnPosition: Square = { column: 'E', row: 2 };
    const pawnPossibleMoves = pawn.possibleMoves(pawnPosition, testBoard);
    expect(pawnPossibleMoves).toIncludeSameMembers(expectedPossibleMoves);
  });

  it("Check possible squares to go, when BLACK Pawn is on E7 and there is no pieces on Pawn's way", () => {
    const testBoard = emptyBoard;
    const expectedPossibleMoves = [
      { column: 'E', row: 6 },
      { column: 'E', row: 5 },
    ];
    const pawn = new Pawn('testId', 'BLACK');
    const pawnPosition: Square = { column: 'E', row: 7 };
    const pawnPossibleMoves = pawn.possibleMoves(pawnPosition, testBoard);
    expect(pawnPossibleMoves).toIncludeSameMembers(expectedPossibleMoves);
  });

  it('Check possible squares to go, when BLACK Pawn is on E7 and there is black piece on E6', () => {
    const testBoard = emptyBoard;
    const expectedPossibleMoves = [] as Square[];
    const pawn = new Pawn('testId', 'BLACK');
    const pawnPosition: Square = { column: 'E', row: 7 };
    const pawnPossibleMoves = pawn.possibleMoves(pawnPosition, testBoard);
    expect(pawnPossibleMoves).toIncludeSameMembers(expectedPossibleMoves);
  });

  it('Check possible squares to go, when BLACK Pawn is on E7 and there is black piece on E5', () => {
    const testBoard = emptyBoard;
    const expectedPossibleMoves = [{ column: 'E', row: 6 }];
    const pawn = new Pawn('testId', 'BLACK');
    const pawnPosition: Square = { column: 'E', row: 7 };
    const pawnPossibleMoves = pawn.possibleMoves(pawnPosition, testBoard);
    expect(pawnPossibleMoves).toIncludeSameMembers(expectedPossibleMoves);
  });

  it('Check possible squares to go, when BLACK Pawn is on E7 and there is white piece on D6', () => {
    const testBoard = emptyBoard;
    const expectedPossibleMoves = [
      { column: 'E', row: 6 },
      { column: 'E', row: 5 },
      { column: 'D', row: 6 },
    ];
    const pawn = new Pawn('testId', 'BLACK');
    const pawnPosition: Square = { column: 'E', row: 7 };
    const pawnPossibleMoves = pawn.possibleMoves(pawnPosition, testBoard);
    expect(pawnPossibleMoves).toIncludeSameMembers(expectedPossibleMoves);
  });
});

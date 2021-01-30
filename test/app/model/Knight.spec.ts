import { Knight } from '../../../src/app/model/Knight';
import { Square } from '../../../src/app/model/Types';
import 'jest-extended';
import { boardWithPieces, emptyBoard } from './BoardFixture';

describe('Knight movement', () => {
  it("Check possible squares to go, when Knight is on F3 and there is no pieces on Knight's final movement squares", () => {
    const testPiece = new Knight('testId', 'WHITE');
    const testPiecePosition: Square = { column: 'F', row: 3 };

    const testPiecePossibleMoves = testPiece.possibleMoves(testPiecePosition, emptyBoard);

    const expectedPossibleMoves = [
      { column: 'D', row: 2 },
      { column: 'D', row: 4 },
      { column: 'E', row: 1 },
      { column: 'E', row: 5 },
      { column: 'G', row: 1 },
      { column: 'G', row: 5 },
      { column: 'H', row: 2 },
      { column: 'H', row: 4 },
    ];
    expect(testPiecePossibleMoves).toIncludeSameMembers(expectedPossibleMoves);
  });

  it("Check possible squares to go, when Knight is on C2 and there is no pieces on Knight's final movement squares", () => {
    const testPiece = new Knight('testId', 'WHITE');
    const testPiecePosition: Square = { column: 'C', row: 2 };

    const testPiecePossibleMoves = testPiece.possibleMoves(testPiecePosition, emptyBoard);

    const expectedPossibleMoves = [
      { column: 'A', row: 1 },
      { column: 'A', row: 3 },
      { column: 'B', row: 4 },
      { column: 'D', row: 4 },
      { column: 'E', row: 1 },
      { column: 'E', row: 3 },
    ];
    expect(testPiecePossibleMoves).toIncludeSameMembers(expectedPossibleMoves);
  });

  it("Check possible squares to go, when Knight is on B2 and there is no pieces on Knight's final movement squares", () => {
    const testPiece = new Knight('testId', 'WHITE');
    const testPiecePosition: Square = { column: 'B', row: 2 };

    const testPiecePossibleMoves = testPiece.possibleMoves(testPiecePosition, emptyBoard);

    const expectedPossibleMoves = [
      { column: 'A', row: 4 },
      { column: 'C', row: 4 },
      { column: 'D', row: 1 },
      { column: 'D', row: 3 },
    ];
    expect(testPiecePossibleMoves).toIncludeSameMembers(expectedPossibleMoves);
  });

  it("Check possible squares to go, when Knight is on F3 and there is no pieces on Knight's final movement squares but there are pieces directly around of Knight", () => {
    const testBoard = boardWithPieces({
      E2: { id: 'testId', side: 'WHITE' },
      E3: { id: 'testId', side: 'WHITE' },
      F4: { id: 'testId', side: 'BLACK' },
      F2: { id: 'testId', side: 'BLACK' },
      G2: { id: 'testId', side: 'BLACK' },
      G3: { id: 'testId', side: 'WHITE' },
    });
    const testPiece = new Knight('testId', 'WHITE');
    const testPiecePosition: Square = { column: 'F', row: 3 };

    const testPiecePossibleMoves = testPiece.possibleMoves(testPiecePosition, testBoard);

    const expectedPossibleMoves = [
      { column: 'C', row: 2 },
      { column: 'C', row: 4 },
      { column: 'E', row: 5 },
      { column: 'E', row: 1 },
      { column: 'G', row: 5 },
      { column: 'G', row: 1 },
      { column: 'H', row: 4 },
      { column: 'H', row: 2 },
    ];
    expect(testPiecePossibleMoves).toIncludeSameMembers(expectedPossibleMoves);
  });

  it("Check possible squares to go, when WHITE Knight is on F3 and there is WHITE piece on Knight's final movement square on D2", () => {
    const testBoard = boardWithPieces({
      D2: { id: 'testId', side: 'WHITE' },
    });
    const testPiece = new Knight('testId', 'WHITE');
    const testPiecePosition: Square = { column: 'F', row: 3 };

    const testPiecePossibleMoves = testPiece.possibleMoves(testPiecePosition, testBoard);

    const expectedPossibleMoves = [
      { column: 'D', row: 4 },
      { column: 'E', row: 1 },
      { column: 'E', row: 5 },
      { column: 'G', row: 1 },
      { column: 'G', row: 5 },
      { column: 'H', row: 4 },
      { column: 'H', row: 2 },
    ];
    expect(testPiecePossibleMoves).toIncludeSameMembers(expectedPossibleMoves);
  });

  it("Check possible squares to go, when WHITE Knight is on F3 and there is BLACK piece on Knight's final movement square on D2", () => {
    const testBoard = boardWithPieces({
      D2: { id: 'testId', side: 'WHITE' },
    });
    const testPiece = new Knight('testId', 'WHITE');
    const testPiecePosition: Square = { column: 'F', row: 3 };

    const testPiecePossibleMoves = testPiece.possibleMoves(testPiecePosition, testBoard);

    const expectedPossibleMoves = [
      { column: 'D', row: 2 },
      { column: 'D', row: 4 },
      { column: 'E', row: 1 },
      { column: 'E', row: 5 },
      { column: 'G', row: 1 },
      { column: 'G', row: 5 },
      { column: 'H', row: 4 },
      { column: 'H', row: 2 },
    ];
    expect(testPiecePossibleMoves).toIncludeSameMembers(expectedPossibleMoves);
  });

  it("Check possible squares to go, when BLACK Knight is on F3 and there is WHITE piece on Knight's final movement square on D2", () => {
    const testBoard = boardWithPieces({
      D2: { id: 'testId', side: 'WHITE' },
    });
    const testPiece = new Knight('testId', 'BLACK');
    const testPiecePosition: Square = { column: 'F', row: 3 };

    const testPiecePossibleMoves = testPiece.possibleMoves(testPiecePosition, testBoard);

    const expectedPossibleMoves = [
      { column: 'D', row: 2 },
      { column: 'D', row: 4 },
      { column: 'E', row: 1 },
      { column: 'E', row: 5 },
      { column: 'G', row: 1 },
      { column: 'G', row: 5 },
      { column: 'H', row: 4 },
      { column: 'H', row: 2 },
    ];
    expect(testPiecePossibleMoves).toIncludeSameMembers(expectedPossibleMoves);
  });

  it("Check possible squares to go, when BLACK Knight is on A1 and there is WHITE piece on Knight's final movement square on G6 and there are BLACK pieces on F6, F7, F8, H7", () => {
    const testBoard = boardWithPieces({
      G6: { id: 'testId', side: 'WHITE' },
      F6: { id: 'testId', side: 'BLACK' },
      F7: { id: 'testId', side: 'BLACK' },
      F8: { id: 'testId', side: 'BLACK' },
      H7: { id: 'testId', side: 'BLACK' },
    });
    const testPiece = new Knight('testId', 'BLACK');
    const testPiecePosition: Square = { column: 'A', row: 1 };

    const testPiecePossibleMoves = testPiece.possibleMoves(testPiecePosition, testBoard);

    const expectedPossibleMoves = [{ column: 'G', row: 6 }];
    expect(testPiecePossibleMoves).toIncludeSameMembers(expectedPossibleMoves);
  });

  it("Check possible squares to go, when BLACK Knight is on A1 and there is BLACK pieces on Knight's final movement squares on G6 and F7 - no movement", () => {
    const testBoard = boardWithPieces({
      G6: { id: 'testId', side: 'BLACK' },
      F6: { id: 'testId', side: 'BLACK' },
    });
    const testPiece = new Knight('testId', 'BLACK');
    const testPiecePosition: Square = { column: 'A', row: 1 };

    const testPiecePossibleMoves = testPiece.possibleMoves(testPiecePosition, testBoard);

    const expectedPossibleMoves = [] as Square[];
    expect(testPiecePossibleMoves).toIncludeSameMembers(expectedPossibleMoves);
  });
});

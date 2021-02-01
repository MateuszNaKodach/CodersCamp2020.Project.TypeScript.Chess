import { Knight } from '../../../src/app/model/Knight';
import { Side, Square } from '../../../src/app/model/Types';
import 'jest-extended';
import { boardWithPieces, emptyBoard } from './BoardFixture';

describe('Knight possible moves', () => {
  it("When Knight is on F3 and there is no pieces on Knight's final movement squares", () => {
    const testPiece = new Knight(Side.WHITE);
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

  it("When Knight is on C2 and there is no pieces on Knight's final movement squares", () => {
    const testPiece = new Knight(Side.WHITE);
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

  it("When Knight is on G7 and there is no pieces on Knight's final movement squares", () => {
    const testPiece = new Knight(Side.WHITE);
    const testPiecePosition: Square = { column: 'G', row: 7 };

    const testPiecePossibleMoves = testPiece.possibleMoves(testPiecePosition, emptyBoard);

    const expectedPossibleMoves = [
      { column: 'E', row: 6 },
      { column: 'E', row: 8 },
      { column: 'F', row: 5 },
      { column: 'H', row: 5 },
    ];
    expect(testPiecePossibleMoves).toIncludeSameMembers(expectedPossibleMoves);
  });

  it("When Knight is on B2 and there is no pieces on Knight's final movement squares", () => {
    const testPiece = new Knight(Side.WHITE);
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

  it("When Knight is on F3 and there is no pieces on Knight's final movement squares but there are pieces directly around of Knight", () => {
    const testBoard = boardWithPieces({
      E2: { side: Side.WHITE },
      E3: { side: Side.WHITE },
      F4: { side: Side.BLACK },
      F2: { side: Side.BLACK },
      G2: { side: Side.BLACK },
      G3: { side: Side.WHITE },
    });
    const testPiece = new Knight(Side.WHITE);
    const testPiecePosition: Square = { column: 'F', row: 3 };

    const testPiecePossibleMoves = testPiece.possibleMoves(testPiecePosition, testBoard);

    const expectedPossibleMoves = [
      { column: 'D', row: 2 },
      { column: 'D', row: 4 },
      { column: 'E', row: 5 },
      { column: 'E', row: 1 },
      { column: 'G', row: 5 },
      { column: 'G', row: 1 },
      { column: 'H', row: 4 },
      { column: 'H', row: 2 },
    ];
    expect(testPiecePossibleMoves).toIncludeSameMembers(expectedPossibleMoves);
  });

  it("When WHITE Knight is on F3 and there is WHITE piece on Knight's final movement square on D2", () => {
    const testBoard = boardWithPieces({
      D2: { side: Side.WHITE },
    });
    const testPiece = new Knight(Side.WHITE);
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

  it("When WHITE Knight is on F3 and there is BLACK piece on Knight's final movement square on D2", () => {
    const testBoard = boardWithPieces({
      D2: { side: Side.BLACK },
    });
    const testPiece = new Knight(Side.WHITE);
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

  it("When BLACK Knight is on F3 and there is WHITE piece on Knight's final movement square on D2", () => {
    const testBoard = boardWithPieces({
      D2: { side: Side.WHITE },
    });
    const testPiece = new Knight(Side.BLACK);
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

  it("When BLACK Knight is on F3 and there is WHITE piece on Knight's final movement square on G6 and there are BLACK pieces on F6, F7, F8, H7", () => {
    const testBoard = boardWithPieces({
      G6: { side: Side.WHITE },
      F6: { side: Side.BLACK },
      F7: { side: Side.BLACK },
      F8: { side: Side.BLACK },
      H7: { side: Side.BLACK },
    });
    const testPiece = new Knight(Side.BLACK);
    const testPiecePosition: Square = { column: 'H', row: 8 };

    const testPiecePossibleMoves = testPiece.possibleMoves(testPiecePosition, testBoard);

    const expectedPossibleMoves = [{ column: 'G', row: 6 }];
    expect(testPiecePossibleMoves).toIncludeSameMembers(expectedPossibleMoves);
  });

  it("When BLACK Knight is on H8 and there is BLACK pieces on Knight's final movement squares on G6 and F7 - no movement", () => {
    const testBoard = boardWithPieces({
      G6: { side: Side.BLACK },
      F7: { side: Side.BLACK },
    });
    const testPiece = new Knight(Side.BLACK);
    const testPiecePosition: Square = { column: 'H', row: 8 };

    const testPiecePossibleMoves = testPiece.possibleMoves(testPiecePosition, testBoard);

    expect(testPiecePossibleMoves).toBeEmpty();
  });
});

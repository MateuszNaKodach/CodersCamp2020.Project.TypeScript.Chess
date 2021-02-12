import { Pawn, Side, Square } from '../../../src/app/model';
import 'jest-extended';
import { boardWithPieces, emptyBoard } from './BoardFixture';

describe('Pawn movement', () => {
  it("Check possible squares to go, when White Pawn is on D4 and there is no pieces on Pawn's way", () => {
    const pawn = new Pawn(Side.WHITE);
    const pawnPosition: Square = { column: 'D', row: 4 };

    const pawnPossibleMoves = pawn.possibleMoves(pawnPosition, emptyBoard);

    const expectedPossibleMoves = [{ column: 'D', row: 5 }];
    expect(pawnPossibleMoves).toIncludeSameMembers(expectedPossibleMoves);
  });

  it("Check possible squares to go, when White Pawn is on D7 and there is no pieces on Pawn's way", () => {
    const pawn = new Pawn(Side.WHITE);
    const pawnPosition: Square = { column: 'D', row: 7 };

    const pawnPossibleMoves = pawn.possibleMoves(pawnPosition, emptyBoard);

    const expectedPossibleMoves = [{ column: 'D', row: 8 }];
    expect(pawnPossibleMoves).toIncludeSameMembers(expectedPossibleMoves);
  });

  it("Check possible squares to go, when White Pawn is on B4 and there is no pieces on Pawn's way and it's black piece on A5", () => {
    const testBoard = boardWithPieces({
      A5: new Pawn(Side.BLACK),
    });
    const pawn = new Pawn(Side.WHITE);
    const pawnPosition: Square = { column: 'B', row: 4 };

    const pawnPossibleMoves = pawn.possibleMoves(pawnPosition, testBoard);

    const expectedPossibleMoves = [
      { column: 'A', row: 5 },
      { column: 'B', row: 5 },
    ];
    expect(pawnPossibleMoves).toIncludeSameMembers(expectedPossibleMoves);
  });

  it("Check possible squares to go, when White Pawn is on B4 and there is no pieces on Pawn's way and it's black piece on A5 and it's white piece on C5", () => {
    const testBoard = boardWithPieces({
      A5: new Pawn(Side.BLACK),
      C5: new Pawn(Side.WHITE),
    });
    const pawn = new Pawn(Side.WHITE);
    const pawnPosition: Square = { column: 'B', row: 4 };

    const pawnPossibleMoves = pawn.possibleMoves(pawnPosition, testBoard);

    const expectedPossibleMoves = [
      { column: 'A', row: 5 },
      { column: 'B', row: 5 },
    ];
    expect(pawnPossibleMoves).toIncludeSameMembers(expectedPossibleMoves);
  });

  it("Check possible squares to go, when White Pawn is on E2 and there is no pieces on Pawn's way", () => {
    const pawn = new Pawn(Side.WHITE);
    const pawnPosition: Square = { column: 'E', row: 2 };

    const pawnPossibleMoves = pawn.possibleMoves(pawnPosition, emptyBoard);

    const expectedPossibleMoves = [
      { column: 'E', row: 3 },
      { column: 'E', row: 4 },
    ];
    expect(pawnPossibleMoves).toIncludeSameMembers(expectedPossibleMoves);
  });

  it('Check possible squares to go, when White Pawn is on E2 and there is black piece on E3', () => {
    const testBoard = boardWithPieces({
      E3: new Pawn(Side.BLACK),
    });
    const pawn = new Pawn(Side.WHITE);
    const pawnPosition: Square = { column: 'E', row: 2 };

    const pawnPossibleMoves = pawn.possibleMoves(pawnPosition, testBoard);

    const expectedPossibleMoves = [] as Square[];
    expect(pawnPossibleMoves).toIncludeSameMembers(expectedPossibleMoves);
  });

  it('Check possible squares to go, when White Pawn is on E2 and there is black piece on E4', () => {
    const testBoard = boardWithPieces({
      E4: new Pawn(Side.BLACK),
    });
    const pawn = new Pawn(Side.WHITE);
    const pawnPosition: Square = { column: 'E', row: 2 };

    const pawnPossibleMoves = pawn.possibleMoves(pawnPosition, testBoard);

    const expectedPossibleMoves = [{ column: 'E', row: 3 }];
    expect(pawnPossibleMoves).toIncludeSameMembers(expectedPossibleMoves);
  });

  it('Check possible squares to go, when White Pawn is on E2 and there is black pieces on E4 and on C3', () => {
    const testBoard = boardWithPieces({
      E4: new Pawn(Side.BLACK),
      C3: new Pawn(Side.BLACK),
    });
    const pawn = new Pawn(Side.WHITE);
    const pawnPosition: Square = { column: 'E', row: 2 };

    const pawnPossibleMoves = pawn.possibleMoves(pawnPosition, testBoard);

    const expectedPossibleMoves = [{ column: 'E', row: 3 }];
    expect(pawnPossibleMoves).toIncludeSameMembers(expectedPossibleMoves);
  });

  it('Check possible squares to go, when White Pawn is on E2 and there is black pieces on E4 and on D3', () => {
    const testBoard = boardWithPieces({
      E4: new Pawn(Side.BLACK),
      D3: new Pawn(Side.BLACK),
    });
    const pawn = new Pawn(Side.WHITE);
    const pawnPosition: Square = { column: 'E', row: 2 };

    const pawnPossibleMoves = pawn.possibleMoves(pawnPosition, testBoard);

    const expectedPossibleMoves = [
      { column: 'E', row: 3 },
      { column: 'D', row: 3 },
    ];
    expect(pawnPossibleMoves).toIncludeSameMembers(expectedPossibleMoves);
  });

  it('Check possible squares to go, when White Pawn is on E2 and there is black piece on E4 and white piece on D3', () => {
    const testBoard = boardWithPieces({
      D3: new Pawn(Side.WHITE),
      E4: new Pawn(Side.BLACK),
    });
    const pawn = new Pawn(Side.WHITE);
    const pawnPosition: Square = { column: 'E', row: 2 };

    const pawnPossibleMoves = pawn.possibleMoves(pawnPosition, testBoard);

    const expectedPossibleMoves = [{ column: 'E', row: 3 }];
    expect(pawnPossibleMoves).toIncludeSameMembers(expectedPossibleMoves);
  });

  it("Check possible squares to go, when BLACK Pawn is on E2 and there is no pieces on Pawn's way", () => {
    const testBoard = emptyBoard;
    const pawn = new Pawn(Side.BLACK);
    const pawnPosition: Square = { column: 'E', row: 2 };

    const pawnPossibleMoves = pawn.possibleMoves(pawnPosition, testBoard);

    const expectedPossibleMoves = [{ column: 'E', row: 1 }];
    expect(pawnPossibleMoves).toIncludeSameMembers(expectedPossibleMoves);
  });

  it("Check possible squares to go, when BLACK Pawn is on E7 and there is no pieces on Pawn's way", () => {
    const testBoard = emptyBoard;
    const pawn = new Pawn(Side.BLACK);
    const pawnPosition: Square = { column: 'E', row: 7 };

    const pawnPossibleMoves = pawn.possibleMoves(pawnPosition, testBoard);

    const expectedPossibleMoves = [
      { column: 'E', row: 6 },
      { column: 'E', row: 5 },
    ];
    expect(pawnPossibleMoves).toIncludeSameMembers(expectedPossibleMoves);
  });

  it('Check possible squares to go, when BLACK Pawn is on E7 and there is black piece on E6', () => {
    const testBoard = boardWithPieces({
      E6: new Pawn(Side.BLACK),
    });
    const pawn = new Pawn(Side.BLACK);
    const pawnPosition: Square = { column: 'E', row: 7 };

    const pawnPossibleMoves = pawn.possibleMoves(pawnPosition, testBoard);

    const expectedPossibleMoves = [] as Square[];
    expect(pawnPossibleMoves).toIncludeSameMembers(expectedPossibleMoves);
  });

  it('Check possible squares to go, when BLACK Pawn is on E7 and there is black piece on E5', () => {
    const testBoard = boardWithPieces({
      E5: new Pawn(Side.BLACK),
    });
    const pawn = new Pawn(Side.BLACK);
    const pawnPosition: Square = { column: 'E', row: 7 };

    const pawnPossibleMoves = pawn.possibleMoves(pawnPosition, testBoard);

    const expectedPossibleMoves = [{ column: 'E', row: 6 }];
    expect(pawnPossibleMoves).toIncludeSameMembers(expectedPossibleMoves);
  });

  it('Check possible squares to go, when BLACK Pawn is on E7 and there is white piece on D6', () => {
    const testBoard = boardWithPieces({
      D6: new Pawn(Side.WHITE),
    });
    const pawn = new Pawn(Side.BLACK);
    const pawnPosition: Square = { column: 'E', row: 7 };

    const pawnPossibleMoves = pawn.possibleMoves(pawnPosition, testBoard);

    const expectedPossibleMoves = [
      { column: 'E', row: 6 },
      { column: 'E', row: 5 },
      { column: 'D', row: 6 },
    ];
    expect(pawnPossibleMoves).toIncludeSameMembers(expectedPossibleMoves);
  });
});

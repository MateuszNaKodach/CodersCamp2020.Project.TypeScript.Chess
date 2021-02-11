import 'jest-extended';
import { boardWithPieces, emptyBoard } from './BoardFixture';
import { Side, Square } from '../../../src/app/model';
import { Knight, Pawn, King } from '../../../src/app/model';

describe("King's possible moves", () => {
  it('When king is on E1, not surrounded by any piece and all possible moves are legal (none of squares is checked)', () => {
    const whiteKing = new King(Side.WHITE);
    const whiteKingPosition: Square = { column: 'E', row: 1 };
    const kingPossibleMoves = whiteKing.possibleMoves(whiteKingPosition, emptyBoard);

    const expectedKingPossibleMoves = [
      { column: 'D', row: 1 },
      { column: 'D', row: 2 },
      { column: 'E', row: 2 },
      { column: 'F', row: 1 },
      { column: 'F', row: 2 },
    ];
    expect(kingPossibleMoves).toIncludeSameMembers(expectedKingPossibleMoves);
  });

  it('When white king is on H1 and there are some white pieces around it', () => {
    const testBoard = boardWithPieces({
      G2: new Pawn(Side.WHITE),
      H2: new Pawn(Side.WHITE),
    });
    const whiteKing = new King(Side.WHITE);
    const whiteKingPosition: Square = { column: 'H', row: 1 };
    const kingPossibleMoves = whiteKing.possibleMoves(whiteKingPosition, testBoard);

    expect(kingPossibleMoves).toIncludeSameMembers([{ column: 'G', row: 1 }]);
  });

  it('When black king is on F6, surrounded by some pieces and all possible moves are legal (none of squares is checked)', () => {
    const testBoard = boardWithPieces({
      E7: new Knight(Side.BLACK),
      F7: new Pawn(Side.BLACK),
      G7: new Pawn(Side.BLACK),
      F5: new Knight(Side.WHITE),
      G6: new Pawn(Side.WHITE),
    });
    const blackKing = new King(Side.BLACK);
    const blackKingPosition: Square = { column: 'F', row: 6 };
    const kingPossibleMoves = blackKing.possibleMoves(blackKingPosition, testBoard);

    const expectedKingPossibleMoves = [
      { column: 'E', row: 5 },
      { column: 'E', row: 6 },
      { column: 'F', row: 5 },
      { column: 'G', row: 5 },
      { column: 'G', row: 6 },
    ];
    expect(kingPossibleMoves).toIncludeSameMembers(expectedKingPossibleMoves);
  });
});

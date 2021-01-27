import { Pawn } from '../../../src/app/model/Pawn';
import { Square } from '../../../src/app/model/Types';
import { Board } from '../../../src/app/model/Board';
import 'jest-extended';

describe('Rook movement', () => {
  const mockOnPositionPiece = jest.fn();
  const board: Board = { onPositionPiece: mockOnPositionPiece };

  it("Check possible squares to go, when White Pawn is on D4 and there is no pieces on Pawn's way", () => {
    mockOnPositionPiece.mockReturnValue(null);

    const possibleMovesWhenWhitePawnOnD4 = [{ column: 'D', row: 5 }];

    const whitePawn = new Pawn('wPawn4', 'WHITE');
    const whitePawnPosition: Square = { column: 'A', row: 1 };

    const whitePawnPossibleMoves = whitePawn.possibleMoves(whitePawnPosition, board);

    expect(whitePawnPossibleMoves).toIncludeSameMembers(possibleMovesWhenWhitePawnOnD4);
  });
});

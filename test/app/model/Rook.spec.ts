import { Rook } from '../../../src/app/model/Rook';
import { Square } from '../../../src/app/model/Types';
import { Board } from '../../../src/app/model/Board';

describe('Rook movement', () => {
  it('Check possible squares to go, when Rook is on A1', () => {
    const mockOnPositionPiece = jest.fn();
    const board: Board = { onPositionPiece: mockOnPositionPiece };
    mockOnPositionPiece.mockReturnValue(null);
    const possibleMovesWhenRookOnA1 = [
      { column: 'A', row: 2 },
      { column: 'A', row: 3 },
      { column: 'A', row: 4 },
      { column: 'A', row: 5 },
      { column: 'A', row: 6 },
      { column: 'A', row: 7 },
      { column: 'A', row: 8 },
      { column: 'B', row: 1 },
      { column: 'C', row: 1 },
      { column: 'D', row: 1 },
      { column: 'E', row: 1 },
      { column: 'F', row: 1 },
      { column: 'G', row: 1 },
      { column: 'H', row: 1 },
    ];
    const rook = new Rook('1', 'WHITE');
    const rockPosition: Square = { column: 'A', row: 1 };

    const rockPossibleMoves = rook.possibleMoves(rockPosition, board);

    expect(rockPossibleMoves).toMatchObject(possibleMovesWhenRookOnA1);
  });
});

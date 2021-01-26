import { Rook } from '../../../src/app/model/Rook';
import { Square, Row, Column } from '../../../src/app/model/Types';
import { Board } from '../../../src/app/model/Board';
import { Piece } from '../../../src/app/model/Piece';

describe('Rook movement', () => {
  it('Check possibles values, when Rook is on A1', () => {
    const mockOnPositionPiece = jest.fn();
    const board: Board = { onPositionPiece: mockOnPositionPiece };
    mockOnPositionPiece.mockReturnValue(null);

    const rook = new Rook('1', 'WHITE');
    const rockPosition: Square = { column: 'A', row: 1 };

    const rockPossibleMoves = rook.possibleMoves(rockPosition, board);

    expect(rockPossibleMoves).toBe('here will go Square[] with possible moves to go');
  });
});

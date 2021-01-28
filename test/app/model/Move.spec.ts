import { Board } from '../../../src/app/model/Board';
import { Move } from '../../../src/app/model/Move';
import { Piece } from '../../../src/app/model/Piece';
import { Square } from '../../../src/app/model/Types';

describe('Piece movement', () => {
  const mockOnPositionPiece = jest.fn();
  const board: Board = { onPositionPiece: mockOnPositionPiece };

  it('from A2 --> A3', () => {
    const piece: Piece = { id: '1', side: 'WHITE' };
    const squareFrom: Square = { column: 'A', row: 2 };
    const squareTo: Square = { column: 'A', row: 3 };
    const move = new Move();

    move.movePiece(piece, squareFrom, squareTo, board);

    expect(board.onPositionPiece(squareFrom)).toBe(null);
    expect(board.onPositionPiece(squareTo)).toMatchObject(piece);
  });

  it('from A2 --> A3 --> A4', () => {
    const piece: Piece = { id: '1', side: 'WHITE' };
    const squareFrom: Square = { column: 'A', row: 2 };
    const squareByWay: Square = { column: 'A', row: 3 };
    const squareTo: Square = { column: 'A', row: 4 };
    const move = new Move();

    move.movePiece(piece, squareFrom, squareByWay, board);
    move.movePiece(piece, squareByWay, squareTo, board);

    expect(board.onPositionPiece(squareFrom)).toBe(null);
    expect(board.onPositionPiece(squareByWay)).toBe(null);
    expect(board.onPositionPiece(squareTo)).toMatchObject(piece);
  });

  it('from square where is nothing (A2 is empty)', () => {
    const piece: Piece = { id: '1', side: 'WHITE' };
    const squareFrom: Square = { column: 'A', row: 2 };
    const squareTo: Square = { column: 'A', row: 3 };
    const move = new Move();

    move.movePiece(piece, squareFrom, squareTo, board);

    expect(board.onPositionPiece(squareFrom)).toThrow('Error message');
  });
});

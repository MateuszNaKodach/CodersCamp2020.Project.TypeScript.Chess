import { ChessBoard } from '../../../src/app/model/ChessBoard';
import { Piece } from '../../../src/app/model/Piece';
import { Square, SquareWithPiece } from '../../../src/app/model/Types';

describe('Piece movement', () => {
  const boardWithPieces: SquareWithPiece = {};

  it('from A2 --> A3', () => {
    const piece: Piece = { side: 'WHITE' };
    const squareFrom: Square = { column: 'A', row: 2 };
    const squareTo: Square = { column: 'A', row: 3 };
    const chessBoard = new ChessBoard(boardWithPieces);

    chessBoard.movePiece(piece, squareFrom, squareTo);

    expect(chessBoard.onPositionPiece(squareFrom)).toBe(undefined);
    expect(chessBoard.onPositionPiece(squareTo)).toMatchObject(piece);
  });

  it('from A2 --> A3 --> A4', () => {
    const piece: Piece = { side: 'WHITE' };
    const squareFrom: Square = { column: 'A', row: 2 };
    const squareByWay: Square = { column: 'A', row: 3 };
    const squareTo: Square = { column: 'A', row: 4 };
    const chessBoard = new ChessBoard(boardWithPieces);

    chessBoard.movePiece(piece, squareFrom, squareByWay);
    chessBoard.movePiece(piece, squareByWay, squareTo);

    expect(chessBoard.onPositionPiece(squareFrom)).toBe(undefined);
    expect(chessBoard.onPositionPiece(squareByWay)).toBe(undefined);
    expect(chessBoard.onPositionPiece(squareTo)).toMatchObject(piece);
  });

  it('from square where is nothing (A2 is empty)', () => {
    const piece: Piece = { side: 'WHITE' };
    const squareFrom: Square = { column: 'A', row: 2 };
    const squareTo: Square = { column: 'A', row: 3 };
    const chessBoard = new ChessBoard(boardWithPieces);

    chessBoard.movePiece(piece, squareFrom, squareTo);

    expect(chessBoard.onPositionPiece(squareFrom)).toThrow('Error message');
  });
});

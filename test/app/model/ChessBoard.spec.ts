import { Chessboard } from '../../../src/app/model/Chessboard';
import { Pawn } from '../../../src/app/model/Pawn';
import { Rook } from '../../../src/app/model/Rook';
import { Square, SquareWithPiece, Side } from '../../../src/app/model/Types';

describe('ChessBoard', () => {
  const pawn: Pawn = new Pawn(Side.WHITE);
  const rook: Rook = new Rook(Side.WHITE);
  const squareA2: Square = { column: 'A', row: 2 };
  const squareA3: Square = { column: 'A', row: 3 };
  const squareA4: Square = { column: 'A', row: 4 };

  it('- check onPositionPiece method', () => {
    const boardWithPieces: SquareWithPiece = { A2: pawn, A3: rook };
    const chessBoard = new Chessboard(boardWithPieces);

    expect(chessBoard.onPositionPiece(squareA2)).toMatchObject(pawn);
    expect(chessBoard.onPositionPiece(squareA3)).toMatchObject(rook);
    expect(chessBoard.onPositionPiece(squareA4)).toBe(undefined);
  });

  it('move piece from square where is nothing (A2 is empty)', () => {
    const boardWithPieces: SquareWithPiece = { D7: pawn, F4: rook };
    const chessBoard = new Chessboard(boardWithPieces);

    expect(() => chessBoard.movePiece(squareA2, squareA3)).toThrowError(`There is no piece on square!`);
  });

  it('move piece from A2 --> A4', () => {
    const boardWithPieces: SquareWithPiece = { A2: pawn, F4: rook };
    const chessBoard = new Chessboard(boardWithPieces);

    chessBoard.movePiece(squareA2, squareA3);

    expect(chessBoard.onPositionPiece(squareA2)).toBe(undefined);
    expect(chessBoard.onPositionPiece(squareA3)).toMatchObject(pawn);
  });

  it('move piece from A2 --> A3 --> A4', () => {
    const boardWithPieces: SquareWithPiece = { A2: pawn, F4: rook };
    const chessBoard = new Chessboard(boardWithPieces);

    chessBoard.movePiece(squareA2, squareA3);
    chessBoard.movePiece(squareA3, squareA4);

    expect(chessBoard.onPositionPiece(squareA2)).toBe(undefined);
    expect(chessBoard.onPositionPiece(squareA3)).toBe(undefined);
    expect(chessBoard.onPositionPiece(squareA4)).toMatchObject(pawn);
  });
});

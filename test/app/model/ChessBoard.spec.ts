import { ChessBoard } from '../../../src/app/model/ChessBoard';
import { Piece } from '../../../src/app/model/Piece';
import { Rook } from '../../../src/app/model/Rook';
import { Square, SquareWithPiece } from '../../../src/app/model/Types';

describe('ChessBoard', () => {
  const piece: Piece = { side: 'WHITE' };
  const rook: Rook = new Rook('WHITE');
  const squareA2: Square = { column: 'A', row: 2 };
  const squareA3: Square = { column: 'A', row: 3 };
  const squareA4: Square = { column: 'A', row: 4 };

  it('- check onPositionPiece method', () => {
    const boardWithPieces: SquareWithPiece = { A2: piece, A3: rook };
    const chessBoard = new ChessBoard(boardWithPieces);

    expect(chessBoard.onPositionPiece(squareA4)).toBe(undefined);
    expect(chessBoard.onPositionPiece(squareA3)).toMatchObject(rook);
    expect(chessBoard.onPositionPiece(squareA2)).toMatchObject(piece);
  });

  it('move piece from square where is nothing (A2 is empty)', () => {
    const boardWithPieces: SquareWithPiece = { D7: piece, F4: rook };
    const chessBoard = new ChessBoard(boardWithPieces);

    function testErrorFunction() {
      chessBoard.movePiece(squareA2, squareA3);
    }

    expect(testErrorFunction()).toThrowError(`There is no Piece on square!`);
  });

  it('move piece from A2 --> A4', () => {
    const boardWithPieces: SquareWithPiece = { A2: piece, F4: rook };
    const chessBoard = new ChessBoard(boardWithPieces);

    chessBoard.movePiece(squareA2, squareA3);

    expect(chessBoard.onPositionPiece(squareA2)).toBe(undefined);
    expect(chessBoard.onPositionPiece(squareA3)).toMatchObject(piece);
  });

  it('move piece from A2 --> A3 --> A4', () => {
    const boardWithPieces: SquareWithPiece = { A2: piece, F4: rook };
    const chessBoard = new ChessBoard(boardWithPieces);

    chessBoard.movePiece(squareA2, squareA3);
    chessBoard.movePiece(squareA3, squareA4);

    expect(chessBoard.onPositionPiece(squareA2)).toBe(undefined);
    expect(chessBoard.onPositionPiece(squareA3)).toBe(undefined);
    expect(chessBoard.onPositionPiece(squareA4)).toMatchObject(piece);
  });
});

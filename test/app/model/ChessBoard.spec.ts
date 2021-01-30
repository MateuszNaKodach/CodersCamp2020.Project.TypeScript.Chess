import { ChessBoard } from '../../../src/app/model/ChessBoard';
import { Piece } from '../../../src/app/model/Piece';
import { Rook } from '../../../src/app/model/Rook';
import { Square, SquareWithPiece } from '../../../src/app/model/Types';

describe('ChessBoard', () => {
  it('- check onPositionPiece method', () => {
    const piece: Piece = { side: 'WHITE' };
    const rook: Rook = new Rook('WHITE');
    const boardWithPieces: SquareWithPiece = { D7: piece, F4: rook };
    const chessBoard = new ChessBoard(boardWithPieces);
    const sqaureA2: Square = { column: 'A', row: 2 };
    const squareD7: Square = { column: 'D', row: 7 };
    const squareF4: Square = { column: 'F', row: 4 };

    expect(chessBoard.onPositionPiece(sqaureA2)).toBe(undefined);
    expect(chessBoard.onPositionPiece(squareD7)).toMatchObject(rook);
    expect(chessBoard.onPositionPiece(squareF4)).toMatchObject(piece);
  });

  it('move piece from square where is nothing (A2 is empty)', () => {
    const piece: Piece = { side: 'WHITE' };
    const rook: Rook = new Rook('WHITE');
    const boardWithPieces: SquareWithPiece = { D7: piece, F4: rook };
    const squareFrom: Square = { column: 'A', row: 2 };
    const squareTo: Square = { column: 'A', row: 3 };
    const chessBoard = new ChessBoard(boardWithPieces);

    function testErrorFunction() {
      chessBoard.movePiece(squareFrom, squareTo);
    }

    expect(testErrorFunction).toThrowError(`There is no Piece on square!`);
  });

  // it('move piece from A2 --> A4', () => {
  //   const piece: Piece = { side: 'WHITE' };
  //   const rook: Rook = new Rook('WHITE');
  //   const boardWithPieces: SquareWithPiece = { A2: piece, F4: rook };
  //   const squareFrom: Square = { column: 'A', row: 2 };
  //   const squareTo: Square = { column: 'A', row: 4 };
  //   const chessBoard = new ChessBoard(boardWithPieces);

  //   function testErrorFunction() {
  //   chessBoard.movePiece(squareFrom, squareTo);
  //   };

  //   expect(testErrorFunction()).toMatchObject(piece);
  // });

  // it('move piece from A2 --> A3 --> A4', () => {
  //   const piece: Piece = { side: 'WHITE' };
  //   const rook: Rook = new Rook('WHITE');
  //   const boardWithPieces: SquareWithPiece = { A2: piece, F4: rook };
  //   const squareFrom: Square = { column: 'A', row: 2 };
  //   const squareByWay: Square = { column: 'A', row: 3 };
  //   const squareTo: Square = { column: 'A', row: 4 };
  //   const chessBoard = new ChessBoard(boardWithPieces);

  //   chessBoard.movePiece(squareFrom, squareByWay);
  //   chessBoard.movePiece(squareByWay, squareTo);

  //   expect(chessBoard.onPositionPiece(squareFrom)).toBe(undefined);
  //   expect(chessBoard.onPositionPiece(squareByWay)).toBe(undefined);
  //   expect(chessBoard.onPositionPiece(squareTo)).toMatchObject(piece);
  // });
});

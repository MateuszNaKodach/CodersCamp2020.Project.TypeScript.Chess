import { ChessEngine } from '../../../src/app/model/ChessEngine';
import { Side, Square, SquareWithPiece } from '../../../src/app/model/Types';
import { Chessboard } from '../../../src/app/model/Chessboard';
import { Pawn } from '../../../src/app/model/pieces/Pawn';
import { Player } from '../../../src/app/model/Player';
import 'jest-extended';
import { Queen } from '../../../src/app/model/pieces/Queen';
import { Knight } from '../../../src/app/model/pieces/Knight';
import { King, Rook } from '../../../src/app/model';

describe('Chess Engine', () => {
  it('Given white piece on A2 and black piece on A4, when move white piece from A2 to A3, then white piece was moved from A2 to A3', () => {
    const whitePiece = new Pawn(Side.WHITE);
    const blackPiece = new Pawn(Side.BLACK);
    const boardWithPieces: SquareWithPiece = { A2: whitePiece, A4: blackPiece };
    const chessBoard = new Chessboard(boardWithPieces);
    const engine = new ChessEngine(chessBoard);
    const player = new Player(Side.WHITE);
    const squareFrom: Square = { column: 'A', row: 2 };
    const squareTo: Square = { column: 'A', row: 3 };

    expect(engine.move(player, squareFrom, squareTo)).toIncludeSameMembers([
      {
        eventType: 'PieceWasMoved',
        piece: whitePiece,
        from: squareFrom,
        to: squareTo,
      },
    ]);
  });

  it('Given white piece on A2 and black piece on A4, when move white piece from A2 to A4, then white piece was moved from A2 to A4 and piece from A4 was captured', () => {
    const whitePiece = new Queen(Side.WHITE);
    const blackPiece = new Pawn(Side.BLACK);
    const boardWithPieces: SquareWithPiece = { A2: whitePiece, A4: blackPiece };
    const chessBoard = new Chessboard(boardWithPieces);
    const engine = new ChessEngine(chessBoard);
    const player = new Player(Side.WHITE);
    const squareFrom: Square = { column: 'A', row: 2 };
    const squareTo: Square = { column: 'A', row: 4 };

    expect(engine.move(player, squareFrom, squareTo)).toIncludeSameMembers([
      { eventType: 'PieceWasCaptured', piece: blackPiece, onSquare: squareTo },
      { eventType: 'PieceWasMoved', piece: whitePiece, from: squareFrom, to: squareTo },
    ]);
  });

  it('Given white pieces on C2 and B1 and black piece on B4, when move white piece to C3, then black piece attacks on C3 and then another white piece attacks on C3', () => {
    const whitePawn = new Pawn(Side.WHITE);
    const whiteKnight = new Knight(Side.WHITE);
    const blackPawn = new Pawn(Side.BLACK);
    const boardWithPieces: SquareWithPiece = { C2: whitePawn, B1: whiteKnight, B4: blackPawn };
    const chessBoard = new Chessboard(boardWithPieces);
    const engine = new ChessEngine(chessBoard);
    const playerWhite = new Player(Side.WHITE);
    const playerBlack = new Player(Side.BLACK);

    engine.move(playerWhite, { column: 'C', row: 2 }, { column: 'C', row: 3 });
    engine.move(playerBlack, { column: 'B', row: 4 }, { column: 'C', row: 3 });
    expect(engine.move(playerWhite, { column: 'B', row: 1 }, { column: 'C', row: 3 })).toIncludeSameMembers([
      { eventType: 'PieceWasCaptured', piece: blackPawn, onSquare: { column: 'C', row: 3 } },
      { eventType: 'PieceWasMoved', piece: whiteKnight, from: { column: 'B', row: 1 }, to: { column: 'C', row: 3 } },
    ]);
  });

  it('Should throw an Error if player wants to move opponents piece', () => {
    const whitePiece = new Queen(Side.WHITE);
    const blackPiece = new Pawn(Side.BLACK);
    const boardWithPieces: SquareWithPiece = { A2: blackPiece, A4: whitePiece };
    const chessBoard = new Chessboard(boardWithPieces);
    const engine = new ChessEngine(chessBoard);
    const player = new Player(Side.WHITE);
    const squareFrom: Square = { column: 'A', row: 2 };
    const squareTo: Square = { column: 'A', row: 4 };

    expect(() => engine.move(player, squareFrom, squareTo)).toThrowError('Player can not move other players pieces.');
  });

  it('Should throw an Error if player wants to move piece to not available square', () => {
    const whitePiece = new Pawn(Side.WHITE);
    const boardWithPieces: SquareWithPiece = { A2: whitePiece };
    const chessBoard = new Chessboard(boardWithPieces);
    const engine = new ChessEngine(chessBoard);
    const player = new Player(Side.WHITE);
    const squareFrom: Square = { column: 'A', row: 2 };
    const squareTo: Square = { column: 'A', row: 5 };

    expect(() => engine.move(player, squareFrom, squareTo)).toThrowError('Piece can not move to given square.');
  });

  it('Should throw an Error if player wants to move twice', () => {
    const whitePiece = new Pawn(Side.WHITE);
    const boardWithPieces: SquareWithPiece = { A2: whitePiece };
    const chessBoard = new Chessboard(boardWithPieces);
    const engine = new ChessEngine(chessBoard);
    const player = new Player(Side.WHITE);
    const squareStart: Square = { column: 'A', row: 2 };
    const squareMiddle: Square = { column: 'A', row: 3 };
    const squareFinish: Square = { column: 'A', row: 4 };

    engine.move(player, squareStart, squareMiddle);

    expect(() => engine.move(player, squareMiddle, squareFinish)).toThrowError(`It's not Your turn.`);
  });

  it('Should throw an Error if player wants to move piece that was just captured', () => {
    const whitePiece = new Queen(Side.WHITE);
    const blackPiece = new Pawn(Side.BLACK);
    const boardWithPieces: SquareWithPiece = { A2: whitePiece, A6: blackPiece };
    const chessBoard = new Chessboard(boardWithPieces);
    const engine = new ChessEngine(chessBoard);
    const playerWhite = new Player(Side.WHITE);
    const playerBlack = new Player(Side.BLACK);

    engine.move(playerWhite, { column: 'A', row: 2 }, { column: 'A', row: 6 });

    expect(() =>
      engine.move(
        playerBlack,
        { column: 'A', row: 6 },
        {
          column: 'A',
          row: 5,
        },
      ),
    ).toThrowError('Player can not move other players pieces.');
  });

  it('Should throw an Error if chosen square is not occupied', () => {
    const boardWithPieces: SquareWithPiece = {};
    const chessBoard = new Chessboard(boardWithPieces);
    const engine = new ChessEngine(chessBoard);
    const playerWhite = new Player(Side.WHITE);

    expect(() =>
      engine.move(
        playerWhite,
        { column: 'A', row: 2 },
        {
          column: 'A',
          row: 6,
        },
      ),
    ).toThrowError('There is no piece on this square.');
  });

  describe('Return player moves without those that cause his king to check', () => {
    const whiteKing = new King(Side.WHITE);
    const whiteRook = new Rook(Side.WHITE);
    const blackKing = new King(Side.BLACK);
    const blackRook = new Rook(Side.BLACK);
    // const playerWhite = new Player(Side.WHITE);

    it(`Should return the same possible moves array if the king's move doesn't cause his check.`, () => {
      const boardWithPieces: SquareWithPiece = {
        A2: whiteKing,
        A8: blackKing,
      };
      const chessboard = new Chessboard(boardWithPieces);
      const engine = new ChessEngine(chessboard);
      const movedPiecePosition: Square = { column: 'A', row: 2 };
      const possibleMovesBeforeFiltration = [
        { column: 'A', row: 1 },
        { column: 'A', row: 3 },
        { column: 'B', row: 1 },
        { column: 'B', row: 2 },
        { column: 'B', row: 3 },
      ];

      const returnedResult = engine.pieceMovesNotCausingAllyKingCheckmate(movedPiecePosition);

      const expectedResult = possibleMovesBeforeFiltration;
      expect(returnedResult).toIncludeSameMembers(expectedResult);
    });

    it(`Should return possible moves array if the king's move causes his check.`, () => {
      const boardWithPieces: SquareWithPiece = {
        A2: whiteKing,
        A8: blackKing,
        B8: blackRook,
      };
      const chessboard = new Chessboard(boardWithPieces);
      const engine = new ChessEngine(chessboard);
      const movedPiecePosition: Square = { column: 'A', row: 2 };

      const returnedResult = engine.pieceMovesNotCausingAllyKingCheckmate(movedPiecePosition);

      const expectedResult = [
        { column: 'A', row: 1 },
        { column: 'A', row: 3 },
      ];
      expect(returnedResult).toIncludeSameMembers(expectedResult);
    });

    it(`Should return possible moves array if the king's move causes his check but king could capture his enemy whose check possible moves of king.`, () => {
      const boardWithPieces: SquareWithPiece = {
        A2: whiteKing,
        A8: blackKing,
        B3: blackRook,
      };
      const chessboard = new Chessboard(boardWithPieces);
      const engine = new ChessEngine(chessboard);
      const movedPiecePosition: Square = { column: 'A', row: 2 };

      const returnedResult = engine.pieceMovesNotCausingAllyKingCheckmate(movedPiecePosition);

      const expectedResult = [
        { column: 'A', row: 1 },
        { column: 'B', row: 3 },
      ];
      expect(returnedResult).toIncludeSameMembers(expectedResult);
    });

    it(`Should return possible moves array if the king's move causes his check but king could capture his enemy whose check possible moves of king.`, () => {
      const boardWithPieces: SquareWithPiece = {
        A2: whiteKing,
        A8: blackKing,
        B3: blackRook,
      };
      const chessboard = new Chessboard(boardWithPieces);
      const engine = new ChessEngine(chessboard);
      const movedPiecePosition: Square = { column: 'A', row: 2 };

      const returnedResult = engine.pieceMovesNotCausingAllyKingCheckmate(movedPiecePosition);

      const expectedResult = [
        { column: 'A', row: 1 },
        { column: 'B', row: 3 },
      ];
      expect(returnedResult).toIncludeSameMembers(expectedResult);
    });

    it(`Should return possible moves array if the king's move causes his check but king cannot capture his enemy whose check possible moves of king.`, () => {
      const boardWithPieces: SquareWithPiece = {
        A2: whiteKing,
        A8: blackKing,
        B3: blackRook,
        B8: blackRook,
      };
      const chessboard = new Chessboard(boardWithPieces);
      const engine = new ChessEngine(chessboard);
      const movedPiecePosition: Square = { column: 'A', row: 2 };

      const returnedResult = engine.pieceMovesNotCausingAllyKingCheckmate(movedPiecePosition);

      const expectedResult = [{ column: 'A', row: 1 }];
      expect(returnedResult).toIncludeSameMembers(expectedResult);
    });

    it(`Should return possible king's moves array if the king is checked.`, () => {
      const boardWithPieces: SquareWithPiece = {
        A2: whiteKing,
        A7: blackRook,
        A8: blackKing,
      };
      const chessboard = new Chessboard(boardWithPieces);
      const engine = new ChessEngine(chessboard);
      const movedPiecePosition: Square = { column: 'A', row: 2 };

      const returnedResult = engine.pieceMovesNotCausingAllyKingCheckmate(movedPiecePosition);

      const expectedResult = [
        { column: 'B', row: 1 },
        { column: 'B', row: 2 },
        { column: 'B', row: 3 },
      ];
      expect(returnedResult).toIncludeSameMembers(expectedResult);
    });

    it(`Should return possible rook's moves array if the rook's move causes his king check`, () => {
      const boardWithPieces: SquareWithPiece = {
        A2: whiteKing,
        A3: whiteRook,
        A7: blackRook,
        A8: blackKing,
      };
      const chessboard = new Chessboard(boardWithPieces);
      const engine = new ChessEngine(chessboard);
      const movedPiecePosition: Square = { column: 'A', row: 3 };

      const returnedResult = engine.pieceMovesNotCausingAllyKingCheckmate(movedPiecePosition);

      const expectedResult = [
        { column: 'A', row: 4 },
        { column: 'A', row: 5 },
        { column: 'A', row: 6 },
        { column: 'A', row: 7 },
      ];
      expect(returnedResult).toIncludeSameMembers(expectedResult);
    });

    it(`Should return empty possible rook's moves array if the king is checked and rook's move causes his king check`, () => {
      const boardWithPieces: SquareWithPiece = {
        A1: whiteRook,
        A2: whiteKing,
        A7: blackRook,
        A8: blackKing,
      };
      const chessboard = new Chessboard(boardWithPieces);
      const engine = new ChessEngine(chessboard);
      const movedPiecePosition: Square = { column: 'A', row: 1 };

      const returnedResult = engine.pieceMovesNotCausingAllyKingCheckmate(movedPiecePosition);

      const expectedResult = [] as Square[];
      expect(returnedResult).toIncludeSameMembers(expectedResult);
    });

    it(`Should return empty possible king's moves array if it's checkmate`, () => {
      const boardWithPieces: SquareWithPiece = {
        A2: whiteKing,
        A7: blackRook,
        A8: blackKing,
        B7: blackRook,
      };
      const chessboard = new Chessboard(boardWithPieces);
      const engine = new ChessEngine(chessboard);
      const movedPiecePosition: Square = { column: 'A', row: 2 };

      const returnedResult = engine.pieceMovesNotCausingAllyKingCheckmate(movedPiecePosition);

      const expectedResult = [] as Square[];
      expect(returnedResult).toIncludeSameMembers(expectedResult);
    });
  });
});

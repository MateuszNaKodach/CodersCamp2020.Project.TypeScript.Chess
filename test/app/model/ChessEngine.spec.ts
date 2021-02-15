import { Side, Square, SquareWithPiece, ChessEngine, Chessboard, Pawn, Queen, Knight, King, Rook, Bishop } from '../../../src/app/model';
import 'jest-extended';

describe('Chess Engine', () => {
  it('Given white piece on A2 and black piece on A4, when move white piece from A2 to A3, then white piece was moved from A2 to A3', () => {
    const whitePiece = new Pawn(Side.WHITE);
    const blackPiece = new Pawn(Side.BLACK);
    const boardWithPieces: SquareWithPiece = { A2: whitePiece, A4: blackPiece };
    const chessBoard = new Chessboard(boardWithPieces);
    const engine = new ChessEngine(chessBoard);
    const squareFrom: Square = { column: 'A', row: 2 };
    const squareTo: Square = { column: 'A', row: 3 };

    expect(engine.move(squareFrom, squareTo)).toIncludeSameMembers([
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
    const squareFrom: Square = { column: 'A', row: 2 };
    const squareTo: Square = { column: 'A', row: 4 };

    expect(engine.move(squareFrom, squareTo)).toIncludeSameMembers([
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

    engine.move({ column: 'C', row: 2 }, { column: 'C', row: 3 });
    engine.move({ column: 'B', row: 4 }, { column: 'C', row: 3 });
    expect(engine.move({ column: 'B', row: 1 }, { column: 'C', row: 3 })).toIncludeSameMembers([
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
    const squareFrom: Square = { column: 'A', row: 2 };
    const squareTo: Square = { column: 'A', row: 4 };

    expect(() => engine.move(squareFrom, squareTo)).toThrowError("It's not Your turn.");
  });

  it('Should throw an Error if player wants to move piece to not available square', () => {
    const whitePiece = new Pawn(Side.WHITE);
    const boardWithPieces: SquareWithPiece = { A2: whitePiece };
    const chessBoard = new Chessboard(boardWithPieces);
    const engine = new ChessEngine(chessBoard);
    const squareFrom: Square = { column: 'A', row: 2 };
    const squareTo: Square = { column: 'A', row: 5 };

    expect(() => engine.move(squareFrom, squareTo)).toThrowError('Piece can not move to given square.');
  });

  it('Should throw an Error if player wants to move twice', () => {
    const whitePiece = new Pawn(Side.WHITE);
    const boardWithPieces: SquareWithPiece = { A2: whitePiece };
    const chessBoard = new Chessboard(boardWithPieces);
    const engine = new ChessEngine(chessBoard);
    const squareStart: Square = { column: 'A', row: 2 };
    const squareMiddle: Square = { column: 'A', row: 3 };
    const squareFinish: Square = { column: 'A', row: 4 };

    engine.move(squareStart, squareMiddle);

    expect(() => engine.move(squareMiddle, squareFinish)).toThrowError(`It's not Your turn.`);
  });

  it('Should throw an Error if player wants to move piece that was just captured', () => {
    const whitePiece = new Queen(Side.WHITE);
    const blackPiece = new Pawn(Side.BLACK);
    const boardWithPieces: SquareWithPiece = { A2: whitePiece, A6: blackPiece };
    const chessBoard = new Chessboard(boardWithPieces);
    const engine = new ChessEngine(chessBoard);

    engine.move({ column: 'A', row: 2 }, { column: 'A', row: 6 });

    expect(() => engine.move({ column: 'A', row: 6 }, { column: 'A', row: 5 })).toThrowError("It's not Your turn.");
  });

  it('Should throw an Error if chosen square is not occupied', () => {
    const boardWithPieces: SquareWithPiece = {};
    const chessBoard = new Chessboard(boardWithPieces);
    const engine = new ChessEngine(chessBoard);

    expect(() => engine.move({ column: 'A', row: 2 }, { column: 'A', row: 6 })).toThrowError('There is no piece on this square.');
  });

  it('When white pawn reaches the last row, pawn promotion is enabled', () => {
    const whitePawn = new Pawn(Side.WHITE);
    const blackKnight = new Knight(Side.BLACK);
    const boardWithPieces: SquareWithPiece = { A7: whitePawn, B8: blackKnight };
    const chessBoard = new Chessboard(boardWithPieces);
    const engine = new ChessEngine(chessBoard);
    const squareFrom: Square = { column: 'A', row: 7 };
    const squareTo: Square = { column: 'B', row: 8 };

    expect(engine.move(squareFrom, squareTo)).toIncludeSameMembers([
      { eventType: 'PieceWasCaptured', piece: blackKnight, onSquare: squareTo },
      { eventType: 'PieceWasMoved', piece: whitePawn, from: squareFrom, to: squareTo },
      { eventType: 'PawnPromotionWasEnabled', onSquare: squareTo, pawn: whitePawn },
    ]);
    expect(engine['promotingOnSquare']).toBe(squareTo);
  });

  it('When black pawn reaches the last row, no move is possible until promotion is done', () => {
    const whitePawn = new Pawn(Side.WHITE);
    const blackPawn = new Pawn(Side.BLACK);
    const boardWithPieces: SquareWithPiece = { A2: whitePawn, H2: blackPawn };
    const chessBoard = new Chessboard(boardWithPieces);
    const engine = new ChessEngine(chessBoard);
    const squareFrom: Square = { column: 'H', row: 2 };
    const squareTo: Square = { column: 'H', row: 1 };

    engine.move({ column: 'A', row: 2 }, { column: 'A', row: 3 });

    expect(engine.move(squareFrom, squareTo)).toIncludeSameMembers([
      { eventType: 'PieceWasMoved', piece: blackPawn, from: squareFrom, to: squareTo },
      { eventType: 'PawnPromotionWasEnabled', onSquare: squareTo, pawn: blackPawn },
    ]);
    expect(engine['promotingOnSquare']).toBe(squareTo);

    expect(() => engine.move({ column: 'A', row: 3 }, { column: 'A', row: 4 })).toThrowError(
      'No move is possible until promotion is done.',
    );
  });

  it('When piece other than pawn reaches the last row, promotion is disabled', () => {
    const whiteBishop = new Bishop(Side.WHITE);
    const blackKnight = new Knight(Side.BLACK);
    const boardWithPieces: SquareWithPiece = { C5: whiteBishop, E3: blackKnight };
    const chessBoard = new Chessboard(boardWithPieces);
    const engine = new ChessEngine(chessBoard);
    const whiteSquareFrom: Square = { column: 'C', row: 5 };
    const whiteSquareTo: Square = { column: 'F', row: 8 };
    const blackSquareFrom: Square = { column: 'E', row: 3 };
    const blackSquareTo: Square = { column: 'D', row: 1 };

    expect(engine.move(whiteSquareFrom, whiteSquareTo)).toIncludeSameMembers([
      { eventType: 'PieceWasMoved', piece: whiteBishop, from: whiteSquareFrom, to: whiteSquareTo },
    ]);
    expect(engine['promotingOnSquare']).toBeUndefined();
    expect(engine.move(blackSquareFrom, blackSquareTo)).toIncludeSameMembers([
      { eventType: 'PieceWasMoved', piece: blackKnight, from: blackSquareFrom, to: blackSquareTo },
    ]);
    expect(engine['promotingOnSquare']).toBeUndefined();
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

      const returnedResult = engine.pieceMovesNotCausingAllyKingCheck(movedPiecePosition);

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

      const returnedResult = engine.pieceMovesNotCausingAllyKingCheck(movedPiecePosition);

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

      const returnedResult = engine.pieceMovesNotCausingAllyKingCheck(movedPiecePosition);

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

      const returnedResult = engine.pieceMovesNotCausingAllyKingCheck(movedPiecePosition);

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

      const returnedResult = engine.pieceMovesNotCausingAllyKingCheck(movedPiecePosition);

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

      const returnedResult = engine.pieceMovesNotCausingAllyKingCheck(movedPiecePosition);

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

      const returnedResult = engine.pieceMovesNotCausingAllyKingCheck(movedPiecePosition);

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

      const returnedResult = engine.pieceMovesNotCausingAllyKingCheck(movedPiecePosition);

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

      const returnedResult = engine.pieceMovesNotCausingAllyKingCheck(movedPiecePosition);

      const expectedResult = [] as Square[];
      expect(returnedResult).toIncludeSameMembers(expectedResult);
    });
  });

  it('After white players move, a black king is in white piece range, then black king is checked', () => {
    const whitePiece = new Bishop(Side.WHITE);
    const blackPiece = new King(Side.BLACK);
    const boardWithPieces: SquareWithPiece = { D8: blackPiece, F4: whitePiece };
    const chessBoard = new Chessboard(boardWithPieces);
    const engine = new ChessEngine(chessBoard);
    const bishopSquareFrom: Square = { column: 'F', row: 4 };
    const bishopSquareTo: Square = { column: 'G', row: 5 };

    expect(engine.move(bishopSquareFrom, bishopSquareTo)).toIncludeSameMembers([
      {
        eventType: 'PieceWasMoved',
        piece: whitePiece,
        from: bishopSquareFrom,
        to: bishopSquareTo,
      },
      {
        eventType: 'KingWasChecked',
        king: blackPiece,
        onSquare: { column: 'D', row: 8 },
      },
    ]);
  });

  it('After black players move his king, black king is no longer checked', () => {
    const whitePiece = new Bishop(Side.WHITE);
    const blackPiece = new King(Side.BLACK);
    const boardWithPieces: SquareWithPiece = { D8: blackPiece, F4: whitePiece };
    const chessBoard = new Chessboard(boardWithPieces);
    const engine = new ChessEngine(chessBoard);
    const kingSquareFrom: Square = { column: 'D', row: 8 };
    const kingSquareTo: Square = { column: 'D', row: 7 };
    const bishopSquareFrom: Square = { column: 'F', row: 4 };
    const bishopSquareTo: Square = { column: 'G', row: 5 };

    engine.move(bishopSquareFrom, bishopSquareTo);

    expect(engine.move(kingSquareFrom, kingSquareTo)).toIncludeSameMembers([
      {
        eventType: 'PieceWasMoved',
        piece: blackPiece,
        from: kingSquareFrom,
        to: kingSquareTo,
      },
      {
        eventType: 'KingWasUnchecked',
      },
    ]);
  });

  it('After black players move piece to cover king, black king is no longer checked', () => {
    const whiteBishop = new Bishop(Side.WHITE);
    const blackKing = new King(Side.BLACK);
    const blackQueen = new Queen(Side.BLACK);
    const boardWithPieces: SquareWithPiece = { D8: blackKing, E8: blackQueen, F4: whiteBishop };
    const chessBoard = new Chessboard(boardWithPieces);
    const engine = new ChessEngine(chessBoard);
    const queenSquareFrom: Square = { column: 'E', row: 8 };
    const queenSquareTo: Square = { column: 'E', row: 7 };
    const bishopSquareFrom: Square = { column: 'F', row: 4 };
    const bishopSquareTo: Square = { column: 'G', row: 5 };

    engine.move(bishopSquareFrom, bishopSquareTo);

    expect(engine.move(queenSquareFrom, queenSquareTo)).toIncludeSameMembers([
      {
        eventType: 'PieceWasMoved',
        piece: blackQueen,
        from: queenSquareFrom,
        to: queenSquareTo,
      },
      {
        eventType: 'KingWasUnchecked',
      },
    ]);
  });

  it('Should throw an Error if player wants to make move that will result in check of his king', () => {
    const whiteBishop = new Bishop(Side.WHITE);
    const blackKing = new King(Side.BLACK);
    const blackQueen = new Queen(Side.BLACK);
    const boardWithPieces: SquareWithPiece = { D8: blackKing, E7: blackQueen, F4: whiteBishop };
    const chessBoard = new Chessboard(boardWithPieces);
    const engine = new ChessEngine(chessBoard);
    const queenSquareFrom: Square = { column: 'E', row: 7 };
    const queenSquareTo: Square = { column: 'E', row: 8 };
    const bishopSquareFrom: Square = { column: 'F', row: 4 };
    const bishopSquareTo: Square = { column: 'G', row: 5 };

    engine.move(bishopSquareFrom, bishopSquareTo);

    expect(() => engine.move(queenSquareFrom, queenSquareTo)).toThrowError(
      'You must not make a move that will result in checking your king.',
    );
  });

  describe('Checkmate event', () => {
    const whiteKing = new King(Side.WHITE);
    const blackKing = new King(Side.BLACK);
    const whiteRook = new Rook(Side.WHITE);
    const blackRook = new Rook(Side.BLACK);

    it(`Should't return checkmate event If checkmate Hasn't Occurred and king is not checked`, () => {
      const boardWithPieces: SquareWithPiece = {
        A1: whiteKing,
        B1: whiteRook,
        H8: blackKing,
      };
      const chessboard = new Chessboard(boardWithPieces);
      const engine = new ChessEngine(chessboard);
      const startPiecePosition: Square = { column: 'B', row: 1 };
      const endPiecePosition: Square = { column: 'B', row: 2 };

      const returnedResult = engine.move(startPiecePosition, endPiecePosition);

      const expectedResult = [
        { eventType: 'PieceWasMoved', from: { column: 'B', row: 1 }, piece: { name: 'Rook', side: 'WHITE' }, to: { column: 'B', row: 2 } },
      ];
      expect(returnedResult).toIncludeSameMembers(expectedResult);
    });
  });
});

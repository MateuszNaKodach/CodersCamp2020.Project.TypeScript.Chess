import { Bishop, Chessboard, ChessEngine, King, Knight, Pawn, Queen, Rook, Side, Square, SquareWithPiece } from '../../../src/app/model';
import 'jest-extended';

describe('Chess Engine', () => {
  it('Given white piece on A2 and black piece on A4, when move white piece from A2 to A3, then white piece was moved from A2 to A3', () => {
    const whitePiece = new Pawn(Side.WHITE);
    const blackPiece = new Pawn(Side.BLACK);
    const boardWithPieces: SquareWithPiece = { A2: whitePiece, A4: blackPiece, H7: blackPiece };
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
    const boardWithPieces: SquareWithPiece = { A2: whitePiece, A4: blackPiece, H7: blackPiece };
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
    const boardWithPieces: SquareWithPiece = { C2: whitePawn, B1: whiteKnight, B4: blackPawn, H7: blackPawn };
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

  it('When white pawn makes its first move and goes 2 squares from F2 to F4 and black pawn stands on E4, then black pawn can capture white pawn in passing (moves to F3)', () => {
    const whitePawn = new Pawn(Side.WHITE);
    const blackPawn = new Pawn(Side.BLACK);
    const chessboard = new Chessboard({ F2: whitePawn, E4: blackPawn });
    const engine = new ChessEngine(chessboard);
    const whitePawnFrom: Square = { column: 'F', row: 2 };
    const whitePawnTo: Square = { column: 'F', row: 4 };
    const blackPawnFrom: Square = { column: 'E', row: 4 };
    const blackPawnTo: Square = { column: 'F', row: 3 };

    engine.move(whitePawnFrom, whitePawnTo);

    expect(engine.move(blackPawnFrom, blackPawnTo)).toIncludeSameMembers([
      { eventType: 'PieceWasCaptured', piece: whitePawn, onSquare: { column: 'F', row: 4 } },
      { eventType: 'PieceWasMoved', piece: blackPawn, from: { column: 'E', row: 4 }, to: { column: 'F', row: 3 } },
    ]);
  });

  it('When black pawn makes its first move and goes 2 squares from B7 to B5 and white pawn stands on C5, then white pawn can capture black pawn in passing (moves to B6)', () => {
    const whitePawn = new Pawn(Side.WHITE);
    const blackPawn = new Pawn(Side.BLACK);
    const chessboard = new Chessboard({ C5: whitePawn, B7: blackPawn, A1: new Rook(Side.WHITE) });
    const engine = new ChessEngine(chessboard);
    const whitePawnFrom: Square = { column: 'C', row: 5 };
    const whitePawnTo: Square = { column: 'B', row: 6 };
    const blackPawnFrom: Square = { column: 'B', row: 7 };
    const blackPawnTo: Square = { column: 'B', row: 5 };

    engine.move({ column: 'A', row: 1 }, { column: 'A', row: 2 });
    engine.move(blackPawnFrom, blackPawnTo);

    expect(engine.move(whitePawnFrom, whitePawnTo)).toIncludeSameMembers([
      { eventType: 'PieceWasCaptured', piece: blackPawn, onSquare: { column: 'B', row: 5 } },
      { eventType: 'PieceWasMoved', piece: whitePawn, from: { column: 'C', row: 5 }, to: { column: 'B', row: 6 } },
    ]);
  });

  it('When white pawn makes its first move and goes 2 squares ahead and black pawn not standing in adjacent column, then black pawn cannot attack in passing', () => {
    const whitePawn = new Pawn(Side.WHITE);
    const blackPawn = new Pawn(Side.BLACK);
    const chessboard = new Chessboard({ G2: whitePawn, E4: blackPawn });
    const engine = new ChessEngine(chessboard);
    const whitePawnFrom: Square = { column: 'G', row: 2 };
    const whitePawnTo: Square = { column: 'G', row: 4 };
    const blackPawnFrom: Square = { column: 'E', row: 4 };
    const blackPawnTo: Square = { column: 'F', row: 3 };

    engine.move(whitePawnFrom, whitePawnTo);

    expect(() => engine.move(blackPawnFrom, blackPawnTo)).toThrowError('Piece can not move to given square.');
  });

  describe('Return player moves without those that cause his king to check', () => {
    const whiteKing = new King(Side.WHITE);
    const whiteRook = new Rook(Side.WHITE);
    const blackKing = new King(Side.BLACK);
    const blackRook = new Rook(Side.BLACK);

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

      const expectedResult = possibleMovesBeforeFiltration;
      expect(engine.possibleMoves(movedPiecePosition)).toIncludeSameMembers(expectedResult);
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

      const expectedResult = [
        { column: 'A', row: 1 },
        { column: 'A', row: 3 },
      ];
      expect(engine.possibleMoves(movedPiecePosition)).toIncludeSameMembers(expectedResult);
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

      const expectedResult = [
        { column: 'A', row: 1 },
        { column: 'B', row: 3 },
      ];
      expect(engine.possibleMoves(movedPiecePosition)).toIncludeSameMembers(expectedResult);
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

      const expectedResult = [
        { column: 'A', row: 1 },
        { column: 'B', row: 3 },
      ];
      expect(engine.possibleMoves(movedPiecePosition)).toIncludeSameMembers(expectedResult);
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

      const expectedResult = [{ column: 'A', row: 1 }];
      expect(engine.possibleMoves(movedPiecePosition)).toIncludeSameMembers(expectedResult);
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

      const expectedResult = [
        { column: 'B', row: 1 },
        { column: 'B', row: 2 },
        { column: 'B', row: 3 },
      ];
      expect(engine.possibleMoves(movedPiecePosition)).toIncludeSameMembers(expectedResult);
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

      const expectedResult = [
        { column: 'A', row: 4 },
        { column: 'A', row: 5 },
        { column: 'A', row: 6 },
        { column: 'A', row: 7 },
      ];
      expect(engine.possibleMoves(movedPiecePosition)).toIncludeSameMembers(expectedResult);
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

      const expectedResult = [] as Square[];
      expect(engine.possibleMoves(movedPiecePosition)).toIncludeSameMembers(expectedResult);
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

      const expectedResult = [] as Square[];
      expect(engine.possibleMoves(movedPiecePosition)).toIncludeSameMembers(expectedResult);
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

    expect(() => engine.move(queenSquareFrom, queenSquareTo)).toThrowError('Piece can not move to given square.');
  });
});

describe('Castling can be done only if neither king nor rook has moved and none of square which the king is passing by is under attack and no piece between the king and the rook', () => {
  const whiteKing = new King(Side.WHITE);
  const whiteRookA1 = new Rook(Side.WHITE);
  const whiteRookH1 = new Rook(Side.WHITE);
  const whiteBishop = new Bishop(Side.WHITE);
  const blackKing = new King(Side.BLACK);
  const blackRook = new Rook(Side.BLACK);
  const blackKnight = new Knight(Side.BLACK);
  const blackPawn = new Pawn(Side.BLACK);

  it('Short castling can be done', () => {
    const boardWithPieces: SquareWithPiece = { E1: whiteKing, H1: whiteRookH1, E8: blackKing };
    const chessBoard = new Chessboard(boardWithPieces);
    const engine = new ChessEngine(chessBoard);
    const kingSquareFrom: Square = { column: 'E', row: 1 };
    const kingSquareTo: Square = { column: 'G', row: 1 };
    const rookSquareFrom: Square = { column: 'H', row: 1 };
    const rookSquareTo: Square = { column: 'F', row: 1 };

    expect(engine.move(kingSquareFrom, kingSquareTo)).toIncludeSameMembers([
      { eventType: 'PieceWasMoved', piece: whiteKing, from: kingSquareFrom, to: kingSquareTo },
      { eventType: 'PieceWasMoved', piece: whiteRookH1, from: rookSquareFrom, to: rookSquareTo },
    ]);
  });

  it('Long castling can be done', () => {
    const boardWithPieces: SquareWithPiece = { E1: whiteKing, A1: whiteRookA1, E8: blackKing };
    const chessBoard = new Chessboard(boardWithPieces);
    const engine = new ChessEngine(chessBoard);
    const kingSquareFrom: Square = { column: 'E', row: 1 };
    const kingSquareTo: Square = { column: 'C', row: 1 };
    const rookSquareFrom: Square = { column: 'A', row: 1 };
    const rookSquareTo: Square = { column: 'D', row: 1 };

    expect(engine.move(kingSquareFrom, kingSquareTo)).toIncludeSameMembers([
      { eventType: 'PieceWasMoved', piece: whiteKing, from: kingSquareFrom, to: kingSquareTo },
      { eventType: 'PieceWasMoved', piece: whiteRookA1, from: rookSquareFrom, to: rookSquareTo },
    ]);
  });

  it('When all conditions are fulfilled and square with rook is under attack, then short castling can be done', () => {
    const boardWithPieces: SquareWithPiece = { C1: whiteBishop, E8: blackKing, H8: blackRook };
    const chessBoard = new Chessboard(boardWithPieces);
    const engine = new ChessEngine(chessBoard);
    const bishopSquareFrom: Square = { column: 'C', row: 1 };
    const bishopSquareTo: Square = { column: 'B', row: 2 };
    const kingSquareFrom: Square = { column: 'E', row: 8 };
    const kingSquareTo: Square = { column: 'G', row: 8 };
    const rookSquareFrom: Square = { column: 'H', row: 8 };
    const rookSquareTo: Square = { column: 'F', row: 8 };

    engine.move(bishopSquareFrom, bishopSquareTo);
    expect(engine.move(kingSquareFrom, kingSquareTo)).toIncludeSameMembers([
      { eventType: 'PieceWasMoved', piece: blackKing, from: kingSquareFrom, to: kingSquareTo },
      { eventType: 'PieceWasMoved', piece: blackRook, from: rookSquareFrom, to: rookSquareTo },
    ]);
  });

  it('When all conditions are fulfilled and square B8 is under attack, then long castling can be done', () => {
    const boardWithPieces: SquareWithPiece = { G1: whiteBishop, E8: blackKing, A8: blackRook };
    const chessBoard = new Chessboard(boardWithPieces);
    const engine = new ChessEngine(chessBoard);
    const bishopSquareFrom: Square = { column: 'G', row: 1 };
    const bishopSquareTo: Square = { column: 'H', row: 2 };
    const kingSquareFrom: Square = { column: 'E', row: 8 };
    const kingSquareTo: Square = { column: 'C', row: 8 };
    const rookSquareFrom: Square = { column: 'A', row: 8 };
    const rookSquareTo: Square = { column: 'D', row: 8 };

    engine.move(bishopSquareFrom, bishopSquareTo);
    expect(engine.move(kingSquareFrom, kingSquareTo)).toIncludeSameMembers([
      { eventType: 'PieceWasMoved', piece: blackKing, from: kingSquareFrom, to: kingSquareTo },
      { eventType: 'PieceWasMoved', piece: blackRook, from: rookSquareFrom, to: rookSquareTo },
    ]);
  });

  it('When all conditions are fulfilled but move starts with the rook, then castling will not be done', () => {
    const boardWithPieces: SquareWithPiece = { E1: whiteKing, H1: whiteRookH1, E8: blackKing };
    const chessBoard = new Chessboard(boardWithPieces);
    const engine = new ChessEngine(chessBoard);
    const rookSquareFrom: Square = { column: 'H', row: 1 };
    const rookSquareTo: Square = { column: 'F', row: 1 };

    expect(engine.move(rookSquareFrom, rookSquareTo)).toIncludeSameMembers([
      { eventType: 'PieceWasMoved', piece: whiteRookH1, from: rookSquareFrom, to: rookSquareTo },
    ]);
  });

  it('When king is checked, then castling cannot be done', () => {
    const boardWithPieces: SquareWithPiece = { E1: whiteKing, H1: whiteRookH1, E8: blackRook };
    const chessBoard = new Chessboard(boardWithPieces);
    const engine = new ChessEngine(chessBoard);
    const kingSquareFrom: Square = { column: 'E', row: 1 };
    const shortCastlingSquareTo: Square = { column: 'G', row: 1 };
    const longCastlingSquareTo: Square = { column: 'C', row: 1 };

    expect(() => engine.move(kingSquareFrom, shortCastlingSquareTo)).toThrowError('Piece can not move to given square.');

    expect(() => engine.move(kingSquareFrom, longCastlingSquareTo)).toThrowError('Piece can not move to given square.');
  });

  it('When king is moving through check, then castling cannot be done', () => {
    const boardWithPieces: SquareWithPiece = { A1: whiteRookA1, E1: whiteKing, H1: whiteRookH1, E3: blackKnight };
    const chessBoard = new Chessboard(boardWithPieces);
    const engine = new ChessEngine(chessBoard);
    const kingSquareFrom: Square = { column: 'E', row: 1 };
    const shortCastlingSquareTo: Square = { column: 'G', row: 1 };
    const longCastlingSquareTo: Square = { column: 'C', row: 1 };

    expect(() => engine.move(kingSquareFrom, shortCastlingSquareTo)).toThrowError('Piece can not move to given square.');

    expect(() => engine.move(kingSquareFrom, longCastlingSquareTo)).toThrowError('Piece can not move to given square.');
  });

  it('When king is moving into check, then castling cannot be done', () => {
    const boardWithPieces: SquareWithPiece = { A1: whiteRookA1, E1: whiteKing, H1: whiteRookH1, E2: blackKnight };
    const chessBoard = new Chessboard(boardWithPieces);
    const engine = new ChessEngine(chessBoard);
    const kingSquareFrom: Square = { column: 'E', row: 1 };
    const shortCastlingSquareTo: Square = { column: 'G', row: 1 };
    const longCastlingSquareTo: Square = { column: 'C', row: 1 };

    expect(() => engine.move(kingSquareFrom, shortCastlingSquareTo)).toThrowError('Piece can not move to given square.');

    expect(() => engine.move(kingSquareFrom, longCastlingSquareTo)).toThrowError('Piece can not move to given square.');
  });

  it('When some piece is between the king and the rook, then castling cannot be done', () => {
    const boardWithPieces: SquareWithPiece = { E1: whiteKing, F1: whiteBishop, H1: whiteRookH1 };
    const chessBoard = new Chessboard(boardWithPieces);
    const engine = new ChessEngine(chessBoard);
    const kingSquareFrom: Square = { column: 'E', row: 1 };
    const kingSquareTo: Square = { column: 'G', row: 1 };

    expect(() => engine.move(kingSquareFrom, kingSquareTo)).toThrowError('Piece can not move to given square.');
  });

  it('When the king has already moved, then castling cannot be done', () => {
    const boardWithPieces: SquareWithPiece = { E1: whiteKing, H1: whiteRookH1, C7: blackPawn };
    const chessBoard = new Chessboard(boardWithPieces);
    const engine = new ChessEngine(chessBoard);
    const kingStartingSquare: Square = { column: 'E', row: 1 };
    const kingFirstMoveSquare: Square = { column: 'E', row: 2 };
    const castlingSquareTo: Square = { column: 'G', row: 1 };
    const pawnStartingSquare: Square = { column: 'C', row: 7 };
    const pawnFirstMoveSquare: Square = { column: 'C', row: 6 };
    const pawnSecondMoveSquare: Square = { column: 'C', row: 5 };

    engine.move(kingStartingSquare, kingFirstMoveSquare);
    engine.move(pawnStartingSquare, pawnFirstMoveSquare);
    engine.move(kingFirstMoveSquare, kingStartingSquare);
    engine.move(pawnFirstMoveSquare, pawnSecondMoveSquare);
    expect(() => engine.move(kingStartingSquare, castlingSquareTo)).toThrowError('Piece can not move to given square.');
  });
  it('When the rook has already moved, then castling cannot be done', () => {
    const boardWithPieces: SquareWithPiece = { E1: whiteKing, H1: whiteRookH1, C7: blackPawn };
    const chessBoard = new Chessboard(boardWithPieces);
    const engine = new ChessEngine(chessBoard);
    const kingSquareFrom: Square = { column: 'E', row: 1 };
    const kingSquareTo: Square = { column: 'G', row: 1 };
    const rookStartingSquare: Square = { column: 'H', row: 1 };
    const rookFirstMoveSquare: Square = { column: 'H', row: 2 };
    const pawnStartingSquare: Square = { column: 'C', row: 7 };
    const pawnFirstMoveSquare: Square = { column: 'C', row: 6 };
    const pawnSecondMoveSquare: Square = { column: 'C', row: 5 };

    engine.move(rookStartingSquare, rookFirstMoveSquare);
    engine.move(pawnStartingSquare, pawnFirstMoveSquare);
    engine.move(rookFirstMoveSquare, rookStartingSquare);
    engine.move(pawnFirstMoveSquare, pawnSecondMoveSquare);
    expect(() => engine.move(kingSquareFrom, kingSquareTo)).toThrowError('Piece can not move to given square.');
  });

  describe('Checkmate and Stalemate event', () => {
    const whiteKing = new King(Side.WHITE);
    const blackKing = new King(Side.BLACK);
    const whiteRook = new Rook(Side.WHITE);
    const blackRook = new Rook(Side.BLACK);
    const blackPawn = new Pawn(Side.BLACK);

    const descriptionWithoutCheckmate = `Should't return checkmate event If checkmate Hasn't Occurred.`;
    const descriptionWithCheckmate = `Should return checkmate event If checkmate Has Occurred.`;
    const descriptionWithStalemate = `Should return Stalemate event If stalemate Has Occurred.`;

    it(`${descriptionWithoutCheckmate} Enemy king is not checked`, () => {
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

    it(`${descriptionWithoutCheckmate} Enemy king is checked.`, () => {
      const boardWithPieces: SquareWithPiece = {
        A1: whiteKing,
        B1: whiteRook,
        H8: blackKing,
      };
      const chessboard = new Chessboard(boardWithPieces);
      const engine = new ChessEngine(chessboard);
      const startPiecePosition: Square = { column: 'B', row: 1 };
      const endPiecePosition: Square = { column: 'B', row: 8 };

      const returnedResult = engine.move(startPiecePosition, endPiecePosition);

      const expectedResult = [
        { eventType: 'PieceWasMoved', from: { column: 'B', row: 1 }, piece: { name: 'Rook', side: 'WHITE' }, to: { column: 'B', row: 8 } },
        { eventType: 'KingWasChecked', king: { name: 'King', side: 'BLACK' }, onSquare: { column: 'H', row: 8 } },
      ];
      expect(returnedResult).toIncludeSameMembers(expectedResult);
    });

    it(`${descriptionWithoutCheckmate} Enemy king is checked. King can capture.`, () => {
      const boardWithPieces: SquareWithPiece = {
        A1: whiteKing,
        B1: whiteRook,
        G7: whiteRook,
        H7: blackRook,
        H8: blackKing,
      };
      const chessboard = new Chessboard(boardWithPieces);
      const engine = new ChessEngine(chessboard);
      const startPiecePosition: Square = { column: 'B', row: 1 };
      const endPiecePosition: Square = { column: 'B', row: 8 };

      const returnedResult = engine.move(startPiecePosition, endPiecePosition);

      const expectedResult = [
        { eventType: 'PieceWasMoved', from: { column: 'B', row: 1 }, piece: { name: 'Rook', side: 'WHITE' }, to: { column: 'B', row: 8 } },
        { eventType: 'KingWasChecked', king: { name: 'King', side: 'BLACK' }, onSquare: { column: 'H', row: 8 } },
      ];
      expect(returnedResult).toIncludeSameMembers(expectedResult);
    });

    it(descriptionWithCheckmate, () => {
      const boardWithPieces: SquareWithPiece = {
        A1: whiteKing,
        A7: whiteRook,
        B1: whiteRook,
        H8: blackKing,
      };
      const chessboard = new Chessboard(boardWithPieces);
      const engine = new ChessEngine(chessboard);
      const startPiecePosition: Square = { column: 'B', row: 1 };
      const endPiecePosition: Square = { column: 'B', row: 8 };

      const returnedResult = engine.move(startPiecePosition, endPiecePosition);

      const expectedResult = [
        { eventType: 'PieceWasMoved', from: { column: 'B', row: 1 }, piece: { name: 'Rook', side: 'WHITE' }, to: { column: 'B', row: 8 } },
        { eventType: 'KingWasChecked', king: { name: 'King', side: 'BLACK' }, onSquare: { column: 'H', row: 8 } },
        { eventType: 'CheckmateHasOccurred', king: { name: 'King', side: 'BLACK' }, onSquare: { column: 'H', row: 8 } },
      ];
      expect(returnedResult).toIncludeSameMembers(expectedResult);
    });

    it(descriptionWithCheckmate, () => {
      const boardWithPieces: SquareWithPiece = {
        A1: whiteKing,
        B1: whiteRook,
        H7: blackPawn,
        G7: blackPawn,
        H8: blackKing,
      };
      const chessboard = new Chessboard(boardWithPieces);
      const engine = new ChessEngine(chessboard);
      const startPiecePosition: Square = { column: 'B', row: 1 };
      const endPiecePosition: Square = { column: 'B', row: 8 };

      const returnedResult = engine.move(startPiecePosition, endPiecePosition);

      const expectedResult = [
        { eventType: 'PieceWasMoved', from: { column: 'B', row: 1 }, piece: { name: 'Rook', side: 'WHITE' }, to: { column: 'B', row: 8 } },
        { eventType: 'KingWasChecked', king: { name: 'King', side: 'BLACK' }, onSquare: { column: 'H', row: 8 } },
        { eventType: 'CheckmateHasOccurred', king: { name: 'King', side: 'BLACK' }, onSquare: { column: 'H', row: 8 } },
      ];
      expect(returnedResult).toIncludeSameMembers(expectedResult);
    });

    it(`${descriptionWithCheckmate} Black king and black rook cannot capture`, () => {
      const boardWithPieces: SquareWithPiece = {
        A1: whiteKing,
        B1: whiteRook,
        G6: whiteRook,
        G7: whiteRook,
        H6: whiteRook,
        H7: blackRook,
        H8: blackKing,
      };
      const chessboard = new Chessboard(boardWithPieces);
      const engine = new ChessEngine(chessboard);
      const startPiecePosition: Square = { column: 'B', row: 1 };
      const endPiecePosition: Square = { column: 'B', row: 8 };

      const returnedResult = engine.move(startPiecePosition, endPiecePosition);

      const expectedResult = [
        {
          eventType: 'PieceWasMoved',
          from: { column: 'B', row: 1 },
          piece: { name: 'Rook', side: 'WHITE' },
          to: { column: 'B', row: 8 },
        },
        { eventType: 'KingWasChecked', king: { name: 'King', side: 'BLACK' }, onSquare: { column: 'H', row: 8 } },
        { eventType: 'CheckmateHasOccurred', king: { name: 'King', side: 'BLACK' }, onSquare: { column: 'H', row: 8 } },
      ];
      expect(returnedResult).toIncludeSameMembers(expectedResult);
    });

    it(`${descriptionWithCheckmate} Black king and black rook cannot capture`, () => {
      const boardWithPieces: SquareWithPiece = {
        A1: whiteKing,
        B1: whiteRook,
        G6: whiteRook,
        G7: whiteRook,
        H6: whiteRook,
        H7: blackRook,
        H8: blackKing,
      };
      const chessboard = new Chessboard(boardWithPieces);
      const engine = new ChessEngine(chessboard);
      const startPiecePosition: Square = { column: 'B', row: 1 };
      const endPiecePosition: Square = { column: 'B', row: 8 };

      const returnedResult = engine.move(startPiecePosition, endPiecePosition);

      const expectedResult = [
        {
          eventType: 'PieceWasMoved',
          from: { column: 'B', row: 1 },
          piece: { name: 'Rook', side: 'WHITE' },
          to: { column: 'B', row: 8 },
        },
        { eventType: 'KingWasChecked', king: { name: 'King', side: 'BLACK' }, onSquare: { column: 'H', row: 8 } },
        { eventType: 'CheckmateHasOccurred', king: { name: 'King', side: 'BLACK' }, onSquare: { column: 'H', row: 8 } },
      ];
      expect(returnedResult).toIncludeSameMembers(expectedResult);
    });

    it(descriptionWithStalemate, () => {
      const boardWithPieces: SquareWithPiece = {
        A1: whiteKing,
        A6: whiteRook,
        G7: whiteRook,
        H8: blackKing,
      };
      const chessboard = new Chessboard(boardWithPieces);
      const engine = new ChessEngine(chessboard);
      const startPiecePosition: Square = { column: 'A', row: 6 };
      const endPiecePosition: Square = { column: 'G', row: 6 };

      const returnedResult = engine.move(startPiecePosition, endPiecePosition);

      const expectedResult = [
        {
          eventType: 'PieceWasMoved',
          from: { column: 'A', row: 6 },
          piece: { name: 'Rook', side: 'WHITE' },
          to: { column: 'G', row: 6 },
        },
        { eventType: 'StalemateHasOccurred', king: { name: 'King', side: 'BLACK' }, onSquare: { column: 'H', row: 8 } },
      ];
      expect(returnedResult).toIncludeSameMembers(expectedResult);
    });
  });
});

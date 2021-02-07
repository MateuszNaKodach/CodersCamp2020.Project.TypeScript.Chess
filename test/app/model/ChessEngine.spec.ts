import { ChessEngine } from '../../../src/app/model/ChessEngine';
import { PieceWasCaptured, PieceWasMoved, Side, Square, SquareWithPiece } from '../../../src/app/model/Types';
import { ChessBoard } from '../../../src/app/model/ChessBoard';
import { Pawn } from '../../../src/app/model/Pawn';
import { Player } from '../../../src/app/model/Player';
import 'jest-extended';
import { Queen } from '../../../src/app/model/Queen';

describe('Chess Engine', () => {
  it('Given white piece on A2 and black piece on A4, should move white piece to A3 and return expected list of events', () => {
    const engine = new ChessEngine();
    const whitePiece = new Pawn(Side.WHITE);
    const blackPiece = new Pawn(Side.BLACK);
    const boardWithPieces: SquareWithPiece = { A2: whitePiece, A4: blackPiece };
    const chessBoard = new ChessBoard(boardWithPieces);
    const player = new Player(Side.WHITE);
    const squareFrom: Square = { column: 'A', row: 2 };
    const squareTo: Square = { column: 'A', row: 3 };

    const eventsList: (PieceWasMoved | PieceWasCaptured)[] = engine.move(player, squareFrom, squareTo, chessBoard);

    expect(eventsList).toIncludeSameMembers([{ eventType: 'PieceWasMoved', piece: whitePiece, from: squareFrom, to: squareTo }]);
  });
  it('Given white piece on A2 and black piece on A4, should move white piece to A4 capturing oponents piece and return expected list of events', () => {
    const engine = new ChessEngine();
    const whitePiece = new Queen(Side.WHITE);
    const blackPiece = new Pawn(Side.BLACK);
    const boardWithPieces: SquareWithPiece = { A2: whitePiece, A4: blackPiece };
    const chessBoard = new ChessBoard(boardWithPieces);
    const player = new Player(Side.WHITE);
    const squareFrom: Square = { column: 'A', row: 2 };
    const squareTo: Square = { column: 'A', row: 4 };

    const eventsList: (PieceWasMoved | PieceWasCaptured)[] = engine.move(player, squareFrom, squareTo, chessBoard);

    expect(eventsList).toIncludeSameMembers([{ eventType: 'PieceWasCaptured', piece: blackPiece, onSquare: squareTo }]);
  });
});

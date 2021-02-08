import { ChessModel } from './ChessModel';
import { Side, Square } from './Types';
import { Piece } from './Piece';
import { Player } from './Player';
import { ChessBoard } from './ChessBoard';
import { PieceWasMoved } from './PieceWasMoved';
import { PieceWasCaptured } from './PieceWasCaptured';

export class ChessEngine implements ChessModel {
  currentSide: Side = Side.BLACK;

  constructor(readonly board: ChessBoard) {}

  move(byPlayer: Player, squareFrom: Square, squareTo: Square): (PieceWasMoved | PieceWasCaptured)[] {
    const chosenPiece = this.board.onPositionPiece(squareFrom) as Piece;
    const possibleMoves = chosenPiece.possibleMoves(squareFrom, this.board);
    const pieceOnSquare = this.board.onPositionPiece(squareTo);
    const isOponent = pieceOnSquare && pieceOnSquare.side !== chosenPiece.side;

    if (byPlayer.side == this.currentSide) throw new Error('Player can not move twice in a row.');
    if (byPlayer.side !== chosenPiece.side) throw new Error('Player can not move other players pieces.');
    if (
      !possibleMoves.find((square: Square) => {
        return square.column == squareTo.column && square.row == squareTo.row;
      })
    )
      throw new Error('Piece can not move to given square.');
    const pieceWasMoved: PieceWasMoved = { eventType: 'PieceWasMoved', piece: chosenPiece, from: squareFrom, to: squareTo };
    this.onPieceWasMoved(pieceWasMoved);
    const pieceWasCaptured: PieceWasCaptured | undefined =
      isOponent && isPiece(pieceOnSquare)
        ? {
            eventType: 'PieceWasCaptured',
            piece: pieceOnSquare,
            onSquare: squareTo,
          }
        : undefined;

    return pieceWasCaptured ? [pieceWasMoved, pieceWasCaptured] : [pieceWasMoved];
  }

  private onPieceWasMoved(event: PieceWasMoved): void {
    this.board.movePiece(event.from, event.to);
    this.currentSide = event.piece.side;
  }
}

const isPiece = (varToCheck: unknown): varToCheck is Piece => (varToCheck as Piece) !== undefined;

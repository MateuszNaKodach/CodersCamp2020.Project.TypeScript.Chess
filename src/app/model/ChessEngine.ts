import { ChessModel } from './ChessModel';
import { Side, Square, SquareWithPiece } from './Types';
import { Piece } from './pieces';
import { Player } from './Player';
import { Chessboard } from './Chessboard';
import { PieceWasMoved } from './PieceWasMoved';
import { PieceWasCaptured } from './PieceWasCaptured';
import { isDefined } from './HelperFunctions';
import { KingWasChecked } from './KingWasChecked';
import { KingWasUnchecked } from './KingWasUnchecked';

export class ChessEngine implements ChessModel {
  private currentSide: Side = Side.WHITE;
  readonly squaresWithPiece: SquareWithPiece;
  private eventsHistory: (PieceWasMoved | PieceWasCaptured | KingWasChecked | KingWasUnchecked)[] = [];
  constructor(private readonly board: Chessboard) {
    this.squaresWithPiece = board.squaresWithPiece;
  }

  move(byPlayer: Player, squareFrom: Square, squareTo: Square): (PieceWasMoved | PieceWasCaptured | KingWasChecked | KingWasUnchecked)[] {
    const events = [];
    const chosenPiece = this.board.onPositionPiece(squareFrom);
    if (!chosenPiece) {
      throw new Error('There is no piece on this square.');
    }
    if (byPlayer.side !== this.currentSide) {
      throw new Error(`It's not Your turn.`);
    }
    if (byPlayer.side !== chosenPiece.side) {
      throw new Error('Player can not move other players pieces.');
    }
    if (!this.canMoveOnSquare(squareFrom, squareTo)) {
      throw new Error('Piece can not move to given square.');
    }

    const pieceWasMoved: PieceWasMoved = {
      eventType: 'PieceWasMoved',
      piece: chosenPiece,
      from: squareFrom,
      to: squareTo,
    };
    const pieceWasCaptured = this.pieceWasCaptured(squareTo, chosenPiece);
    if (pieceWasCaptured) {
      events.push(pieceWasCaptured);
    }

    this.onPieceWasMoved(pieceWasMoved);
    events.push(pieceWasMoved);

    // return pieceWasCaptured ? [pieceWasMoved, pieceWasCaptured] : [pieceWasMoved];
    return events;
  }

  private pieceWasCaptured(squareTo: Square, chosenPiece: Piece): PieceWasCaptured | undefined {
    const pieceOnSquare = this.board.onPositionPiece(squareTo);
    return isDefined(pieceOnSquare) && pieceOnSquare.isOpponentOf(chosenPiece)
      ? {
          eventType: 'PieceWasCaptured',
          piece: pieceOnSquare,
          onSquare: squareTo,
        }
      : undefined;
  }

  private onPieceWasMoved(event: PieceWasMoved): void {
    this.board.movePiece(event.from, event.to);
    this.currentSide = this.changeTurn(event.piece.side);
  }

  private canMoveOnSquare(squareFrom: Square, squareTo: Square): boolean {
    const piecePossibleMoves = this.board.onPositionPiece(squareFrom)?.possibleMoves(squareFrom, this.board);
    return (
      piecePossibleMoves?.some((possibleMove) => possibleMove.column === squareTo.column && possibleMove.row === squareTo.row) ?? false
    );
  }

  private changeTurn(side: Side): Side {
    return side === Side.WHITE ? Side.BLACK : Side.WHITE;
  }
}

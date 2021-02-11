import { ChessModel } from './ChessModel';
import { Side, Square, SquareWithPiece } from './Types';
import { Piece } from './pieces';
import { Player } from './Player';
import { Chessboard } from './Chessboard';
import { PieceWasMoved } from './PieceWasMoved';
import { PieceWasCaptured } from './PieceWasCaptured';
import { isDefined } from './HelperFunctions';

export class ChessEngine implements ChessModel {
  private currentSide: Side = Side.BLACK;
  readonly squaresWithPiece: SquareWithPiece;

  constructor(private readonly board: Chessboard) {
    this.squaresWithPiece = board.squaresWithPiece;
  }

  move(byPlayer: Player, squareFrom: Square, squareTo: Square): (PieceWasMoved | PieceWasCaptured)[] {
    const chosenPiece = this.board.onPositionPiece(squareFrom);
    if (!chosenPiece) {
      throw new Error('There is no piece on this square.');
    }
    if (byPlayer.side == this.currentSide) {
      throw new Error('Player can not move twice in a row.');
    }
    if (byPlayer.side !== chosenPiece.side) {
      throw new Error('Player can not move other players pieces.');
    }
    if (!this.canMoveOnSquare(squareFrom, squareTo)) {
      throw new Error('Piece can not move to given square.');
    }
    // if(!) ----------------------------------------------------------------------

    const pieceWasMoved: PieceWasMoved = {
      eventType: 'PieceWasMoved',
      piece: chosenPiece,
      from: squareFrom,
      to: squareTo,
    };
    const pieceWasCaptured = this.pieceWasCaptured(squareTo, chosenPiece);

    this.onPieceWasMoved(pieceWasMoved);
    return pieceWasCaptured ? [pieceWasMoved, pieceWasCaptured] : [pieceWasMoved];
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
    this.currentSide = event.piece.side;
  }

  private canMoveOnSquare(squareFrom: Square, squareTo: Square): boolean {
    const piecePossibleMoves = this.board.onPositionPiece(squareFrom)?.possibleMoves(squareFrom, this.board);
    return (
      piecePossibleMoves?.some((possibleMove) => possibleMove.column === squareTo.column && possibleMove.row === squareTo.row) ?? false
    );
  }

  private willBeKingChecked(): boolean {
    return false;
  }
}

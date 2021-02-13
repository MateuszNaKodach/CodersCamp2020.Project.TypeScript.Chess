import { ChessModel } from './ChessModel';
import { Row, Side, Square, SquareWithPiece } from './Types';
import { King, Piece } from './pieces';
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

  move(squareFrom: Square, squareTo: Square): ChessboardEvent[] {
    const events = [];
    const chosenPiece = this.board.onPositionPiece(squareFrom);
    if (!chosenPiece) {
      throw new Error('There is no piece on this square.');
    }
    if (chosenPiece.side !== this.currentSide) {
      throw new Error(`It's not Your turn.`);
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

    const kingWasChecked = this.kingWasChecked(chosenPiece);
    if (kingWasChecked) {
      events.push(kingWasChecked);
    }
    const kingWasUnchecked = this.kingWasUnchecked(pieceWasMoved);
    if (kingWasUnchecked) {
      events.push(kingWasUnchecked);
    }
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

  private simulatedChessboardAfterMove(squareFrom: Square, squareTo: Square): Chessboard {
    const simulatedChessboard = new Chessboard({ ...this.board.squaresWithPiece });
    simulatedChessboard.movePiece(squareFrom, squareTo);
    return simulatedChessboard;
  }

  private kingPosition(chessboard: Chessboard, kingSide: Side): Square | undefined {
    const { squaresWithPiece: squaresWithPieces } = chessboard;
    const kingPositionKey = Object.keys(squaresWithPieces).find((key) => {
      const isKingName = squaresWithPieces[key].name === 'King';
      const isPlayerSide = squaresWithPieces[key].side === kingSide;
      return isKingName && isPlayerSide;
    });
    return kingPositionKey
      ? {
          column: kingPositionKey[0],
          row: Number(kingPositionKey[1]) as Row,
        }
      : undefined;
  }

  private isSquareChecked(chessboard: Chessboard, playerSide: Side, positionToControl: Square): boolean {
    const squaresWithPieces = chessboard.squaresWithPiece;
    return Object.keys(squaresWithPieces)
      .map((squareKey) => ({
        position: { column: squareKey[0], row: Number(squareKey[1]) as Row },
        piece: squaresWithPieces[squareKey],
      }))
      .filter(({ piece }) => piece.side !== playerSide)
      .map(({ position, piece }) => piece.possibleMoves(position, chessboard))
      .some((piecePossibleMoves) =>
        piecePossibleMoves.some((moveSquare) => moveSquare.column === positionToControl.column && moveSquare.row === positionToControl.row),
      );
  }

  private isKingChecked(chessboard: Chessboard, kingSide: Side): boolean {
    const kingPosition = this.kingPosition(chessboard, kingSide);
    return kingPosition ? this.isSquareChecked(chessboard, kingSide, kingPosition) : false;
  }

  private willBeKingChecked(squareFrom: Square, squareTo: Square): boolean {
    const simulatedChessboard = this.simulatedChessboardAfterMove(squareFrom, squareTo);
    return this.isKingChecked(simulatedChessboard, this.currentSide);
  }

  public pieceMovesNotCausingAllyKingCheckmate(position: Square): Square[] {
    const initialPossibleMoves = this.board.onPositionPiece(position)?.possibleMoves(position, this.board) ?? [];
    const filteringFunction = (onePossibleMove: Square) => !this.willBeKingChecked(position, onePossibleMove);
    return initialPossibleMoves.filter(filteringFunction);
  }

  public possibleMoves(position: Square): Square[] {
    return this.pieceMovesNotCausingAllyKingCheckmate(position);
  }

  private kingWasChecked(chosenPiece: Piece): KingWasChecked | undefined {
    const kingsSide = chosenPiece.side === Side.WHITE ? Side.BLACK : Side.WHITE;
    const kingPosition = this.kingPosition(this.board, kingsSide);
    let king;
    if (kingPosition) {
      king = this.board.onPositionPiece(kingPosition);
    }
    const isKingChecked = this.isKingChecked(this.board, kingsSide);
    return isKingChecked && king instanceof King && kingPosition
      ? {
          eventType: 'KingWasChecked',
          king: king,
          onSquare: kingPosition,
        }
      : undefined;
  }

  private kingWasUnchecked(pieceWasMoved: PieceWasMoved): KingWasUnchecked | undefined {
    const king = pieceWasMoved.piece;
    const kingLastPosition = pieceWasMoved.from;

    return king instanceof King ? { eventType: 'KingWasUnchecked', king: king, onSquare: kingLastPosition } : undefined;
  }
}

export type ChessboardEvent = PieceWasMoved | PieceWasCaptured | KingWasChecked | KingWasUnchecked;

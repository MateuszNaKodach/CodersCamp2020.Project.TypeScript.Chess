import { ChessModel } from './ChessModel';
import { Row, Side, Square, SquareWithPiece } from './Types';
import { King, Pawn, Piece } from './pieces';
import { Chessboard } from './Chessboard';
import { PieceWasMoved } from './PieceWasMoved';
import { PieceWasCaptured } from './PieceWasCaptured';
import { PawnPromotionWasEnabled } from './PawnPromotionWasEnabled';
import { isDefined } from './HelperFunctions';
import { KingWasChecked } from './KingWasChecked';
import { KingWasUnchecked } from './KingWasUnchecked';
import { MoveResult } from './MoveResult';

type CheckedKing = { kingSide: Side; position: Square };

export class ChessEngine implements ChessModel {
  private currentSide: Side = Side.WHITE;
  readonly squaresWithPiece: SquareWithPiece;
  private promotingOnSquare: Square | undefined;
  private checkedKing: CheckedKing | undefined;

  constructor(private readonly board: Chessboard) {
    this.squaresWithPiece = board.squaresWithPiece;
  }

  move(squareFrom: Square, squareTo: Square): MoveResult[] {
    const chosenPiece = this.board.onPositionPiece(squareFrom);
    if (!chosenPiece) {
      throw new Error('There is no piece on this square.');
    }
    if (this.promotingOnSquare) {
      throw new Error('No move is possible until promotion is done.');
    }
    if (chosenPiece.side !== this.currentSide) {
      throw new Error(`It's not Your turn.`);
    }
    if (!this.canMoveOnSquare(squareFrom, squareTo)) {
      throw new Error('Piece can not move to given square.');
    }
    if (this.willBeKingChecked(squareFrom, squareTo)) {
      throw new Error('You must not make a move that will result in checking your king.');
    }

    const pieceWasMoved: PieceWasMoved = {
      eventType: 'PieceWasMoved',
      piece: chosenPiece,
      from: squareFrom,
      to: squareTo,
    };
    const pieceWasCaptured = this.pieceWasCaptured(squareTo, chosenPiece);

    const pawnPromotionWasEnabled = this.pawnPromotionWasEnabled(chosenPiece, squareTo);
    this.onPawnPromotionWasEnabled(pawnPromotionWasEnabled);
    this.onPieceWasMoved(pieceWasMoved);

    const kingWasChecked = this.kingWasChecked(chosenPiece);
    if (kingWasChecked) {
      this.onKingWasChecked(kingWasChecked);
    }
    const kingWasUnchecked = this.kingWasUnchecked();
    if (kingWasUnchecked) {
      this.onKingWasUnchecked(kingWasUnchecked);
    }

    return [pieceWasCaptured, pieceWasMoved, kingWasChecked, kingWasUnchecked].filter(this.hasOccurred);
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

  private pawnPromotionWasEnabled(chosenPiece: Piece, squareTo: Square): PawnPromotionWasEnabled | undefined {
    return chosenPiece instanceof Pawn &&
      ((chosenPiece.side === Side.WHITE && squareTo.row === 8) || (chosenPiece.side === Side.BLACK && squareTo.row === 1))
      ? {
          eventType: 'PawnPromotionWasEnabled',
          onSquare: squareTo,
          pawn: chosenPiece as Pawn,
        }
      : undefined;
  }

  private onPieceWasMoved(event: PieceWasMoved): void {
    this.board.movePiece(event.from, event.to);
    if (!this.promotingOnSquare) {
      this.currentSide = this.anotherSide(event.piece.side);
    }
  }

  private onPawnPromotionWasEnabled(event: PawnPromotionWasEnabled | undefined): void {
    if (event) {
      this.promotingOnSquare = event.onSquare;
    }
  }

  private canMoveOnSquare(squareFrom: Square, squareTo: Square): boolean {
    const piecePossibleMoves = this.board.onPositionPiece(squareFrom)?.possibleMoves(squareFrom, this.board);
    return (
      piecePossibleMoves?.some((possibleMove) => possibleMove.column === squareTo.column && possibleMove.row === squareTo.row) ?? false
    );
  }

  private anotherSide(side: Side): Side {
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

  private hasOccurred<T>(x: T | undefined): x is T {
    return typeof x !== 'undefined' && x !== null;
  }

  private onKingWasChecked(event: KingWasChecked): void {
    this.checkedKing = { kingSide: event.king.side, position: event.onSquare };
  }

  private kingWasChecked(chosenPiece: Piece): KingWasChecked | undefined {
    const kingsSide = chosenPiece.side === Side.WHITE ? Side.BLACK : Side.WHITE;
    const kingPosition = this.kingPosition(this.board, kingsSide);
    if (!kingPosition) {
      return undefined;
    }
    const isKingChecked = this.isKingChecked(this.board, kingsSide);
    return isKingChecked
      ? {
          eventType: 'KingWasChecked',
          king: new King(kingsSide),
          onSquare: kingPosition,
        }
      : undefined;
  }

  private kingWasUnchecked(): KingWasUnchecked | undefined {
    if (!this.checkedKing) {
      return undefined;
    }
    const isKingChecked = this.isKingChecked(this.board, this.checkedKing.kingSide);
    return !isKingChecked
      ? {
          eventType: 'KingWasUnchecked',
        }
      : undefined;
  }

  private onKingWasUnchecked(event: KingWasUnchecked): void {
    this.checkedKing = undefined;
  }
}

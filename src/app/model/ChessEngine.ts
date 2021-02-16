import { ChessModel } from './ChessModel';
import { Column, columns, Row, Side, Square, SquareWithPiece } from './Types';
import { King, Pawn, Piece, Rook } from './pieces';
import { Chessboard } from './Chessboard';
import { PieceWasMoved } from './PieceWasMoved';
import { PieceWasCaptured } from './PieceWasCaptured';
import { PawnPromotionWasEnabled } from './PawnPromotionWasEnabled';
import { isDefined } from './HelperFunctions';
import { KingWasChecked } from './KingWasChecked';
import { KingWasUnchecked } from './KingWasUnchecked';
import { MoveResult } from './MoveResult';
import { CheckmateHasOccurred } from './CheckmateHasOccurred';
import { StalemateHasOccurred } from './StalemateHasOccurred';

type CheckedKing = { kingSide: Side; position: Square };

export class ChessEngine implements ChessModel {
  private currentSide: Side = Side.WHITE;
  readonly squaresWithPiece: SquareWithPiece;
  private promotingOnSquare: Square | undefined;
  private checkedKing: CheckedKing | undefined;
  private moveHistory: PieceWasMoved[] = [];
  private lastMove: PieceWasMoved | undefined;

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

    const pieceWasMoved: PieceWasMoved = {
      eventType: 'PieceWasMoved',
      piece: chosenPiece,
      from: squareFrom,
      to: squareTo,
    };

    const castlingWasDone = this.castlingWasDone(squareFrom, squareTo);
    let pieceWasCaptured;
    if (this.lastMove && this.canAttackInPassing(squareFrom, this.lastMove)) {
      pieceWasCaptured = this.pieceWasCapturedInPassing(this.lastMove);
      this.onPawnCaptureInPassing(this.lastMove);
    } else {
      pieceWasCaptured = this.pieceWasCaptured(squareTo, chosenPiece);
    }

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
    const checkmateHasOccurred = this.checkmateHasOccurred();
    const stalemateHasOccurred = this.stalemateHasOccurred();
    this.lastMove = pieceWasMoved;

    return [
      pieceWasCaptured,
      pieceWasMoved,
      kingWasChecked,
      kingWasUnchecked,
      checkmateHasOccurred,
      stalemateHasOccurred,
      pawnPromotionWasEnabled,
      castlingWasDone,
    ].filter(this.hasOccurred);
  }

  public possibleMoves(pieceMovingFrom: Square): Square[] {
    const possibleMoves = this.board.onPositionPiece(pieceMovingFrom)?.possibleMoves(pieceMovingFrom, this.board) ?? [];
    const castlingMoves = this.castlingMoves(pieceMovingFrom);
    const enPassantMoves = this.enPassantMoves(pieceMovingFrom);
    return this.pieceMovesNotCausingAllyKingCheck(pieceMovingFrom, [...possibleMoves, ...castlingMoves, ...enPassantMoves]);
  }

  private enPassantMoves(squareFrom: Square): Square[] {
    if (this.lastMove && this.canAttackInPassing(squareFrom, this.lastMove)) {
      const additionalSquareToAttack: Square =
        this.lastMove.piece.side === Side.WHITE ? this.squareDown(this.lastMove.to) : this.squareUp(this.lastMove.to);
      return [additionalSquareToAttack];
    } else {
      return [];
    }
  }

  private castlingMoves(pieceMovingFrom: Square): Square[] {
    if (!this.isKingMovingFromStartingPosition(pieceMovingFrom)) {
      return [];
    }
    return this.kingsMovesForCastling(pieceMovingFrom).filter((squareTo) => this.isCastlingPossible(pieceMovingFrom, squareTo));
  }

  private isKingMovingFromStartingPosition(squareFrom: Square): boolean {
    const chosenPiece = this.board.onPositionPiece(squareFrom);
    const startingPosition = {
      WHITE: { column: 'E', row: 1 } as Square,
      BLACK: { column: 'E', row: 8 } as Square,
    };
    return chosenPiece instanceof King && this.isSameSquare(squareFrom, startingPosition[chosenPiece.side]);
  }

  private kingsMovesForCastling(kingPosition: Square): Square[] {
    return [
      { column: 'C', row: kingPosition.row },
      { column: 'G', row: kingPosition.row },
    ];
  }

  private isSameSquare(squareA: Square, squareB: Square) {
    return squareA.column === squareB.column && squareA.row === squareB.row;
  }

  private isCastlingPossible(kingSquareFrom: Square, kingSquareTo: Square): boolean {
    let squareCrossedByKing!: Square;
    let rookPosition!: Square;
    let moveDirection!: number;
    switch (kingSquareTo.column) {
      case 'C':
        squareCrossedByKing = { column: 'D', row: kingSquareTo.row };
        rookPosition = { column: 'A', row: kingSquareTo.row };
        moveDirection = -1;
        break;
      case 'G':
        squareCrossedByKing = { column: 'F', row: kingSquareTo.row };
        rookPosition = { column: 'H', row: kingSquareTo.row };
        moveDirection = 1;
        break;
    }
    return !(
      this.isKingChecked(this.board, this.currentSide) ||
      this.isSquareChecked(this.board, this.currentSide, squareCrossedByKing) ||
      this.willBeKingChecked(kingSquareFrom, kingSquareTo) ||
      this.isAnyPieceBetweenKingAndRook(kingSquareFrom, rookPosition, moveDirection) ||
      this.pieceWasAlreadyMoved(kingSquareFrom) ||
      this.pieceWasAlreadyMoved(rookPosition)
    );
  }

  private isAnyPieceBetweenKingAndRook(actualPosition: Square, rookPosition: Square, moveDirection: number): boolean {
    const nextSquare: Square = {
      column: columns[columns.indexOf(actualPosition.column) + moveDirection],
      row: actualPosition.row,
    };
    if (nextSquare.column === rookPosition.column) {
      return false;
    }
    const isSquareOccupied = this.board.onPositionPiece(nextSquare);
    return isSquareOccupied ? true : this.isAnyPieceBetweenKingAndRook(nextSquare, rookPosition, moveDirection);
  }

  private pieceWasAlreadyMoved(squareWithPiece: Square) {
    const piece = this.board.onPositionPiece(squareWithPiece);
    return this.moveHistory?.some((move) => move.piece === piece && this.isSameSquare(move.from, squareWithPiece));
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

  private pieceWasCapturedInPassing(lastMove: PieceWasMoved): PieceWasCaptured | undefined {
    return lastMove
      ? {
          eventType: 'PieceWasCaptured',
          piece: lastMove.piece,
          onSquare: lastMove.to,
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
    this.moveHistory.push(event);
    if (!this.promotingOnSquare) {
      this.currentSide = this.anotherSide(event.piece.side);
    }
  }

  private onPawnPromotionWasEnabled(event: PawnPromotionWasEnabled | undefined): void {
    if (event) {
      this.promotingOnSquare = event.onSquare;
    }
  }

  private castlingWasDone(squareFrom: Square, squareTo: Square): PieceWasMoved | undefined {
    if (!this.intendToCastling(squareFrom, squareTo)) {
      return undefined;
    }
    const rookMove = {
      ['C' as Column]: {
        rookSquareFrom: { column: 'A', row: squareTo.row } as Square,
        rookSquareTo: { column: 'D', row: squareTo.row } as Square,
      },
      ['G' as Column]: {
        rookSquareFrom: { column: 'H', row: squareTo.row } as Square,
        rookSquareTo: { column: 'F', row: squareTo.row } as Square,
      },
    };
    this.board.movePiece(rookMove[squareTo.column].rookSquareFrom, rookMove[squareTo.column].rookSquareTo);
    return {
      eventType: 'PieceWasMoved',
      piece: new Rook(this.currentSide),
      from: rookMove[squareTo.column].rookSquareFrom,
      to: rookMove[squareTo.column].rookSquareTo,
    };
  }

  private intendToCastling(squareFrom: Square, squareTo: Square): boolean {
    if (!this.isKingMovingFromStartingPosition(squareFrom)) {
      return false;
    }
    const castling = {
      WHITE: {
        longTo: { column: 'C', row: 1 } as Square,
        shortTo: { column: 'G', row: 1 } as Square,
      },
      BLACK: {
        longTo: { column: 'C', row: 8 } as Square,
        shortTo: { column: 'G', row: 8 } as Square,
      },
    };

    return (
      this.isSameSquare(squareTo, castling[this.currentSide].longTo) || this.isSameSquare(squareTo, castling[this.currentSide].shortTo)
    );
  }

  private canMoveOnSquare(squareFrom: Square, squareTo: Square): boolean {
    const piecePossibleMoves = this.possibleMoves(squareFrom);
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

  private isKingChecked(chessboard: Chessboard = this.board, kingSide: Side = this.currentSide): boolean {
    const kingPosition = this.kingPosition(chessboard, kingSide);
    return kingPosition ? this.isSquareChecked(chessboard, kingSide, kingPosition) : false;
  }

  private willBeKingChecked(squareFrom: Square, squareTo: Square): boolean {
    const simulatedChessboard = this.simulatedChessboardAfterMove(squareFrom, squareTo);
    return this.isKingChecked(simulatedChessboard, this.currentSide);
  }

  private pieceMovesNotCausingAllyKingCheck(squareFrom: Square, possibleMoves: Square[]): Square[] {
    return possibleMoves.filter((possibleSquare: Square) => !this.willBeKingChecked(squareFrom, possibleSquare));
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

  private onPawnCaptureInPassing(lastMove: PieceWasMoved): void {
    this.board.removePiece(lastMove.to);
  }

  private lastMoveWasFirstPawnMove(lastMove: PieceWasMoved): boolean {
    if (lastMove.piece.side === Side.WHITE) {
      return lastMove.from.row === 2 && lastMove.to.row === 4;
    } else if (lastMove.piece.side === Side.BLACK) {
      return lastMove.from.row === 7 && lastMove.to.row === 5;
    } else {
      return false;
    }
  }

  private canAttackInPassing(squareFrom: Square, lastMove: PieceWasMoved): boolean {
    return this.lastMoveWasFirstPawnMove(lastMove) && this.isAdjacentColumn(squareFrom, lastMove.from);
  }

  private isAdjacentColumn(firstSquare: Square, secondSquare: Square): boolean {
    return Math.abs(columns.indexOf(firstSquare.column) - columns.indexOf(secondSquare.column)) === 1;
  }

  private squareUp(startSquare: Square): Square {
    return {
      column: columns[columns.indexOf(startSquare.column)],
      row: (startSquare.row + 1) as Row,
    };
  }

  private squareDown(startSquare: Square): Square {
    return {
      column: columns[columns.indexOf(startSquare.column)],
      row: (startSquare.row - 1) as Row,
    };
  }

  private checkmateHasOccurred(): CheckmateHasOccurred | undefined {
    if (!this.isKingChecked()) return undefined;
    if (this.isAnyPossibleMoves()) return undefined;

    const kingPosition = this.kingPosition(this.board, this.currentSide);
    if (!kingPosition) return undefined;

    return {
      eventType: 'CheckmateHasOccurred',
      king: new King(this.currentSide),
      onSquare: kingPosition,
    };
  }

  private stalemateHasOccurred(): StalemateHasOccurred | undefined {
    if (this.isKingChecked()) return undefined;
    if (this.isAnyPossibleMoves()) return undefined;

    return {
      eventType: 'StalemateHasOccurred',
    };
  }

  private isAnyPossibleMoves() {
    const squaresWithPieces = this.board.squaresWithPiece;
    return Object.keys(squaresWithPieces)
      .map((squareKey) => ({
        position: { column: squareKey[0], row: Number(squareKey[1]) as Row },
        piece: squaresWithPieces[squareKey],
      }))
      .filter(({ piece }) => piece.side == this.currentSide)
      .some(({ position }) => this.possibleMoves(position).length);
  }
}

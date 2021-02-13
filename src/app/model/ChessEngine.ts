import { ChessModel } from './ChessModel';
import { Row, Side, Square, SquareWithPiece } from './Types';
import { King, Piece } from './pieces';
import { Player } from './Player';
import { Chessboard } from './Chessboard';
import { PieceWasMoved } from './PieceWasMoved';
import { PieceWasCaptured } from './PieceWasCaptured';
import { isDefined } from './HelperFunctions';

export class ChessEngine implements ChessModel {
  private currentSide: Side = Side.WHITE;
  readonly squaresWithPiece: SquareWithPiece;

  constructor(private readonly board: Chessboard) {
    this.squaresWithPiece = board.squaresWithPiece;
  }

  move(byPlayer: Player, squareFrom: Square, squareTo: Square): (PieceWasMoved | PieceWasCaptured)[] {
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

  private simulatedChessboardAfterMove(chessboard: Chessboard, squareFrom: Square, squareTo: Square): Chessboard {
    const simulatedChessboard = new Chessboard({ ...chessboard.squaresWithPiece });
    const { squaresWithPiece: proposedSquaresWithPieces } = simulatedChessboard;
    simulatedChessboard.movePiece(squareFrom, squareTo);
    return simulatedChessboard;
  }

  public static kingPosition(chessboard: Chessboard, kingSide: Side): Square | undefined {
    const { squaresWithPiece: squaresWithPieces } = chessboard;
    const kingPositionKey = Object.keys(squaresWithPieces).find((key) => {
      const isKingName = squaresWithPieces[key].name === 'King';
      const isPlayerSide = squaresWithPieces[key].side === kingSide;
      return isKingName && isPlayerSide;
    });
    const kingPosition = kingPositionKey ? { column: kingPositionKey[0], row: Number(kingPositionKey[1]) as Row } : undefined;
    return kingPosition;
  }

  public static isSquareChecked(chessboard: Chessboard, playerSide: Side, positionToControl: Square): boolean {
    let isCheckedSquareFlag = false;
    const { squaresWithPiece: squaresWithPieces } = chessboard;

    Object.keys(squaresWithPieces).forEach((key) => {
      const mappedPiece = squaresWithPieces[key];
      const isEnemySide = mappedPiece.side !== playerSide;

      if (isEnemySide) {
        const mappedPiecePosition = {
          column: key[0],
          row: Number(key[1]) as Row,
        };
        const possibleMappedPieceMoves = mappedPiece.possibleMoves(mappedPiecePosition, chessboard);
        const isKingPositionOnPossibleEnemyPieceMoves = possibleMappedPieceMoves.some(
          (checkedPosition) => JSON.stringify(checkedPosition) == JSON.stringify(positionToControl),
        );
        if (isKingPositionOnPossibleEnemyPieceMoves) isCheckedSquareFlag = true;
      }
    });
    return isCheckedSquareFlag;
  }

  public static isKingChecked(chessboard: Chessboard, kingSide: Side): boolean {
    const kingPosition = this.kingPosition(chessboard, kingSide);
    const isKingChecked = kingPosition ? this.isSquareChecked(chessboard, kingSide, kingPosition) : false;
    return isKingChecked;
  }

  willBeKingChecked(squareFrom: Square, squareTo: Square): boolean {
    const chessboard: Chessboard = this.board;
    const wirtualPorposedChessboard = this.simulatedChessboardAfterMove(chessboard, squareFrom, squareTo);
    return ChessEngine.isKingChecked(wirtualPorposedChessboard, this.currentSide);
  }

  returnPlayerMovesWithoutThoseThatCauseHisKingToCheck(position: Square): Square[] {
    const initialPossibleMoves = this.board.onPositionPiece(position)?.possibleMoves(position, this.board) ?? [];
    const filteringFunction = (onePossibleMove: Square) => !this.willBeKingChecked(position, onePossibleMove);
    return initialPossibleMoves.filter(filteringFunction);
  }

  possibleMoves(position: Square): Square[] {
    return this.returnPlayerMovesWithoutThoseThatCauseHisKingToCheck(position);
  }
}

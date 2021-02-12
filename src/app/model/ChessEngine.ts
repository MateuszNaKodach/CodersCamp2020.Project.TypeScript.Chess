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
    if (this.willBeKingChecked(byPlayer, this.board, squareFrom, squareTo)) {
      throw new Error(`The player cannot move piece which causes check of his king.`);
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

  private willBeKingChecked(player: Player, chessboard: Chessboard, squareFrom: Square, squareTo: Square): boolean {
    let isCheckedSquare = false;

    const proposedSquaresWithPiece: SquareWithPiece = { ...this.board.squaresWithPiece };

    const movedPiece = chessboard.onPositionPiece(squareFrom);

    if (movedPiece) {
      delete proposedSquaresWithPiece[`${squareFrom.column}${squareFrom.row}`];
      proposedSquaresWithPiece[`${squareTo.column}${squareTo.row}`] = movedPiece;
    }

    const allyKingPositionKey =
      player.side === Side.WHITE
        ? Object.keys(proposedSquaresWithPiece).find(
            (key) => proposedSquaresWithPiece[key].name === 'King' && proposedSquaresWithPiece[key].side === player.side,
          )
        : Object.keys(proposedSquaresWithPiece).find(
            (key) => proposedSquaresWithPiece[key].name === 'King' && proposedSquaresWithPiece[key].side !== player.side,
          );

    if (!allyKingPositionKey) {
      return (isCheckedSquare = false);
    }

    const kingPosition = {
      column: allyKingPositionKey[0],
      row: Number(allyKingPositionKey[1]) as Row,
    };

    Object.keys(proposedSquaresWithPiece).map((key, index) => {
      if (proposedSquaresWithPiece[key].side !== player.side) {
        // TODO: check possible squares where pieces of oponent can move to
        // TODO: if it will be king's square on the above squares (where pieces of oponent can move to), function should return true

        const enemyPiecePosition = {
          column: key[0],
          row: Number(key[1]) as Row,
        };

        const possiblePieceMoves = proposedSquaresWithPiece[key].possibleMoves(
          enemyPiecePosition,
          new Chessboard(proposedSquaresWithPiece),
        );

        const isKingPositionOnPossibleEnemyPieceMoves = possiblePieceMoves.some(
          (item) => JSON.stringify(item) == JSON.stringify(kingPosition),
        );

        if (isKingPositionOnPossibleEnemyPieceMoves) {
          isCheckedSquare = true;
        }
      }
    });

    // DONE: in other way return false

    return isCheckedSquare;
  }
}

import { ChessModel } from './ChessModel';
import { PieceMoves } from './PieceMoves';
import { PiecePositions } from './PiecesPositions';
import { PieceWasCaptured, PieceWasMoved, Square } from './Types';
import { Piece } from './Piece';
import { Player } from './Player';
import { ChessBoard } from './ChessBoard';

export class ChessEngine implements ChessModel, PieceMoves, PiecePositions {
  move(byPlayer: Player, squareFrom: Square, squareTo: Square, board: ChessBoard): (PieceWasMoved | PieceWasCaptured)[] {
    const moveEventsList: (PieceWasMoved | PieceWasCaptured)[] = [];
    const chosenPiece = board.onPositionPiece(squareFrom) as Piece;
    const possibleMoves = chosenPiece.possibleMoves(squareFrom, board);

    if (byPlayer.side === chosenPiece.side) {
      if (
        possibleMoves.find((square: Square) => {
          return square.column == squareTo.column && square.row == squareTo.row;
        })
      ) {
        if (board.onPositionPiece(squareTo)?.side !== chosenPiece?.side) {
          const oponentPiece = board.onPositionPiece(squareTo) as Piece;
          console.log(oponentPiece);
          board.movePiece(squareFrom, squareTo);
          moveEventsList.push({ eventType: 'PieceWasCaptured', piece: oponentPiece, onSquare: squareTo });
          return moveEventsList;
        }
        board.movePiece(squareFrom, squareTo);
        moveEventsList.push({ eventType: 'PieceWasMoved', piece: chosenPiece, from: squareFrom, to: squareTo });
        return moveEventsList;
      } else throw new Error('Piece can not move to given square.');
    } else throw new Error('Player can not move other players pieces.');
  }

  onPositionPiece(square: Square): Piece | undefined {
    return /*this.board[`${square.column}${square.row}`]*/ undefined;
  }

  movePiece(squareFrom: Square, squareTo: Square): void {}
}

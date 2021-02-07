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
    const isOccupied = board.onPositionPiece(squareTo);
    const isOponent = isOccupied && isOccupied?.side !== chosenPiece.side;

    if (byPlayer.side === chosenPiece.side) {
      if (
        possibleMoves.find((square: Square) => {
          return square.column == squareTo.column && square.row == squareTo.row;
        })
      ) {
        board.movePiece(squareFrom, squareTo);
        if (isOponent) moveEventsList.push({ eventType: 'PieceWasCaptured', piece: isOccupied as Piece, onSquare: squareTo });
        else moveEventsList.push({ eventType: 'PieceWasMoved', piece: chosenPiece, from: squareFrom, to: squareTo });

        return moveEventsList;
      } else throw new Error('Piece can not move to given square.');
    } else throw new Error('Player can not move other players pieces.');
  }

  onPositionPiece(square: Square): Piece | undefined {
    return /*this.board[`${square.column}${square.row}`]*/ undefined;
  }

  movePiece(squareFrom: Square, squareTo: Square): void {}
}

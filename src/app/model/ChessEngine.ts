import { ChessModel } from './ChessModel';
import { Square } from './Types';
import { Piece } from './Piece';
import { Player } from './Player';
import { ChessBoard } from './ChessBoard';
import { PieceWasMoved } from './PieceWasMoved';
import { PieceWasCaptured } from './PieceWasCaptured';

export class ChessEngine implements ChessModel {
  constructor(readonly board: ChessBoard) {}

  move(byPlayer: Player, squareFrom: Square, squareTo: Square): (PieceWasMoved | PieceWasCaptured)[] {
    const moveEventsList: (PieceWasMoved | PieceWasCaptured)[] = [];
    const chosenPiece = this.board.onPositionPiece(squareFrom) as Piece;
    const possibleMoves = chosenPiece.possibleMoves(squareFrom, this.board);
    const pieceOnSquare = this.board.onPositionPiece(squareTo);
    const isOponent = pieceOnSquare && pieceOnSquare.side !== chosenPiece.side;

    if (byPlayer.side !== chosenPiece.side) throw new Error('Player can not move other players pieces.');
    if (
      !possibleMoves.find((square: Square) => {
        return square.column == squareTo.column && square.row == squareTo.row;
      })
    )
      throw new Error('Piece can not move to given square.');

    this.board.movePiece(squareFrom, squareTo);
    moveEventsList.push({ eventType: 'PieceWasMoved', piece: chosenPiece, from: squareFrom, to: squareTo });
    if (isOponent && isPiece(pieceOnSquare))
      moveEventsList.push({
        eventType: 'PieceWasCaptured',
        piece: pieceOnSquare,
        onSquare: squareTo,
      });

    return moveEventsList;
  }
}

//Type Guard for Piece - wyczytałem, że można stworzyć taką funkcję 'pilnującą' albo możemy skorzystać z instanceof w warunku linia 30
const isPiece = (varToCheck: unknown): varToCheck is Piece => (varToCheck as Piece) !== undefined;

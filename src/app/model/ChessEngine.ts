import { ChessModel } from './ChessModel';
import { PieceMoves } from './PieceMoves';
import { PiecePositions } from './PiecesPositions';
import { Side, Square, SquareWithPiece } from './Types';
import { Piece } from './Piece';
import { Pawn } from './Pawn';
import { Player } from './Player';
import { ChessBoard } from './ChessBoard';

export class ChessEngine implements ChessModel, PieceMoves, PiecePositions {
  private board: SquareWithPiece = { A1: new Pawn(Side.BLACK) };

  move(by: Player, squareFrom: Square, squareTo: Square, board: ChessBoard): (PieceWasMoved | PieceWasCaptured)[] {
    const moveEventsList: (PieceWasMoved | PieceWasCaptured)[] = [];

    //TODO znaleźć bierkę stojącą na squareFrom
    const chosenPiece = board.onPositionPiece(squareFrom);
    console.log(chosenPiece);

    //TODO znaleźć available moves dla danej bierki
    const possibleMoves = chosenPiece?.getPossibleMoves(squareFrom, board);
    console.log(possibleMoves);

    //TODO sprawdź czy squareTo zawiera się w tablicy possibleMoves jeśli tak dodaj obiekt type PieceWasMoved do tablicy w innym wypadku throw Error
    if (
      possibleMoves?.find((square: Square) => {
        return square.column == squareTo.column && square.row == squareTo.row;
      })
    ) {
      console.log('Yassss');
      board.movePiece(squareFrom, squareTo);
      moveEventsList.push({ eventType: 'PieceWasMoved', piece: chosenPiece!, from: squareFrom, to: squareTo });
    } else throw new Error('Piece con not move to given square.');

    //TODO sprawdź czy 'by: Player' side równa się side wybranego pionka w innym wypadku throw Error
    if (by.side === chosenPiece?.side) {
      console.log('Equal sides');
    } else throw new Error('Player can not move other players pieces.');

    //TODO sprawdź czy na squareTo stoi przeciwnik, jeśli tak to dodaj obiekt typu PieceWasCaptured do tablicy
    if (board.onPositionPiece(squareTo)?.side !== chosenPiece?.side) {
      console.log('Watch out - oponent!');
    }

    //TODO złóż powyższe warunki w logiczny ciąg

    //TODO zwróć tablicę odpowiednich obiektów
    return moveEventsList;
  }

  onPositionPiece(square: Square): Piece | undefined {
    return /*this.board[`${square.column}${square.row}`]*/ undefined;
  }

  movePiece(squareFrom: Square, squareTo: Square): void {}
}

export type PieceWasMoved = {
  eventType: 'PieceWasMoved';
  piece: Piece;
  from: Square;
  to: Square;
};

export type PieceWasCaptured = {
  eventType: 'PieceWasCaptured';
  piece: Piece;
  onSquare: Square; // na jakiej pozycji stał bity pionek
};

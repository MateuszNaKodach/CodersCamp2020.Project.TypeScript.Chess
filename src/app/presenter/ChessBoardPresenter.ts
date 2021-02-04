import { ChessBoardView } from '../view/ChessBoardView';
import { Position } from './Position';
import { ChessModel } from '../model/ChessModel';

export class ChessBoardPresenter {
  constructor(private readonly view: ChessBoardView, private readonly chessModel: ChessModel) {
    view.onSquareSelected(this.selectedSquare);
  }

  selectedSquare(position: Position): void {
    //chessModel zwroci mozliwe ruchy dla bierki na wybranej pozycji
    //presenter kaze, zeby view wyswietlil mozliwe ruchy -> wywolujac np. view.showAvailableMoves(squares).
    console.log(position);
    this.view.showSelectedPiece(position);
  }

  startGame(): void {
    //wezmie z chessModel aktualny uklad
    this.view.showChessBoard();
  }
}

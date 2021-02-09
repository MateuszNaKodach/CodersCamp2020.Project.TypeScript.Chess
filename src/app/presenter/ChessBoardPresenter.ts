import { ChessBoardView } from '../view/ChessBoardView';
import { Position } from './Position';
import { ChessModel } from '../model/ChessModel';
import { SquareWasClicked } from '../view/events/SquareWasClicked';

export class ChessBoardPresenter {
  constructor(private readonly view: ChessBoardView, private readonly chessModel: ChessModel) {
    view.listenOn<SquareWasClicked>('SquareWasClicked', (event) => this.onSquareWasClicked(event.position));
  }

  onSquareWasClicked(position: Position): void {
    //chessModel zwroci mozliwe ruchy dla bierki na wybranej pozycji
    //presenter kaze, zeby view wyswietlil mozliwe ruchy -> wywolujac np. view.showAvailableMoves(squares).
    console.log(position);
    this.view.showSelectedPiece(position);
  }

  startGame(): void {
    this.view.showChessBoard(this.chessModel.piecesPositions);
  }
}

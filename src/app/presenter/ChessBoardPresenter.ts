import { ChessBoardView } from '../view/ChessBoardView';
import { Position } from './Position';
import { ChessModel } from '../model';
import { SquareWasClicked } from '../view/events/SquareWasClicked';

export class ChessBoardPresenter {
  constructor(private readonly view: ChessBoardView, private readonly chessModel: ChessModel) {
    view.listenOn<SquareWasClicked>('SquareWasClicked', (event) => this.onSquareWasClicked(event.position));
  }

  onSquareWasClicked(position: Position): void {
    //chessModel zwroci mozliwe ruchy dla bierki na wybranej pozycji
    //presenter kaze, zeby view wyswietlil mozliwe ruchy -> wywolujac np. view.showAvailableMoves(squares).
    this.view.hideSelection();
    this.view.showSelectedPiece(position);

    const squaresStringArray = this.getPossibleMoves(position);
    console.log('Square array of possible moves: ', squaresStringArray);

    this.view.hideAllAvailableMoves();
    this.view.showAvailableMoves(squaresStringArray);
    console.log('position: ', position);
  }

  startGame(): void {
    this.view.showChessBoard(this.chessModel.squaresWithPiece);
  }
}

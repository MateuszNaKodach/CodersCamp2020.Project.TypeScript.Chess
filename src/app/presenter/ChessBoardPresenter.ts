import { ChessBoardView } from '../view/ChessBoardView';
import { Position } from './Position';
import { ChessModel } from '../model/ChessModel';
import { SquareWasClicked } from '../view/events/SquareWasClicked';
import { PIECES_START_POSITION } from '../model/Constances';
import { columns, Row, Square } from '../model/Types';

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
    this.view.showChessBoard(PIECES_START_POSITION);
  }

  private getPossibleMoves(position: Position): string[] {
    const square: Square = { column: columns[position.x - 1], row: position.y as Row };
    const squares: Square[] = this.chessModel.possibleMoves(square);
    return squares.map((square) => {
      return `${square.column.toLowerCase()}${square.row}`;
    });
  }
}

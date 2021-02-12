import { ChessBoardView } from '../view/ChessBoardView';
import { Position } from './Position';
import { ChessModel } from '../model';
import { SquareWasClicked } from '../view/events/SquareWasClicked';
import { columns, Row, Square } from '../model';

export class ChessBoardPresenter {
  constructor(private readonly view: ChessBoardView, private readonly chessModel: ChessModel) {
    view.listenOn<SquareWasClicked>('SquareWasClicked', (event) => this.onSquareWasClicked(event.position));
  }

  onSquareWasClicked(position: Position): void {
    this.view.hideSelection();
    this.view.showSelectedPiece(this.translatePositionToAlgebraicNotation(position));

    this.view.hideAllAvailableMoves();
    const squaresStringArray = this.getPossibleMoves(position);
    this.view.showAvailableMoves(squaresStringArray);
  }

  startGame(): void {
    this.view.showChessBoard(this.chessModel.squaresWithPiece);
  }

  private getPossibleMoves(position: Position): string[] {
    const square: Square = { column: columns[position.x - 1], row: position.y as Row };
    return this.chessModel.possibleMoves(square)?.map((square) => `${square.column.toLowerCase()}${square.row}`) ?? [];
  }

  private translatePositionToAlgebraicNotation(position: Position): string {
    const square: Square = { column: columns[position.x - 1], row: position.y as Row };
    return `${square.column.toLowerCase()}${square.row}`;
  }
}

import { Chessboard } from './Chessboard';
import { ChessBoardView } from '../ChessBoardView';
import { ViewEventBus } from '../events/ViewEventBus';
import { ViewEvent } from '../events/ViewEvent';
import { SquareWasClicked } from '../events/SquareWasClicked';
import { SquareWithPiece } from '../../model/Types';

export class WebChessView implements ChessBoardView {
  constructor(private readonly viewEventBus: ViewEventBus, private readonly parent: HTMLElement = document.body) {}

  showChessBoard(piecesPositions: SquareWithPiece): void {
    const chessboard: Chessboard = new Chessboard('chessBoardId', 'chessboard', (position) =>
      this.viewEventBus.publish(new SquareWasClicked(position)),
    );
    this.parent.appendChild(chessboard.createBoard());

    this.renderPiecesOnBoard(piecesPositions);
  }

  listenOn<EventType extends ViewEvent = ViewEvent>(eventType: EventType['eventType'], reaction: (event: EventType) => void): void {
    this.viewEventBus.listenOn(eventType, reaction);
  }

  showSelectedPiece(position: { x: number; y: number }): void {}

  private renderPiecesOnBoard(piecesPositions: SquareWithPiece) {
    let piecesSquareId: string;
    let pieceImage: string;
    let pieceName: string;
    let pieceSide: string;

    for (const elem in piecesPositions) {
      pieceName = Object.getPrototypeOf(piecesPositions[elem]).constructor.name.toLowerCase();
      pieceSide = piecesPositions[elem].side.toLowerCase();

      piecesSquareId = `#${elem.toLowerCase()}`;
      pieceImage = `../static/img/pieces/${pieceSide}-${pieceName}.svg`;

      this.parent.querySelector(piecesSquareId)?.appendChild(this.createPieceDiv(pieceImage));
    }
  }

  private createPieceDiv(pieceImage: string): HTMLElement {
    const newPieceElement = document.createElement('img');
    newPieceElement.classList.add('piece');
    newPieceElement.src = pieceImage;
    return newPieceElement;
  }
}

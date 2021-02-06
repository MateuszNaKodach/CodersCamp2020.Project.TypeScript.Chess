import { Chessboard } from './Chessboard';
import { ChessBoardView } from '../ChessBoardView';
import { ViewEventBus } from '../events/ViewEventBus';
import { ViewEvent } from '../events/ViewEvent';
import { SquareWasClicked } from '../events/SquareWasClicked';

export class WebChessView implements ChessBoardView {
  constructor(private readonly viewEventBus: ViewEventBus, private readonly parent: HTMLElement = document.body) {}

  showChessBoard(): void {
    const chessboard: Chessboard = new Chessboard('chessBoardId', 'chessboard', (position) =>
      this.viewEventBus.publish(new SquareWasClicked(position)),
    );
    this.parent.appendChild(chessboard.createBoard());
  }

  listenOn<EventType extends ViewEvent = ViewEvent>(eventType: EventType['eventType'], reaction: (event: EventType) => void): void {
    this.viewEventBus.listenOn(eventType, reaction);
  }

  showSelectedPiece(position: { x: number; y: number }): void {}
}

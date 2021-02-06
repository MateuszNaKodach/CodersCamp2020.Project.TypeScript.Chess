import { ChessBoardView } from '../ChessBoardView';
import { ViewEvent } from '../events/ViewEvent';

export class ConsoleChessBoardView implements ChessBoardView {
  listenOn<EventType extends ViewEvent>(eventType: EventType['eventType'], reaction: (event: EventType) => void): void {}

  showChessBoard(): void {
    console.log('Tutaj bysmy wyswietlili szachownice na konsoli');
  }

  showSelectedPiece(position: { x: number; y: number }): void {}
}

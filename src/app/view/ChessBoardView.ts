import { ViewEventSource } from './events/ViewEventBus';

export interface ChessBoardView extends ViewEventSource {
  showChessBoard(/*parametry*/): void;

  //TODO: Do zmiany, brakuje jaka bierke pokazac
  showSelectedPiece(position: { x: number; y: number }): void;
}

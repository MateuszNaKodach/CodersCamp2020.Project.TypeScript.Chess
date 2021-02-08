import { ViewEventSource } from './events/ViewEventBus';
import { SquareWithPiece } from '../model/Types';

export interface ChessBoardView extends ViewEventSource {
  showChessBoard(piecesPositions: SquareWithPiece): void;

  //TODO: Do zmiany, brakuje jaka bierke pokazac
  showSelectedPiece(position: { x: number; y: number }): void;
}

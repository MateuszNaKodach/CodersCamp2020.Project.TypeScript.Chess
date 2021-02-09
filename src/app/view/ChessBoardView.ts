import { ViewEventSource } from './events/ViewEventBus';
import { PiecesBoardPositions } from '../model/Types';

export interface ChessBoardView extends ViewEventSource {
  showChessBoard(piecesPositions: PiecesBoardPositions): void;

  //TODO: Do zmiany, brakuje jaka bierke pokazac
  showSelectedPiece(position: { x: number; y: number }): void;
}

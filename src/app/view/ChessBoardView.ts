import { ViewEventSource } from './events/ViewEventBus';
import { PiecesBoardPositions } from './Types';

export interface ChessBoardView extends ViewEventSource {
  showChessBoard(piecesPositions: PiecesBoardPositions): void;

  showAvailableMoves(squaresToHighlight: string[]): void;

  hideAllAvailableMoves(): void;

  //TODO: Do zmiany, brakuje jaka bierke pokazac
  showSelectedPiece(position: { x: number; y: number }): void;

  hideSelection(): void;
}

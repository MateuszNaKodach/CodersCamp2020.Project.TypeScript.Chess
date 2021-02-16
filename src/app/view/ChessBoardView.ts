import { ViewEventSource } from './events/ViewEventBus';
import { PiecesBoardPositions } from './Types';

export interface ChessBoardView extends ViewEventSource {
  showChessBoard(piecesPositions: PiecesBoardPositions): void;

  showAvailableMoves(squaresToHighlight: string[]): void;

  hideAllAvailableMoves(): void;

  //TODO: Do zmiany, brakuje jaka bierke pokazac
  showSelectedPiece(id: string): void;

  hideSelection(): void;

  movePiece(squareFrom: string, squareTo: string): void;
  capturePiece(onSquare: string): void;

  showEndGameWindow(side?: string, position?: string): void;
}

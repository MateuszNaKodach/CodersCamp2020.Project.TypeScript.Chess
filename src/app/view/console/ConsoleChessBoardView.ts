import { ChessBoardView } from '../ChessBoardView';

export class ConsoleChessBoardView implements ChessBoardView {
  showSelectedPiece(position: { x: number; y: number }): void {}

  onSquareSelected(callback: (position: { x: number; y: number }) => void): void {}

  showChessBoard(): void {
    console.log('Tutaj bysmy wyswietlili szachownice na konsoli');
  }
}

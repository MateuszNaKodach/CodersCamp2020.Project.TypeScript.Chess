import { Chessboard } from './Chessboard';
import { ChessBoardView } from '../ChessBoardView';

type OnSquareSelectedFn = (position: { x: number; y: number }) => void;

export class WebChessView implements ChessBoardView {
  private readonly onSquareSelectedListeners: OnSquareSelectedFn[] = [];

  constructor(private readonly parent: HTMLElement = document.body) {}

  showChessBoard(): void {
    const chessboard: Chessboard = new Chessboard('chessBordId', 'chessboard', (position) => {
      this.onSquareSelectedListeners.forEach((listener) => listener(position));
    });
    this.parent.appendChild(chessboard.createBoard());
  }

  onSquareSelected(listener: OnSquareSelectedFn): void {
    this.onSquareSelectedListeners.push(listener);
  }

  showSelectedPiece(position: { x: number; y: number }): void {}
}

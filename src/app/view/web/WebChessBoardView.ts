import { Chessboard } from './Chessboard';
import { ChessBoardView } from '../ChessBoardView';

type OnSquareSelectedFn = (position: { x: number; y: number }) => void;

export class WebChessBoardView implements ChessBoardView {
  private readonly onSquareSelectedListeners: OnSquareSelectedFn[] = [];

  constructor() {}

  showChessBoard(): void {
    const chessboard: Chessboard = new Chessboard('chessBordId', 'chessboard', (position) => {
      this.onSquareSelectedListeners.forEach((listener) => listener(position));
    });
    document.body.appendChild(chessboard.createBoard());
  }

  onSquareSelected(listener: OnSquareSelectedFn): void {
    this.onSquareSelectedListeners.push(listener);
  }

  showSelectedPiece(position: { x: number; y: number }): void {}
}

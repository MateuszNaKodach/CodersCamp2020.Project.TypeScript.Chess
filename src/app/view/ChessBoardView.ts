export interface ChessBoardView {
  showChessBoard(/*parametry*/): void;

  onSquareSelected(callback: (position: { x: number; y: number }) => void): void;

  showSelectedPiece(position: { x: number; y: number }): void;
}

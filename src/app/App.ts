import { Chessboard } from './view/ChessBoardView';
import { pieceRendering } from './view/PieceRender';

export const App = (): void => {
  const chessboard: Chessboard = new Chessboard();
  document.body.appendChild(chessboard.createBoard());

  pieceRendering();
};

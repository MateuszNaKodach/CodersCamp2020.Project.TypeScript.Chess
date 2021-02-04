import { Chessboard } from './view/ChessBoardView';

export const App = (): void => {
  const chessboard: Chessboard = new Chessboard();
  document.body.appendChild(chessboard.createBoard());
};

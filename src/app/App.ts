import { Chessboard } from './view/ChessBoardView';

export const App = () => {
  const chessboard: Chessboard = new Chessboard();
  const boardObj: HTMLElement = chessboard.createBoard();
  document.body.appendChild(boardObj);
};

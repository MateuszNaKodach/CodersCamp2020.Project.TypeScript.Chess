import { ChessBoardPresenter } from './presenter/ChessBoardPresenter';
import { ChessBoardView } from './view/ChessBoardView';
import { WebChessView } from './view/web/WebChessView';
import { ChessEngine } from './model/ChessEngine';
import { ChessModel } from './model/ChessModel';

export const App = (): void => {
  const chessBoardView: ChessBoardView = new WebChessView();
  const chessModel: ChessModel = new ChessEngine();
  const presenter = new ChessBoardPresenter(chessBoardView, chessModel);
  presenter.startGame();
};

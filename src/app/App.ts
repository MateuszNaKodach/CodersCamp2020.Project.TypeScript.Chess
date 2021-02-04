import { ChessBoardPresenter } from './presenter/ChessBoardPresenter';
import { ChessBoardView } from './view/ChessBoardView';
import { WebChessBoardView } from './view/web/WebChessBoardView';
import { ChessEngine } from './model/ChessEngine';
import { ChessModel } from './model/ChessModel';

export const App = (): void => {
  const chessBoardView: ChessBoardView = new WebChessBoardView();
  const chessModel: ChessModel = new ChessEngine();
  const presenter = new ChessBoardPresenter(chessBoardView, chessModel);
  presenter.startGame();
};

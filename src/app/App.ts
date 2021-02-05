import { ChessBoardPresenter } from './presenter/ChessBoardPresenter';
import { ChessBoardView } from './view/ChessBoardView';
import { WebChessView } from './view/web/WebChessView';
import { ChessEngine } from './model/ChessEngine';
import { ChessModel } from './model/ChessModel';
import { InMemoryViewEventBus } from './view/events/ViewEventBus';

export const App = (): void => {
  const viewEventBus = new InMemoryViewEventBus();
  const chessBoardView: ChessBoardView = new WebChessView(viewEventBus);
  const chessModel: ChessModel = new ChessEngine();
  const presenter = new ChessBoardPresenter(chessBoardView, chessModel);
  presenter.startGame();
};

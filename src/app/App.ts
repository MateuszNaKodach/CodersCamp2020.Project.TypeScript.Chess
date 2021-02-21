import { ChessBoardPresenter } from './presenter/ChessBoardPresenter';
import { ChessBoardView } from './view/ChessBoardView';
import { WebChessView } from './view/web/WebChessView';
import { Chessboard, ChessEngine, ChessModel } from './model';
import { InMemoryViewEventBus } from './view/events/InMemoryViewEventBus';

export const App = (): void => {
  const viewEventBus = new InMemoryViewEventBus();
  const chessBoardView: ChessBoardView = new WebChessView(viewEventBus);
  const chessBoard: Chessboard = new Chessboard();
  const chessModel: ChessModel = new ChessEngine(chessBoard);
  const presenter = new ChessBoardPresenter(chessBoardView, chessModel);
  presenter.startGame();
};

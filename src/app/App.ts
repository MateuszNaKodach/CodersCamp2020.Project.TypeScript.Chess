import { ChessBoardPresenter } from './presenter/ChessBoardPresenter';
import { ChessBoardView } from './view/ChessBoardView';
import { WebChessView } from './view/web/WebChessView';
import { ChessEngine } from './model/ChessEngine';
import { ChessModel } from './model/ChessModel';
import { InMemoryViewEventBus } from './view/events/InMemoryViewEventBus';
import { Chessboard } from './model/Chessboard';
import { Side, SquareWithPiece } from './model/Types';
import { Pawn } from './model/Pawn';

export const App = (): void => {
  const viewEventBus = new InMemoryViewEventBus();
  const chessBoardView: ChessBoardView = new WebChessView(viewEventBus);
  const boardWithPieces: SquareWithPiece = { F7: new Pawn(Side.BLACK), E7: new Pawn(Side.BLACK) }; // test na żywym organizmie, do usunięcia F7 i E7
  const chessBoard: Chessboard = new Chessboard(boardWithPieces);
  const chessModel: ChessModel = new ChessEngine(chessBoard);
  const presenter = new ChessBoardPresenter(chessBoardView, chessModel);
  presenter.startGame();
};

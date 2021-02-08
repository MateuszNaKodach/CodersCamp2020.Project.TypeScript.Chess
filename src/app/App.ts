import { ChessBoardPresenter } from './presenter/ChessBoardPresenter';
import { ChessBoardView } from './view/ChessBoardView';
import { WebChessView } from './view/web/WebChessView';
import { ChessEngine } from './model/ChessEngine';
import { ChessModel } from './model/ChessModel';
import { ChessBoard } from './model/ChessBoard';
import { SquareWithPiece } from './model/Types';

export const App = (): void => {
  const chessBoardView: ChessBoardView = new WebChessView();
  const boardWithPieces: SquareWithPiece = {};
  const chessBoard: ChessBoard = new ChessBoard(boardWithPieces);
  const chessModel: ChessModel = new ChessEngine(chessBoard);
  const presenter = new ChessBoardPresenter(chessBoardView, chessModel);
  presenter.startGame();
};

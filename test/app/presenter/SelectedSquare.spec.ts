import '@testing-library/jest-dom';
import { ChessBoardView } from '../../../src/app/view/ChessBoardView';
import { ChessModel } from '../../../src/app/model/ChessModel';
import { ChessBoardPresenter } from '../../../src/app/presenter/ChessBoardPresenter';

describe('SelectedSquare', () => {
  const view: ChessBoardView = {
    onSquareSelected: jest.fn(),
    showChessBoard: jest.fn(),
    showSelectedPiece: jest.fn(),
  };

  const model: ChessModel = {};
  const presenter: ChessBoardPresenter = new ChessBoardPresenter(view, model);

  it('when square is selected then selected piece should be shown', () => {
    presenter.selectedSquare({ x: 1, y: 1 });

    expect(view.showSelectedPiece).toHaveBeenCalledWith({ x: 1, y: 1 });
  });
});

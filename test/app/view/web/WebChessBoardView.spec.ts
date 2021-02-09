import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';
import { ChessBoardView } from '../../../../src/app/view/ChessBoardView';
import { WebChessView } from '../../../../src/app/view/web/WebChessView';
import { ViewEventBus } from '../../../../src/app/view/events/ViewEventBus';
import { SquareWasClicked } from '../../../../src/app/view/events/SquareWasClicked';
import { PiecesBoardPositions } from '../../../../src/app/model/Types';

describe('Web Chess Board View', () => {
  const publishViewEventMock = jest.fn();
  const viewEventBus: ViewEventBus = {
    listenOn: jest.fn(),
    publish: publishViewEventMock,
  };
  const piecesPositions: PiecesBoardPositions = {};
  const chessBoardView: ChessBoardView = new WebChessView(viewEventBus);
  chessBoardView.showChessBoard(piecesPositions);

  it('Chessboard should have 64 squares', () => {
    const board = document.getElementById('chessBoardId');
    expect(board).not.toBeNull();
    const squareList = board?.getElementsByTagName('div');

    expect(squareList?.length).toBe(64);
  });

  it('Square d1 should be light', async () => {
    const d1Square = await screen.findByTestId('d1');

    expect(d1Square).toHaveClass('square--light');
  });

  it('Square f8 should be dark', async () => {
    const f8Square = await screen.findByTestId('f8');

    expect(f8Square).toHaveClass('square--dark');
  });

  it('when click on square, then square was clicked', async () => {
    const square = await screen.findByTestId('a2');
    userEvent.click(square);

    expect(publishViewEventMock).toBeCalledWith(new SquareWasClicked({ x: 1, y: 2 }));
  });
});

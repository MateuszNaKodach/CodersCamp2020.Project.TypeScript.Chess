import '@testing-library/jest-dom';
import { ChessBoardView } from '../../../src/app/view/ChessBoardView';
import { ChessModel } from '../../../src/app/model';
import { ChessBoardPresenter } from '../../../src/app/presenter/ChessBoardPresenter';
import { ViewEventBus } from '../../../src/app/view/events/ViewEventBus';
import { ViewEvent } from '../../../src/app/view/events/ViewEvent';
import { SquareWasClicked } from '../../../src/app/view/events/SquareWasClicked';
import { InMemoryViewEventBus } from '../../../src/app/view/events/InMemoryViewEventBus';
import { PIECES_START_POSITION } from '../../../src/app/model';

describe('ChessBoardPresenter', () => {
  const viewEvents: ViewEventBus = new InMemoryViewEventBus();
  const view: ChessBoardView = chessBoardViewMock(viewEvents);
  const model: ChessModel = { squaresWithPiece: PIECES_START_POSITION, move: jest.fn(), possibleMoves: jest.fn() };
  const presenter: ChessBoardPresenter = new ChessBoardPresenter(view, model);

  it('when square A1 was clicked on the view, then selected piece should be shown with its possible moves', () => {
    viewEvents.publish(new SquareWasClicked({ x: 1, y: 1 }));

    expect(view.showSelectedPiece).toHaveBeenCalledWith('a1');
    expect(view.hideSelection).toHaveBeenCalled();
    expect(view.hideAllAvailableMoves).toHaveBeenCalled();
    expect(view.showAvailableMoves).toHaveBeenCalledWith([]);
  });

  it('when square was A2 clicked on the view, then selected piece should be shown with its possible moves', () => {
    viewEvents.publish(new SquareWasClicked({ x: 1, y: 2 }));

    expect(view.showSelectedPiece).toHaveBeenCalledWith('a2');
    expect(view.hideSelection).toHaveBeenCalled();
    expect(view.hideAllAvailableMoves).toHaveBeenCalled();
    expect(view.showAvailableMoves).toHaveBeenCalledWith(['a3', 'a4']);
  });

  it('when game starts, check if pieces will show on the screen', () => {
    presenter.startGame();

    expect(view.showChessBoard).toHaveBeenCalledWith(PIECES_START_POSITION);
  });
});

function chessBoardViewMock(viewEventBus: ViewEventBus): ChessBoardView {
  return {
    listenOn<EventType extends ViewEvent>(eventType: EventType['eventType'], reaction: (event: EventType) => void): void {
      return viewEventBus.listenOn<EventType>(eventType, reaction);
    },
    showChessBoard: jest.fn(),
    showSelectedPiece: jest.fn(),
    hideSelection: jest.fn(),
    showAvailableMoves: jest.fn(),
    hideAllAvailableMoves: jest.fn(),
  };
}

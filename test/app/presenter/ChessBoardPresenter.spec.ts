import '@testing-library/jest-dom';
import { ChessBoardView } from '../../../src/app/view/ChessBoardView';
import { ChessModel, Square } from '../../../src/app/model';
import { ChessBoardPresenter } from '../../../src/app/presenter/ChessBoardPresenter';
import { ViewEventBus } from '../../../src/app/view/events/ViewEventBus';
import { ViewEvent } from '../../../src/app/view/events/ViewEvent';
import { SquareWasClicked } from '../../../src/app/view/events/SquareWasClicked';
import { InMemoryViewEventBus } from '../../../src/app/view/events/InMemoryViewEventBus';
import { PIECES_START_POSITION } from '../../../src/app/model/constances/PiecesStartPosition';

describe('ChessBoardPresenter', () => {
  it('when square A1 was clicked on the view, then selected piece should be shown with its possible moves', () => {
    const chessboardState = chessboardStateMock([]);

    chessboardState.viewEvents.publish(new SquareWasClicked({ x: 1, y: 1 }));

    expect(chessboardState.view.showSelectedPiece).toHaveBeenCalledWith('a1');
    expect(chessboardState.view.hideSelection).toHaveBeenCalled();
    expect(chessboardState.view.hideAllAvailableMoves).toHaveBeenCalled();
    expect(chessboardState.view.showAvailableMoves).toHaveBeenCalledWith([]);
  });

  it('when square A2 was clicked on the view, then selected piece should be shown with its possible moves', () => {
    const chessboardState = chessboardStateMock([
      { column: 'A', row: 3 },
      { column: 'A', row: 4 },
    ]);

    chessboardState.viewEvents.publish(new SquareWasClicked({ x: 1, y: 2 }));

    expect(chessboardState.view.showSelectedPiece).toHaveBeenCalledWith('a2');
    expect(chessboardState.view.hideSelection).toHaveBeenCalled();
    expect(chessboardState.view.hideAllAvailableMoves).toHaveBeenCalled();
    expect(chessboardState.view.showAvailableMoves).toHaveBeenCalledWith(['a3', 'a4']);
  });

  it('when game starts, check if pieces will show on the screen', () => {
    const viewEvents: ViewEventBus = new InMemoryViewEventBus();
    const view: ChessBoardView = chessBoardViewMock(viewEvents);
    const model: ChessModel = { squaresWithPiece: PIECES_START_POSITION, move: jest.fn(), possibleMoves: jest.fn() };
    const presenter: ChessBoardPresenter = new ChessBoardPresenter(view, model);
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

function chessboardStateMock(square: Square[]) {
  const viewEvents: ViewEventBus = new InMemoryViewEventBus();
  const view: ChessBoardView = chessBoardViewMock(viewEvents);
  const model: ChessModel = {
    squaresWithPiece: PIECES_START_POSITION,
    move: jest.fn(),
    possibleMoves(position: Square): Square[] {
      return square;
    },
  };

  new ChessBoardPresenter(view, model);

  return { view, viewEvents };
}

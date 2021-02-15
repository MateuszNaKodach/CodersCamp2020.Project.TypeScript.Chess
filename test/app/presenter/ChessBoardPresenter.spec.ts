import { SquareWithPiece } from './../model/BoardFixture';
import '@testing-library/jest-dom';
import { ChessBoardView } from '../../../src/app/view/ChessBoardView';
import { Bishop, ChessModel, King, Knight, Pawn, Queen, Rook, Side, Square } from '../../../src/app/model';
import { ChessBoardPresenter } from '../../../src/app/presenter/ChessBoardPresenter';
import { ViewEventBus } from '../../../src/app/view/events/ViewEventBus';
import { ViewEvent } from '../../../src/app/view/events/ViewEvent';
import { SquareWasClicked } from '../../../src/app/view/events/SquareWasClicked';
import { InMemoryViewEventBus } from '../../../src/app/view/events/InMemoryViewEventBus';
import { PIECES_START_POSITION } from '../../../src/app/model';

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

  it('when game starts and player clicked square A2 and A3, then call movePiece method on view', () => {
    const pawn: Pawn = new Pawn(Side.WHITE);
    const viewEvents: ViewEventBus = new InMemoryViewEventBus();
    const view: ChessBoardView = chessBoardViewMock(viewEvents);
    const model: ChessModel = {
      squaresWithPiece: PIECES_START_POSITION,
      move: (squareFrom, squareTo) => {
        return [{ eventType: 'PieceWasMoved', piece: pawn, from: squareFrom, to: squareTo }];
      },
      possibleMoves: () => [
        { column: 'A', row: 3 },
        { column: 'A', row: 4 },
      ],
    };
    const presenter: ChessBoardPresenter = new ChessBoardPresenter(view, model);

    viewEvents.publish(new SquareWasClicked({ x: 1, y: 2 }));
    viewEvents.publish(new SquareWasClicked({ x: 1, y: 3 }));

    expect(view.movePiece).toHaveBeenCalledWith('a2', 'a3');
  });

  it('white pawn on D4, black pawn on C5 and white player captures black pawn on C5, call movePiece and capturePiece on view ', () => {
    const whitePawn: Pawn = new Pawn(Side.WHITE);
    const blackPawn: Pawn = new Pawn(Side.BLACK);
    const viewEvents: ViewEventBus = new InMemoryViewEventBus();
    const view: ChessBoardView = chessBoardViewMock(viewEvents);
    const model: ChessModel = {
      squaresWithPiece: { D4: whitePawn, C5: blackPawn },
      move: (squareFrom, squareTo) => {
        return [
          { eventType: 'PieceWasMoved', piece: whitePawn, from: squareFrom, to: squareTo },
          { eventType: 'PieceWasCaptured', piece: blackPawn, onSquare: squareTo },
        ];
      },
      possibleMoves: () => [
        { column: 'D', row: 5 },
        { column: 'C', row: 5 },
      ],
    };
    const presenter: ChessBoardPresenter = new ChessBoardPresenter(view, model);

    viewEvents.publish(new SquareWasClicked({ x: 4, y: 4 }));
    viewEvents.publish(new SquareWasClicked({ x: 3, y: 5 }));

    expect(view.capturePiece).toHaveBeenCalledWith('c5');
    expect(view.movePiece).toHaveBeenCalledWith('d4', 'c5');
  });

  it('Pawn promotion', () => {
    const whitePawn: Pawn = new Pawn(Side.WHITE);
    const viewEvents: ViewEventBus = new InMemoryViewEventBus();
    const view: ChessBoardView = chessBoardViewMock(viewEvents);
    const model: ChessModel = {
      squaresWithPiece: { D7: whitePawn },
      move: (squareFrom, squareTo) => {
        return [
          { eventType: 'PieceWasMoved', piece: whitePawn, from: squareFrom, to: squareTo },
          { eventType: 'PawnPromotionWasEnabled', onSquare: squareTo, pawn: whitePawn },
        ];
      },
      possibleMoves: () => [{ column: 'D', row: 8 }],
    };
    const presenter: ChessBoardPresenter = new ChessBoardPresenter(view, model);

    viewEvents.publish(new SquareWasClicked({ x: 4, y: 7 }));
    viewEvents.publish(new SquareWasClicked({ x: 4, y: 8 }));

    expect(view.movePiece).toHaveBeenCalledWith('d7', 'd8');
    expect(view.pawnPromotion).toHaveBeenCalled();
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
    pawnPromotion: jest.fn(),
    movePiece: jest.fn(),
    capturePiece: jest.fn(),
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

function promotionChessBoardStateMock(square: Square[]) {
  const viewEvents: ViewEventBus = new InMemoryViewEventBus();
  const view: ChessBoardView = chessBoardViewMock(viewEvents);
  const model: ChessModel = {
    squaresWithPiece: mockedPiecesStartPosition,
    move: jest.fn(),
    possibleMoves(position: Square): Square[] {
      return square;
    },
  };

  new ChessBoardPresenter(view, model);

  return { view, viewEvents };
}

const mockedPiecesStartPosition: SquareWithPiece = {
  E1: new King(Side.WHITE),
  F1: new Bishop(Side.WHITE),
  G1: new Knight(Side.WHITE),
  H1: new Rook(Side.WHITE),
  A8: new Pawn(Side.WHITE),
  B8: new Knight(Side.BLACK),
  C8: new Bishop(Side.BLACK),
  D8: new Queen(Side.BLACK),
  E8: new King(Side.BLACK),
};

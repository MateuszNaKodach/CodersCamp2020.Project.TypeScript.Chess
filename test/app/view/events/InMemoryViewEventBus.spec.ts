import { ViewEventBus } from '../../../../src/app/view/events/ViewEventBus';
import { InMemoryViewEventBus } from '../../../../src/app/view/events/InMemoryViewEventBus';
import { SquareWasClicked } from '../../../../src/app/view/events/SquareWasClicked';
import { UndoLastMoveWasClicked } from '../../../../src/app/view/events/UndoLastMoveWasClicked';

describe('InMemoryViewEventBus', () => {
  const eventBus: ViewEventBus = new InMemoryViewEventBus();

  it('when event is published, then all listeners of this event type should be executed', () => {
    const squareWasClickedListener1 = jest.fn();
    const squareWasClickedListener2 = jest.fn();
    const anotherEventListener = jest.fn();
    eventBus.listenOn<SquareWasClicked>('SquareWasClicked', squareWasClickedListener1);
    eventBus.listenOn<SquareWasClicked>('SquareWasClicked', squareWasClickedListener2);
    eventBus.listenOn<UndoLastMoveWasClicked>('UndoLastMoveWasClicked', anotherEventListener);

    const squareWasClickedEvent = new SquareWasClicked({ x: 1, y: 2 });
    eventBus.publish(squareWasClickedEvent);

    expect(squareWasClickedListener1).toBeCalledWith(squareWasClickedEvent);
    expect(squareWasClickedListener2).toBeCalledWith(squareWasClickedEvent);
    expect(anotherEventListener).not.toBeCalled();
  });
});

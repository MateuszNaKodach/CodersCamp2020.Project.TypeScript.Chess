import { ViewEvent } from './ViewEvent';

export class UndoLastMoveWasClicked implements ViewEvent {
  readonly eventType: string = 'UndoLastMoveWasClicked';
}

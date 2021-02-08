import { ViewEvent } from './ViewEvent';

export class SquareWasClicked implements ViewEvent {
  readonly eventType: string = 'SquareWasClicked';

  constructor(readonly position: { x: number; y: number }) {}
}

import { ViewEvent } from './ViewEvent';

export class PromotionChosenPiece implements ViewEvent {
  readonly eventType: string = 'PromotionChosenPiece';

  constructor(readonly chosenPiece: string) {}
}

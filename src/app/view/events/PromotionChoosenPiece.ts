import { ViewEvent } from './ViewEvent';

export class PromotionChoosenPiece implements ViewEvent {
  readonly eventType: string = 'PromotionChoosenPiece';

  constructor(readonly choosenPiece: string) {}
}

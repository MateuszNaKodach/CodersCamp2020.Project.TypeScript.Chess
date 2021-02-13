import { Square } from './Types';
import { Pawn } from './pieces';

export type PawnPromotionWasEnabled = {
  eventType: 'PawnPromotionWasEnabled';
  onSquare: Square;
  pawn: Pawn;
};

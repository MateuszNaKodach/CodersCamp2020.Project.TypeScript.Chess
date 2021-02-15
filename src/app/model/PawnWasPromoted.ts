import { Square } from './Types';
import { Pawn, Knight, Rook, Bishop, Queen } from './pieces';

export type PawnWasPromoted = {
  eventType: 'PawnWasPromoted';
  onSquare: Square;
  from: Pawn;
  to: Knight | Rook | Bishop | Queen;
};

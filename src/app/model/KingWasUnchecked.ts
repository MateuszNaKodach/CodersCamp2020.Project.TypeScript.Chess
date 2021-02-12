import { King } from './pieces';
import { Square } from './Types';

export type KingWasUnchecked = {
  eventType: 'KingWasUnchecked';
  king: King;
  onSquare: Square;
};

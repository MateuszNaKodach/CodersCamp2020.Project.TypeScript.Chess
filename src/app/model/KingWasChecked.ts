import { King } from './pieces';
import { Square } from './Types';

export type KingWasChecked = {
  eventType: 'KingWasChecked';
  king: King;
  onSquare: Square;
};

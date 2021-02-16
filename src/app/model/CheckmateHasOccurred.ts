import { King } from './pieces';
import { Square } from './Types';

export type CheckmateHasOccurred = {
  eventType: 'CheckmateHasOccurred';
  king: King;
  onSquare: Square | undefined;
};

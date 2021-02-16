import { King } from './pieces';
import { Square } from './Types';

export type StalemateHasOccurred = {
  eventType: 'StalemateHasOccurred';
  king: King;
  onSquare: Square | undefined;
};

import { Square } from './Types';
import { Knight, Rook, Bishop, Queen } from './pieces';

export type PawnWasPromoted = {
  eventType: 'PawnWasPromoted';
  onSquare: Square;
  chosenPiece: Queen | Rook | Bishop | Knight;
};

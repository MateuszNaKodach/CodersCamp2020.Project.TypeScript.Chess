import { PieceWasMoved } from './PieceWasMoved';
import { PieceWasCaptured } from './PieceWasCaptured';
import { KingWasChecked } from './KingWasChecked';
import { KingWasUnchecked } from './KingWasUnchecked';
import { CheckmateHasOccurred } from './CheckmateHasOccurred';
import { PawnPromotionWasEnabled } from './PawnPromotionWasEnabled';

export type MoveResult =
  | PieceWasMoved
  | PieceWasCaptured
  | KingWasChecked
  | KingWasUnchecked
  | CheckmateHasOccurred
  | PawnPromotionWasEnabled;

import { PieceWasMoved } from './PieceWasMoved';
import { PieceWasCaptured } from './PieceWasCaptured';
import { KingWasChecked } from './KingWasChecked';
import { KingWasUnchecked } from './KingWasUnchecked';

export type MoveResult = PieceWasMoved | PieceWasCaptured | KingWasChecked | KingWasUnchecked;

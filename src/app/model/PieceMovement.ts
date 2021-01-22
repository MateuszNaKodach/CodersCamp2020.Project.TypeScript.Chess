type Board = { squares: Square[] };

interface PieceMovement {
  possibleMoves(position: string, board: Board): string[];
}

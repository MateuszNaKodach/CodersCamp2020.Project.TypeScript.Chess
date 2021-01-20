type Square = {
  id: string;
};

enum Side {
  WHITE = 'WHITE',
  BLACK = 'BLACK',
}

type Piece = { name: string; side: Side };

interface ChessBoardView {
  showPieceOn(square: Square, piece: Piece): void;

  removePieceFrom(square: Square): void;

  //showAvailableMoves
  //showSelectedPiece
}

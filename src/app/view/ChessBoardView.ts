//Nie przywiazujcie sie do tego kodu. Mozecie sprobowac wszystko pozmieniac / zrobic inaczej.

export type Square = {
  id: string;
};

export enum Side {
  WHITE = 'WHITE',
  BLACK = 'BLACK',
}

export type Piece = { name: string; side: Side };

export interface ChessBoardView {
  showPieceOn(square: Square, piece: Piece): void;

  removePieceFrom(square: Square): void;

  //showAvailableMoves
  //showSelectedPiece
}

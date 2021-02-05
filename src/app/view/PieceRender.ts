export const pieceRendering = (): void => {
  document.body.querySelector('#a1')?.appendChild(createPieceDiv('../static/img/pieces/white-rook.svg'));
  document.body.querySelector('#b1')?.appendChild(createPieceDiv('../static/img/pieces/white-knight.svg'));
  document.body.querySelector('#c1')?.appendChild(createPieceDiv('../static/img/pieces/white-bishop.svg'));
  document.body.querySelector('#d1')?.appendChild(createPieceDiv('../static/img/pieces/white-queen.svg'));
  document.body.querySelector('#e1')?.appendChild(createPieceDiv('../static/img/pieces/white-king.svg'));
  document.body.querySelector('#f1')?.appendChild(createPieceDiv('../static/img/pieces/white-bishop.svg'));
  document.body.querySelector('#g1')?.appendChild(createPieceDiv('../static/img/pieces/white-knight.svg'));
  document.body.querySelector('#h1')?.appendChild(createPieceDiv('../static/img/pieces/white-rook.svg'));
  const whitePawnSquares = document.body.querySelectorAll('[id$="2"]');
  whitePawnSquares.forEach((elem) => elem.appendChild(createPieceDiv('../static/img/pieces/white-pawn.svg')));

  document.body.querySelector('#a8')?.appendChild(createPieceDiv('../static/img/pieces/black-rook.svg'));
  document.body.querySelector('#b8')?.appendChild(createPieceDiv('../static/img/pieces/black-knight.svg'));
  document.body.querySelector('#c8')?.appendChild(createPieceDiv('../static/img/pieces/black-bishop.svg'));
  document.body.querySelector('#d8')?.appendChild(createPieceDiv('../static/img/pieces/black-queen.svg'));
  document.body.querySelector('#e8')?.appendChild(createPieceDiv('../static/img/pieces/black-king.svg'));
  document.body.querySelector('#f8')?.appendChild(createPieceDiv('../static/img/pieces/black-bishop.svg'));
  document.body.querySelector('#g8')?.appendChild(createPieceDiv('../static/img/pieces/black-knight.svg'));
  document.body.querySelector('#h8')?.appendChild(createPieceDiv('../static/img/pieces/black-rook.svg'));
  const blackPawnSquares = document.body.querySelectorAll('[id$="7"]');
  blackPawnSquares.forEach((elem) => elem.appendChild(createPieceDiv('../static/img/pieces/black-pawn.svg')));
};

function createPieceDiv(pieceImage: string): HTMLElement {
  const newPieceElement = document.createElement('img');
  newPieceElement.classList.add('piece');
  newPieceElement.src = pieceImage;
  return newPieceElement;
}

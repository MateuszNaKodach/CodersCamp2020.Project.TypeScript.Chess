import { Square } from './Square';
import { SquareColor } from './SquareColor';
import './../../../../sass/components/_chessboard.scss';

export class Chessboard {
  constructor(
    private id: string = 'chessboard',
    private className: string = 'chessboard',
    private readonly onSquareSelected: (position: { x: number; y: number }) => void,
  ) {}

  private setHtmlElement(): HTMLElement {
    const boardElement = document.createElement('div');
    boardElement.id = this.id;
    boardElement.classList.add(this.className);
    return boardElement;
  }

  createBoard(): HTMLElement {
    const boardHtml = this.setHtmlElement();
    for (let y = 8; y >= 1; y--) {
      for (let x = 1; x <= 8; x++) {
        const squareColor: SquareColor = (x + y) % 2 ? 'light' : 'dark';
        const square = new Square(x, y, squareColor);
        const squareHtml = square.setHtmlElement();
        boardHtml.appendChild(squareHtml);
        squareHtml.addEventListener('click', () => this.onSquareSelected({ x: x, y: y }));
      }
    }
    return boardHtml;
  }
}

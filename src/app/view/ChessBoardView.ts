export class Square {
  constructor(private position_x: number, private position_y: number, private color: SquareColor) {}

  setHtmlElement(): HTMLElement {
    const position = this.mapSquarePosition();
    const squareElement = document.createElement('div');
    squareElement.id = position;
    squareElement.classList.add(`square--${this.color}`);
    return squareElement;
  }

  mapSquarePosition(): string {
    const columns = 'abcdefgh'.split('').reverse();
    const rows = '12345678'.split('');
    return `${columns[this.position_x]}${rows[this.position_y]}`;
  }
}

export type SquareColor = 'light' | 'dark';
export class Chessboard {
  constructor(private id: string = 'chessboard', private className: string = 'chessboard') {}

  private setHtmlElement(): HTMLElement {
    const boardElement = document.createElement('div');
    boardElement.id = this.id;
    boardElement.classList.add(this.className);
    return boardElement;
  }

  createBoard(): HTMLElement {
    const boardHtml = this.setHtmlElement();
    for (let y = 7; y >= 0; y--) {
      for (let x = 7; x >= 0; x--) {
        const squareColor: SquareColor = (x + y) % 2 ? 'dark' : 'light';
        const square = new Square(x, y, squareColor);
        const squareHtml = square.setHtmlElement();
        boardHtml.appendChild(squareHtml);
      }
    }
    return boardHtml;
  }
}

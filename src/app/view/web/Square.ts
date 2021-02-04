import { SquareColor } from './SquareColor';

export class Square {
  constructor(private position_x: number, private position_y: number, private color: SquareColor) {}

  setHtmlElement(): HTMLElement {
    const squareElement = document.createElement('div');
    squareElement.id = this.mapSquarePosition();
    squareElement.classList.add('square');
    squareElement.classList.add(`square--${this.color}`);
    return squareElement;
  }

  mapSquarePosition(): string {
    const columns = 'abcdefgh'.split('');
    const rows = '12345678'.split('');
    return `${columns[this.position_x - 1]}${rows[this.position_y - 1]}`;
  }
}

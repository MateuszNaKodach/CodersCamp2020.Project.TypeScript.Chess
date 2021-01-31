import { Chessboard } from '../../../src/app/view/ChessBoardView';
import '@testing-library/jest-dom';

describe('Component should create a chessboard', () => {
  const chessboard = new Chessboard();
  const boardObj: HTMLElement = chessboard.createBoard();
  document.body.appendChild(boardObj);

  it('Square d1 should be light', () => {
    const d1Square = document.getElementById('d1');

    expect(d1Square).toHaveClass('square--light');
  });

  it('Square f8 should be dark', () => {
    const f8Square = document.getElementById('f8');

    expect(f8Square).toHaveClass('square--dark');
  });
});

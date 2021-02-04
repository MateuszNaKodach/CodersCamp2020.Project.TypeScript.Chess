import '@testing-library/jest-dom';
import { Chessboard } from '../../../src/app/view/web/Chessboard';

describe('Component should create a chessboard', () => {
  const chessboard = new Chessboard('board', 'board', () => {});
  document.body.appendChild(chessboard.createBoard());

  it('Chessboard should have 64 squares', () => {
    const board = document.getElementById('board');
    expect(board).not.toBeNull();
    const squareList = board?.getElementsByTagName('div');

    expect(squareList?.length).toBe(64);
  });

  it('Square d1 should be light', () => {
    const d1Square = document.getElementById('d1');

    expect(d1Square).toHaveClass('square--light');
  });

  it('Square f8 should be dark', () => {
    const f8Square = document.getElementById('f8');

    expect(f8Square).toHaveClass('square--dark');
  });
});

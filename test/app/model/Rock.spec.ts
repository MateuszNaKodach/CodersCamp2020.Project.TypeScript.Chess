import { Square, Row, Column } from '../../../src/app/model/Types';

describe('Rock movement', () => {
  function generateEmptyBoard(): Square[][] {
    let board: Square[][] = [];
    for (let i = 0; i < 8; i++) {
      board[i] = [];
      for (let j = 0; j < 8; j++) {
        board[i][j] = { row: (i + 1) as Row, column: (j + 1) as Column, piece: null };
      }
    }
    console.log(board);
    return board;
  }

  generateEmptyBoard();
});

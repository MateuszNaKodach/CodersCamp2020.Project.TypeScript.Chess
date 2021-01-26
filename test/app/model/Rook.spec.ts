import { Rook } from '../../../src/app/model/Rook';
import { Square, Row, Column } from '../../../src/app/model/Types';

describe('Rook movement', () => {
  // it('Check possibles values, when Rook is on A1', () => {
  //   let board = generateEmptyBoard();
  //   let rook = new Rook('1', 'WHITE');
  //   let rockPosition: Square = { column: 'A', row: 1, piece: rook };

  //   let rockPossibleMoves = rook.possibleMoves(rockPosition, board);

  //   expect(rockPossibleMoves).toBe('here will go Square[] with possible moves to go');
  // });

  function generateEmptyBoard(): Square[][] {
    const board: Square[][] = [];
    for (let i = 0; i < 8; i++) {
      board[i] = [];
      for (let j = 0; j < 8; j++) {
        board[i][j] = { column: j as Column, row: (i + 1) as Row, piece: null };
      }
    }
    console.log(board);
    return board;
  }

  generateEmptyBoard();
});

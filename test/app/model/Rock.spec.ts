import { Rock } from '../../../src/app/model/Rock';
import { Square, Row, Column } from '../../../src/app/model/Types';

describe('Rock movement', () => {
  it('Check possibles values, when Rock is on A1', () => {
    let board = generateEmptyBoard();
    let rock = new Rock('1', 'WHITE');
    let rockPosition: Square = { column: Column['A'], row: 1, piece: rock };

    let rockPossibleMoves = rock.possibleMoves(rockPosition, board);

    expect(rockPossibleMoves).toBe('here will go Square[] with possible moves to go');
  });

  function generateEmptyBoard(): Square[][] {
    let board: Square[][] = [];
    for (let i = 0; i < 8; i++) {
      board[i] = [];
      for (let j = 0; j < 8; j++) {
        board[i][j] = { column: (j + 1) as Column, row: (i + 1) as Row, piece: null };
      }
    }
    console.log(board);
    return board;
  }

  // generateEmptyBoard();
});

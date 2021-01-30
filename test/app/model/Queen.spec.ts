import 'jest-extended';
import { emptyBoard } from './BoardFixture';
import { Square } from '../../../src/app/model/Types';
import { Queen } from '../../../src/app/model/Queen';

describe('Queen possible moves', () => {
  it('When Queen is on D4 and there is no pieces on Queens way', () => {
    const whiteQueen: Queen = new Queen('useless', 'WHITE');
    const whiteQueenPosition: Square = { column: 'D', row: 4 };
    const expectedQueenPossibleMoves = [
      { column: 'D', row: 1 },
      { column: 'D', row: 2 },
      { column: 'D', row: 3 },
      { column: 'D', row: 5 },
      { column: 'D', row: 6 },
      { column: 'D', row: 7 },
      { column: 'D', row: 8 },
      { column: 'A', row: 4 },
      { column: 'B', row: 4 },
      { column: 'C', row: 4 },
      { column: 'E', row: 4 },
      { column: 'F', row: 4 },
      { column: 'G', row: 4 },
      { column: 'H', row: 4 },
      { column: 'C', row: 5 },
      { column: 'B', row: 6 },
      { column: 'A', row: 7 },
      { column: 'E', row: 5 },
      { column: 'F', row: 6 },
      { column: 'G', row: 7 },
      { column: 'H', row: 8 },
      { column: 'C', row: 3 },
      { column: 'B', row: 2 },
      { column: 'A', row: 1 },
      { column: 'E', row: 3 },
      { column: 'F', row: 2 },
      { column: 'G', row: 1 },
    ];

    const queenPossibleMoves = whiteQueen.possibleMoves(whiteQueenPosition, emptyBoard);

    expect(queenPossibleMoves).toIncludeSameMembers(expectedQueenPossibleMoves);
  });
});

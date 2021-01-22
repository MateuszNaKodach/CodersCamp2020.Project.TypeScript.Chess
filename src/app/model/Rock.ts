export class Rock implements PieceMovement {
  id: string;
  side: string;
  position: string;

  constructor(id: string, side: string, position: string) {
    this.id = id;
    this.side = side;
    this.position = position;
  }
  possibleMoves(position: string, board: Board): string[] {
    position = this.position;
    let column = position[0];
    let row = position[1];
    let movesToGo: string[] = [];
    // do sth with movesToGo...
    if (column === 'A') {
      if (row === '1') {
        // look up for move
      }
      if (row === '8') {
        // loook down for move
      }
      // look right for move

      return movesToGo;
    }
    if (column === 'H') {
      if (row === '1') {
        // look up for move
      }
      if (row === '8') {
        // loook down for move
      }
      // look left for move

      return movesToGo;
    }
    if (row === '1') {
      // look left, right and up for move

      return movesToGo;
    }
    if (row === '8') {
      // look left, right and down for move

      return movesToGo;
    } else {
      // look left, right, up and down for move

      return movesToGo;
    }
  }
}

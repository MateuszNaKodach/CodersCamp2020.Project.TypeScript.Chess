import { ChessBoardView } from '../view/ChessBoardView';
import { Position } from './Position';
import { ChessModel, columns, PieceWasCaptured, PieceWasMoved, Player, Row, Side, Square } from '../model';
import { SquareWasClicked } from '../view/events/SquareWasClicked';

export class ChessBoardPresenter {
  constructor(private readonly view: ChessBoardView, private readonly chessModel: ChessModel) {
    view.listenOn<SquareWasClicked>('SquareWasClicked', (event) => this.onSquareWasClicked(event.position));
  }

  private lastPossibleMoves: string[] = [];
  private lastMoveAsPosition: Position = { x: 0, y: 0 };
  private whitePlayer = new Player(Side.WHITE);
  private blackPlayer = new Player(Side.BLACK);
  private actualPlayer: Player = new Player(Side.WHITE);

  onSquareWasClicked(position: Position): void {
    this.view.hideSelection();
    this.view.showSelectedPiece(this.translatePositionToAlgebraicNotation(position));

    this.view.hideAllAvailableMoves();
    const squaresStringArray = this.getPossibleMoves(position);
    this.view.showAvailableMoves(squaresStringArray);

    this.pieceMovement(position, squaresStringArray);
  }

  startGame(): void {
    this.view.showChessBoard(this.chessModel.squaresWithPiece);
  }

  private getPossibleMoves(position: Position): string[] {
    const square: Square = { column: columns[position.x - 1], row: position.y as Row };
    return this.chessModel.possibleMoves(square)?.map((square) => `${square.column.toLowerCase()}${square.row}`) ?? [];
  }

  private translatePositionToAlgebraicNotation(position: Position): string {
    const square: Square = { column: columns[position.x - 1], row: position.y as Row };
    return `${square.column.toLowerCase()}${square.row}`;
  }

  private translatePositionToSquareNotation(position: Position): Square {
    return { column: columns[position.x - 1], row: position.y as Row };
  }

  private translateSquareToAlgebraicNotation(square: Square): string {
    return `${square.column.toLowerCase()}${square.row}`;
  }

  private checkEvents(eventsArray: (PieceWasMoved | PieceWasCaptured)[]): void {
    eventsArray.forEach((event) => {
      event.eventType === 'PieceWasMoved'
        ? this.view.movePiece(this.translateSquareToAlgebraicNotation(event.from), this.translateSquareToAlgebraicNotation(event.to))
        : this.view.capturePiece(this.translateSquareToAlgebraicNotation(event.onSquare));
    });
  }

  private switchPlayer(player: Player): Player {
    return player.side === Side.WHITE ? this.blackPlayer : this.whitePlayer;
  }

  private pieceMovement(position: Position, squaresStringArray: string[]) {
    if (this.lastPossibleMoves.includes(this.translatePositionToAlgebraicNotation(position))) {
      const moveEvents = this.chessModel.move(
        this.actualPlayer,
        this.translatePositionToSquareNotation(this.lastMoveAsPosition),
        this.translatePositionToSquareNotation(position),
      );
      this.actualPlayer = this.switchPlayer(this.actualPlayer);
      this.checkEvents(moveEvents);
      this.view.hideSelection();
      this.view.hideAllAvailableMoves();
    }
    this.lastMoveAsPosition = position;
    this.lastPossibleMoves = squaresStringArray;
  }
}

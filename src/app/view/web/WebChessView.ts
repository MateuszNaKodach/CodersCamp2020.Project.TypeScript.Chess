import { Chessboard } from './Chessboard';
import { ChessBoardView } from '../ChessBoardView';
import { ViewEventBus } from '../events/ViewEventBus';
import { ViewEvent } from '../events/ViewEvent';
import { SquareWasClicked } from '../events/SquareWasClicked';
import { PiecesBoardPositions } from '../Types';

export class WebChessView implements ChessBoardView {
  constructor(private readonly viewEventBus: ViewEventBus, private readonly parent: HTMLElement = document.body) {}

  showChessBoard(piecesPositions: PiecesBoardPositions): void {
    const chessboard: Chessboard = new Chessboard('chessBoardId', 'chessboard', (position) =>
      this.viewEventBus.publish(new SquareWasClicked(position)),
    );
    this.parent.appendChild(chessboard.createBoard());

    this.renderPiecesOnBoard(piecesPositions);
  }

  listenOn<EventType extends ViewEvent = ViewEvent>(eventType: EventType['eventType'], reaction: (event: EventType) => void): void {
    this.viewEventBus.listenOn(eventType, reaction);
  }

  showSelectedPiece(position: { x: number; y: number }): void {}

  // te sqauresToHighlight idą do podświetlenia
  showAvailableMoves(squaresToHighlight: string[]): void {}

  private renderPiecesOnBoard(piecesPositions: PiecesBoardPositions) {
    let piecesSquareId: string;
    let pieceImage: string;
    let pieceName: string;
    let pieceSide: string;

    for (const piece in piecesPositions) {
      if (piecesPositions.hasOwnProperty(piece)) {
        pieceName = piecesPositions[piece].name.toLowerCase();
        pieceSide = piecesPositions[piece].side.toLowerCase();

        piecesSquareId = `#${piece.toLowerCase()}`;
        pieceImage = `../static/img/pieces/${pieceSide}-${pieceName}.svg`;

        this.parent.querySelector(piecesSquareId)?.appendChild(this.createPieceDiv(pieceImage, piece.toLowerCase()));
      } else return;
    }
  }

  private createPieceDiv(pieceImage: string, id: string): HTMLElement {
    const newPieceElement = document.createElement('img');
    newPieceElement.classList.add('piece');
    newPieceElement.setAttribute('id', `${id}-img`);
    newPieceElement.setAttribute('data-testid', `${id}-img`);
    newPieceElement.src = pieceImage;
    return newPieceElement;
  }
}

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

  showSelectedPiece(id: string): void {
    if (this.parent.querySelector(`#${id}`)?.hasChildNodes()) {
      this.parent.querySelector(`#${id}`)?.classList.add('square--selected');
    }
  }

  hideSelection(): void {
    this.parent.querySelectorAll('.square')?.forEach((square) => {
      square.classList.remove('square--selected');
    });
  }

  showAvailableMoves(squaresToHighlight: string[]): void {
    squaresToHighlight.forEach((square) => {
      this.parent.querySelector(`#${square}`)?.classList.add('square--possibleMove');
    });
  }

  hideAllAvailableMoves(): void {
    this.parent.querySelectorAll('.square')?.forEach((square) => {
      square.classList.remove('square--possibleMove');
    });
  }

  movePiece(squareFrom: string, squareTo: string): void {
    const divFrom = this.parent.querySelector(`#${squareFrom}`);
    const divTo = this.parent.querySelector(`#${squareTo}`);
    const pieceImage = divFrom?.firstChild;

    if (pieceImage) {
      divFrom?.removeChild(pieceImage);
      divTo?.appendChild(pieceImage);
    }
  }

  capturePiece(onSquare: string): void {
    const divFrom = this.parent.querySelector(`#${onSquare}`);
    const pieceImage = divFrom?.firstChild;

    if (pieceImage) {
      divFrom?.removeChild(pieceImage);
    }
  }

  private renderPiecesOnBoard(piecesPositions: PiecesBoardPositions) {
    Object.keys(piecesPositions)
      .map((square) => {
        const pieceName = piecesPositions[square].name.toLowerCase();
        const pieceSide = piecesPositions[square].side.toLowerCase();
        const pieceImage = `static/img/pieces/${pieceSide.toLowerCase()}-${pieceName.toLowerCase()}.svg`;
        return { path: pieceImage, squareId: `#${square.toLowerCase()}`, square: square };
      })
      .forEach((element) => {
        this.parent.querySelector(element.squareId)?.appendChild(this.createPieceDiv(element.path, element.square.toLowerCase()));
      });
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

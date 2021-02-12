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

  private renderPiecesOnBoard(piecesPositions: PiecesBoardPositions) {
    Object.keys(piecesPositions)
      .map((square) => {
        const pieceName = piecesPositions[square].name.toLowerCase();
        const pieceSide = piecesPositions[square].side.toLowerCase();
        const pieceImage = `static/img/pieces/${pieceSide}-${pieceName}.svg`;
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

  pawnPromotion(): void {
    console.log('PIONEK!');

    const promotionModal = document.createElement('div');
    promotionModal.classList.add('promotionModal');
    document.body.appendChild(promotionModal);

    const modalWindow = document.createElement('div');
    modalWindow.classList.add('modalWindow');
    modalWindow.textContent = 'Choose your promotion pawn';
    promotionModal.appendChild(modalWindow);

    const modalPawnWrap = document.createElement('h1');
    modalPawnWrap.classList.add('modalPawnWrap');
    modalWindow.appendChild(modalPawnWrap);

    const queenPromotion = document.createElement('div');
    queenPromotion.classList.add('promotionPawn');
    queenPromotion.textContent = 'Queen';
    modalPawnWrap.appendChild(queenPromotion);

    const rookPromotion = document.createElement('div');
    rookPromotion.classList.add('promotionPawn');
    rookPromotion.textContent = 'Rook';
    modalPawnWrap.appendChild(rookPromotion);

    const knightPromotion = document.createElement('div');
    knightPromotion.classList.add('promotionPawn');
    knightPromotion.textContent = 'Knight';
    modalPawnWrap.appendChild(knightPromotion);

    const bishopPromotion = document.createElement('div');
    bishopPromotion.classList.add('promotionPawn');
    bishopPromotion.textContent = 'Bishop';
    modalPawnWrap.appendChild(bishopPromotion);

    const clickedPawn = document.querySelectorAll('.promotionPawn');
    clickedPawn.forEach(function (element) {
      element.addEventListener('click', function (event: any) {
        console.log('promocja na', event);
      });
    });

    window.onclick = function (event: any) {
      if (event.target == promotionModal) {
        promotionModal.style.display = 'none';
      }
    };
  }
}

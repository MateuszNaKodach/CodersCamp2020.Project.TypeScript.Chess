import { Chessboard } from './Chessboard';
import { ChessBoardView } from '../ChessBoardView';
import { ViewEventBus } from '../events/ViewEventBus';
import { ViewEvent } from '../events/ViewEvent';
import { SquareWasClicked } from '../events/SquareWasClicked';

export class WebChessView implements ChessBoardView {
  constructor(private readonly viewEventBus: ViewEventBus, private readonly parent: HTMLElement = document.body) {}

  showChessBoard(): void {
    const chessboard: Chessboard = new Chessboard('chessBoardId', 'chessboard', (position) =>
      this.viewEventBus.publish(new SquareWasClicked(position)),
    );
    this.parent.appendChild(chessboard.createBoard());
  }

  listenOn<EventType extends ViewEvent = ViewEvent>(eventType: EventType['eventType'], reaction: (event: EventType) => void): void {
    this.viewEventBus.listenOn(eventType, reaction);
  }

  showSelectedPiece(position: { x: number; y: number }): void {}

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

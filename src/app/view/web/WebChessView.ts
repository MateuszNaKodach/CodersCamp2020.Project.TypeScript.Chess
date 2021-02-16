import { Chessboard } from './Chessboard';
import { ChessBoardView } from '../ChessBoardView';
import { ViewEventBus } from '../events/ViewEventBus';
import { ViewEvent } from '../events/ViewEvent';
import { SquareWasClicked } from '../events/SquareWasClicked';
import { PromotionChosenPiece } from '../events/PromotionChosenPiece';
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

  afterPromotionPiece(onSquare: string, piece: string, side: string) {
    const divFrom = this.parent.querySelector(`#${onSquare}`);
    const pieceImage = divFrom?.firstChild as HTMLImageElement;

    if (pieceImage) {
      pieceImage.src = `static/img/pieces/${side}-${piece}.svg`;
    }
  }

  private renderPiecesOnBoard(piecesPositions: PiecesBoardPositions) {
    Object.keys(piecesPositions)
      .map((square) => {
        const pieceName = piecesPositions[square].name.toLowerCase();
        const pieceSide = piecesPositions[square].side.toLowerCase();
        const pieceImage = `static/img/pieces/${pieceSide.toLowerCase()}-${pieceName}.svg`;
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
    const promotionModal = document.createElement('div');
    promotionModal.classList.add('modal');
    document.body.appendChild(promotionModal);

    const modalWindow = document.createElement('div');
    modalWindow.classList.add('modal__window');
    modalWindow.textContent = 'Choose your promotion pawn';
    promotionModal.appendChild(modalWindow);

    const modalPawnWrap = document.createElement('h1');
    modalPawnWrap.classList.add('modal__wrap');
    modalWindow.appendChild(modalPawnWrap);

    const queenPromotion = document.createElement('div');
    queenPromotion.classList.add('modal__pawn');
    queenPromotion.textContent = 'Queen';
    modalPawnWrap.appendChild(queenPromotion);

    const rookPromotion = document.createElement('div');
    rookPromotion.classList.add('modal__pawn');
    rookPromotion.textContent = 'Rook';
    modalPawnWrap.appendChild(rookPromotion);

    const knightPromotion = document.createElement('div');
    knightPromotion.classList.add('modal__pawn');
    knightPromotion.textContent = 'Knight';
    modalPawnWrap.appendChild(knightPromotion);

    const bishopPromotion = document.createElement('div');
    bishopPromotion.classList.add('modal__pawn');
    bishopPromotion.textContent = 'Bishop';
    modalPawnWrap.appendChild(bishopPromotion);

    const clickedPawn = document.querySelectorAll('.modal__pawn');
    clickedPawn.forEach((element) => {
      element.addEventListener('click', () => {
        // console.log(element.innerHTML);
        this.viewEventBus.publish(new PromotionChosenPiece(element.innerHTML));
        promotionModal.style.display = 'none';
      });
    });
  }
}

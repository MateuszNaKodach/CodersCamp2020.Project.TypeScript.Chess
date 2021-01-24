import { WebChessBoardView } from '../../../src/app/view/WebChessBoardView';
import { screen } from '@testing-library/dom';
import { PieceComponent } from '../../../src/app/view/PieceComponent';
import { ChessBoardView, Side } from '../../../src/app/view/ChessBoardView';

xit('Showing piece on square', () => {
  const chessBoardView: ChessBoardView = new WebChessBoardView();

  chessBoardView.showPieceOn({ id: 'A1' }, { name: 'Pawn', side: Side.WHITE });

  expect(screen.getByTestId('A1')).toContainElement(PieceComponent({ name: 'Pawn', side: Side.WHITE }));
});

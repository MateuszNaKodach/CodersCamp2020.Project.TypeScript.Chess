import { selectedSquare } from './../../../src/app/presenter/SelectedSquare';
import '@testing-library/jest-dom';

describe('SelectedSquare', () => {
  it('SelectedSquare should be invoken with given coordinates', () => {
    const consoleLog = jest.spyOn(global.console, 'log');
    selectedSquare({ x: 7, y: 4 });
    expect(consoleLog).toHaveBeenCalledWith('this is x: 7 and y: 4');
  });
});

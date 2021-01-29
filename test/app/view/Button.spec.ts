import { Button } from '../../../src/app/view/Button';
import '@testing-library/jest-dom';

describe('Button view creation', () => {
  it("Should create button with given id and CSS class 'button--small' and default class 'button'", () => {
    const testSmallButton: Button = Button.small('smallButton');

    const testSmallButtonHTML = testSmallButton.toHtml();

    expect(testSmallButtonHTML.tagName).toBe('BUTTON');
    expect(testSmallButtonHTML.id).toBe('smallButton');
    expect(testSmallButtonHTML.classList).toContain('button');
    expect(testSmallButtonHTML.classList).toContain('button--small');
  });
  it("Should create button with given id and CSS class 'button--large' and default class 'button'", () => {
    const testLargeButton: Button = Button.large('largeButton');

    const testLargeButtonHTML = testLargeButton.toHtml();

    expect(testLargeButtonHTML.tagName).toBe('BUTTON');
    expect(testLargeButtonHTML.id).toBe('largeButton');
    expect(testLargeButtonHTML.classList).toContain('button');
    expect(testLargeButtonHTML.classList).toContain('button--large');
  });
});

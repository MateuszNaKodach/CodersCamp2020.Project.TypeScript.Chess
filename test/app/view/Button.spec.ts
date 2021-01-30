import { Button } from '../../../src/app/view/Button';
import '@testing-library/jest-dom';
import '@testing-library/user-event';

describe('Button view creation', () => {
  it("Should create button with given id and CSS class 'button--small' and default class 'button'", () => {
    const testSmallButton: Button = Button.small('smallButton');

    const testSmallButtonHTML: HTMLElement = testSmallButton.toHtml();

    expect(testSmallButtonHTML.tagName).toBe('BUTTON');
    expect(testSmallButtonHTML.id).toBe('smallButton');
    expect(testSmallButtonHTML.classList).toContain('button');
    expect(testSmallButtonHTML.classList).toContain('button--small');
  });
  it("Should create button with given id and CSS class 'button--large' and default class 'button'", () => {
    const testLargeButton: Button = Button.large('largeButton');

    const testLargeButtonHTML: HTMLElement = testLargeButton.toHtml();

    expect(testLargeButtonHTML.tagName).toBe('BUTTON');
    expect(testLargeButtonHTML.id).toBe('largeButton');
    expect(testLargeButtonHTML.classList).toContain('button');
    expect(testLargeButtonHTML.classList).toContain('button--large');
  });
  it('Should create button with given id and given inner text', () => {
    const testButtonWithText: Button = Button.small('buttonWithText').withText('Test Button');

    const testButtonWithTextHTML: HTMLElement = testButtonWithText.toHtml();

    expect(testButtonWithTextHTML.id).toBe('buttonWithText');
    expect(testButtonWithTextHTML.innerText).toBe('Test Button');
  });
  it('Should create button with given id and given on click function and call this function after user click', () => {
    const myOnClickFn = jest.fn();
    const testButtonWithOnClickFn: Button = Button.small('buttonWithText').onClick(myOnClickFn);

    const testButtonWithOnClickFnHTML: HTMLElement = testButtonWithOnClickFn.toHtml();

    testButtonWithOnClickFnHTML.click();

    expect(myOnClickFn).toBeCalledTimes(1);
  });
  it('Should update button and change its size from small to large', () => {
    const testButtonSmall: Button = Button.small('testButtonSmall');

    const testButtonSmallHtml: HTMLElement = testButtonSmall.toHtml();

    document.body.appendChild(testButtonSmallHtml);

    Button.fromHtml(testButtonSmallHtml).large().updateHtml();

    expect(testButtonSmallHtml.classList).not.toContain('button--small');
    expect(testButtonSmallHtml.classList).toContain('button--large');
  });
  it('Should update button and change its size from large to small', () => {
    const testButtonLarge: Button = Button.large('testButtonLarge');

    const testButtonLargeHtml: HTMLElement = testButtonLarge.toHtml();

    document.body.appendChild(testButtonLargeHtml);

    Button.fromHtml(testButtonLargeHtml).small().updateHtml();

    expect(testButtonLargeHtml.classList).not.toContain('button--large');
    expect(testButtonLargeHtml.classList).toContain('button--small');
  });
});

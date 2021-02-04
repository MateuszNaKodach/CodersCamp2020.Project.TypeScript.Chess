import { Button } from '../../../src/app/view/Button';
import '@testing-library/jest-dom';
import '@testing-library/user-event';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

describe('Button view creation', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it("Should create button with given id and CSS class 'button--small' and default class 'button'", async () => {
    const testSmallButton: Button = Button.small('smallButton');

    renderElement(testSmallButton.toHtml());

    const renderedButton = await screen.findByRole('button');
    expect(renderedButton).toHaveClass('button');
    expect(renderedButton).toHaveClass('button--small');
  });

  it("Should create button with given id and CSS class 'button--large' and default class 'button'", () => {
    const testLargeButton: Button = Button.large('largeButton');

    const testLargeButtonHTML: HTMLElement = testLargeButton.toHtml();

    expect(testLargeButtonHTML.tagName).toBe('BUTTON');
    expect(testLargeButtonHTML.id).toBe('largeButton');
    expect(testLargeButtonHTML.classList).toContain('button');
    expect(testLargeButtonHTML.classList).toContain('button--large');
  });

  it('Should create button with given id and given inner text', async () => {
    const testButtonWithText: Button = Button.small('buttonWithText').withText('Test Button');

    renderElement(testButtonWithText.toHtml());

    expect(await screen.findByText('Test Button')).toBeDefined();
  });

  it('Should create button with given id and given on click function and call this function after user click', async () => {
    const myOnClickFn = jest.fn();
    renderElement(Button.small('buttonWithText').onClick(myOnClickFn).toHtml());

    userEvent.click(await screen.findByTestId('buttonWithText'));

    expect(myOnClickFn).toBeCalledTimes(1);
  });

  it('Should update button and change its size from small to large', () => {
    const testButtonSmall: Button = Button.small('testButtonSmall');

    const testButtonSmallHtml: HTMLElement = testButtonSmall.toHtml();

    renderElement(testButtonSmallHtml);

    Button.fromHtml(testButtonSmallHtml).large().updateHtml();

    expect(testButtonSmallHtml.classList).not.toContain('button--small');
    expect(testButtonSmallHtml.classList).toContain('button--large');
  });

  it('Should update button and change its size from large to small', () => {
    const testButtonLarge: Button = Button.large('testButtonLarge');

    const testButtonLargeHtml: HTMLElement = testButtonLarge.toHtml();

    renderElement(testButtonLargeHtml);

    Button.fromHtml(testButtonLargeHtml).small().updateHtml();

    expect(testButtonLargeHtml.classList).not.toContain('button--large');
    expect(testButtonLargeHtml.classList).toContain('button--small');
  });
});

function renderElement(element: HTMLElement): void {
  document.body.appendChild(element);
}

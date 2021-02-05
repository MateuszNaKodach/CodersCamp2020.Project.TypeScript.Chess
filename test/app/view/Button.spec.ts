import { Button } from '../../../src/app/view/Button';
import '@testing-library/jest-dom';
import '@testing-library/user-event';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

describe('Button view creation', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it("Should create button with CSS class 'button--small' and default class 'button'", async () => {
    const testSmallButton: Button = Button.small('smallButton');

    renderElement(testSmallButton.toHtml());

    const renderedButton = await screen.findByRole('button');
    expect(renderedButton).toHaveClass('button');
    expect(renderedButton).toHaveClass('button--small');
  });

  it("Should create button with CSS class 'button--large' and default class 'button'", async () => {
    const testLargeButton: Button = Button.large('largeButton');

    renderElement(testLargeButton.toHtml());

    const renderButton = await screen.findByRole('button');
    expect(renderButton).toHaveClass('button');
    expect(renderButton).toHaveClass('button--large');
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

  it('Should update button and change its size from small to large', async () => {
    const testButtonSmall: Button = Button.small('testButtonSmall');

    renderElement(testButtonSmall.toHtml());

    const renderButton = await screen.findByRole('button');

    Button.fromHtml(renderButton).large().updateHtml();

    expect(renderButton).not.toHaveClass('button--small');
    expect(renderButton).toHaveClass('button--large');
  });

  it('Should update button and change its size from large to small', async () => {
    const testButtonLarge: Button = Button.large('testButtonLarge');

    renderElement(testButtonLarge.toHtml());

    const renderButton = await screen.findByRole('button');

    Button.fromHtml(renderButton).small().updateHtml();

    expect(renderButton).not.toHaveClass('button--large');
    expect(renderButton).toHaveClass('button--small');
  });
});

function renderElement(element: HTMLElement): void {
  document.body.appendChild(element);
}

import { Button, Size } from './view/Button';

export const App = () => {
  const testButton = new Button('test', 'play', ['test', 'test1', 'button--large'], undefined);
  console.log(testButton);
  console.log(testButton);
  // testButton.changeSizeToLarge();
  // testButton.changeSizeTo(Size.LARGE);
  testButton.changeSizeToSmall();

  document.body.appendChild(testButton.withText('lala').large().html());
};

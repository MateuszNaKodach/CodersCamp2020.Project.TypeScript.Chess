import { Button } from './view/Button';

export const App = () => {
  //Test Buttona na żywym organizmie  vvv
  const button: Button = Button.small('buttonId')
    .withText('Text')
    .onClick(() => console.log('sad'));

  const largeButton: Button = Button.large('largeButton')
    .withText("I'm large")
    .onClick(() => console.log('large'));

  const largeButtonHtml = largeButton.toHtml();
  document.body.appendChild(largeButtonHtml);

  const buttonHtml = button.toHtml();
  document.body.appendChild(buttonHtml);

  Button.fromHtml(buttonHtml).withText("I'm small").updateHtml();
  //Koniec testu ^^^
};

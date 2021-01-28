import { Button } from './view/Button';

export const App = () => {
  const button: Button = Button.small('buttonId')
    .withText('Text')
    .onClick(() => console.log('sad'));

  const buttonHtml = button.toHtml();
  document.body.appendChild(buttonHtml);

  Button.fromHtml(buttonHtml).large().withText('Sratata').updateHtml();
};

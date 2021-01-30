import { Button } from './view/Button';

export const App = () => {
  //Test Buttona na żywym organizmie  vvv
  const myOnClickFn = () => {
    console.log('Nowa funkcja onclick');
  };
  const button: Button = Button.small('buttonId')
    .withText('Text')
    .onClick(() => console.log('Small, defaultowa funkcja onclick'));

  const largeButton: Button = Button.large('largeButton')
    .withText("I'm large")
    .onClick(() => console.log('Large, defaultowa funkcja onclick'));

  const largeButtonHtml = largeButton.toHtml();
  document.body.appendChild(largeButtonHtml);

  const buttonHtml = button.toHtml();
  document.body.appendChild(buttonHtml);

  //tutaj mały teścik - wywołując fromHtml i później onClick na buttonie okazuje się, że pierwtona funkcja na klik nie zostaje ndapisana, a tylko dopisujemy nową funkcję ale do właściwości onclick elementu
  Button.fromHtml(buttonHtml).withText("I'm small").onClick(myOnClickFn).updateHtml();
  //Koniec testu ^^^
};

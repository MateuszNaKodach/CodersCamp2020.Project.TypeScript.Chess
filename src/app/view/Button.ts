export enum Size {
  LARGE = 'large',
  SMALL = 'small',
}

export class Button {
  id: string;
  btnText: string;
  classList: string[];
  onClickFn: any;

  constructor(id: string, btnText: string, classList: string[], onClickFn: any) {
    this.id = id;
    this.btnText = btnText;
    this.classList = classList;
    this.onClickFn = onClickFn;
  }

  withText(text: string): Button {
    this.btnText = text;
    return this;
  }

  large(): Button {
    const index = this.classList.indexOf('button--small');
    index > -1 ? this.classList.splice(index, 1) : this.classList;
    this.classList.push('button--large');
    return this;
  }

  changeSizeToSmall(): void {
    const index = this.classList.indexOf('button--large');
    index > -1 ? this.classList.splice(index, 1) : this.classList;
    this.classList.push('button--small');
  }
  //TODO - universal size changing method
  changeSizeTo(size: Size): void {}

  static fromHtml(element: HTMLElement): Button {
    const arr = [...element.classList];
    return new Button(element.id, element.innerText, element.classList, element.onclick);
  }

  html(element?: HTMLElement): HTMLElement {
    const buttonDomElement: HTMLButtonElement = element ?? document.createElement('button');
    buttonDomElement.id = this.id;
    buttonDomElement.innerText = this.btnText;
    buttonDomElement.classList.add('button');
    buttonDomElement.classList.add(...this.classList);
    buttonDomElement.addEventListener('click', this.onClickFn);

    return buttonDomElement;
  }
}

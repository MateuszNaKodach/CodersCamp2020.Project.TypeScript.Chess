enum Size {
  LARGE = 'large',
  SMALL = 'small',
}

export class Button {
  constructor(private id: string, private size: Size, private btnText: string = '', private onClickFn: () => void = () => {}) {}

  static fromHtml(element: HTMLElement): Button {
    const size = element.classList.contains('button--small') ? Size.SMALL : Size.LARGE;
    return new Button(element.id, size, element.innerText, () => element.click());
  }

  static small(id: string): Button {
    return new Button(id, Size.SMALL);
  }

  static large(id: string): Button {
    return new Button(id, Size.LARGE);
  }

  withText(text: string): Button {
    return new Button(this.id, this.size, text, this.onClickFn);
  }

  large(): Button {
    return new Button(this.id, Size.LARGE, this.btnText, this.onClickFn);
  }

  small(): Button {
    return new Button(this.id, Size.SMALL, this.btnText, this.onClickFn);
  }

  onClick(clickFn: () => void): Button {
    return new Button(this.id, this.size, this.btnText, clickFn);
  }

  updateHtml(): void {
    const buttonDomElement: HTMLButtonElement = document.querySelector(`#${this.id}`) ?? document.createElement('button');
    this.toHtml(buttonDomElement);
  }

  toHtml(element?: HTMLButtonElement): HTMLButtonElement {
    const buttonDomElement: HTMLButtonElement = element ?? document.createElement('button');
    buttonDomElement.id = this.id;
    buttonDomElement.innerText = this.btnText;
    buttonDomElement.classList.add('button');
    if (this.size == Size.SMALL) {
      buttonDomElement.classList.remove('button--large');
      buttonDomElement.classList.add('button--small');
    }
    if (this.size == Size.LARGE) {
      buttonDomElement.classList.remove('button--small');
      buttonDomElement.classList.add('button--large');
    }
    buttonDomElement.onclick = this.onClickFn;

    return buttonDomElement;
  }
}

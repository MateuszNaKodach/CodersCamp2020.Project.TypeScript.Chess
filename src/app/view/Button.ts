enum Size {
  LARGE = 'large',
  SMALL = 'small',
}

export class Button {
  private constructor(private id: string, private size: Size, private btnText: string = '', private onClickFn: any = () => {}) {}

  static fromHtml(element: HTMLElement): Button {
    const size = element.classList.contains('button--small') ? Size.SMALL : Size.LARGE;
    return new Button(element.id, size, element.innerText, element.onclick);
  }

  static small(id: string): Button {
    return new Button(id, Size.SMALL);
  }

  static large(id: string): Button {
    return new Button(id, Size.LARGE);
  }

  withText(text: string): Button {
    this.btnText = text;
    return this;
  }

  large(): Button {
    this.size = Size.LARGE;
    return this;
  }

  small(): Button {
    this.size = Size.SMALL;
    return this;
  }

  onClick(clickFn: any): Button {
    this.onClickFn = clickFn;
    return this;
  }

  updateHtml(): void {
    const buttonDomElement: HTMLButtonElement = document.querySelector(`#${this.id}`) ?? document.createElement('button');
    this.toHtml(buttonDomElement);
  }

  toHtml(element?: HTMLButtonElement): HTMLElement {
    const buttonDomElement: HTMLButtonElement = element ?? document.createElement('button');
    buttonDomElement.id = this.id;
    buttonDomElement.innerText = this.btnText;
    buttonDomElement.classList.add('button');
    if (this.size == Size.SMALL) {
      buttonDomElement.classList.add('button--small');
    }
    if (this.size == Size.LARGE) {
      buttonDomElement.classList.add('button--large');
    }
    buttonDomElement.addEventListener('click', this.onClickFn);

    return buttonDomElement;
  }
}

import {createElement} from "../utils/render";

export default class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
      throw new Error(`Can't instantiate Abstract, only concrete one.`);
    }

    this._element = null;
    // Компонент не знает о реализации функции коллбэка, он только лишь принимает, ее и сохраняет в свойстве.
    // А сохраняем мы ее в свойстве, чтобы оставить на нее ссылку, которой можно в последствии воспользоваться для удаления слушателя.
    this._callback = {};
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

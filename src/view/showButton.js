import {createElement} from "../utils";

const createShowButtonTemplate = () => {
  return `<button class="films-list__show-more">Show more</button>`;
};

export default class ShowButtonView {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createShowButtonTemplate();
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

import {createElement} from "../utils";

const createFooterStatisticsTemplate = (cards) => {
  return `<section class="footer__statistics">
    <p>${cards.length} movies inside</p>
  </section>`;
};

export default class FooterStatisticView {
  constructor(cards) {
    this._element = null;
    this._cards = cards;
  }

  getTemplate() {
    return createFooterStatisticsTemplate(this._cards);
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

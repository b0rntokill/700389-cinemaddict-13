import {createElement} from "../utils";

const createFilmEmptyTemplate = () => {
  return `<section class="films-list">
      <h2 class="films-list__title">There are no movies in our database</h2>
    </section>`;
};

export default class FilmEmptyView {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmEmptyTemplate();
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

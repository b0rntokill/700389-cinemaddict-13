import AbstractView from "./abstract";

const createFilmsTopTemplate = () => {
  return `<section class="films-list films-list--extra films-list--top">
      <h2 class="films-list__title">Top rated</h2>

      <div class="films-list__container"></div>
    </section>`;
};

export default class FilmsTopView extends AbstractView {
  getTemplate() {
    return createFilmsTopTemplate();
  }
}

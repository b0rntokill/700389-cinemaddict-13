import AbstractView from "./abstract";

const createFilmsCommentsTemplate = () => {
  return `<section class="films-list films-list--extra films-list--comments">
      <h2 class="films-list__title">Most commented</h2>

      <div class="films-list__container"></div>
    </section>`;
};

export default class FilmsCommentsView extends AbstractView {
  getTemplate() {
    return createFilmsCommentsTemplate();
  }
}

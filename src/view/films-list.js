import AbstractView from "./abstract";

const createFilmsListTemplate = () => {
  return `<section class="films-list films-list--all">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

      <div class="films-list__container"></div>

    </section>`;
};

export default class FilmsListView extends AbstractView {
  getTemplate() {
    return createFilmsListTemplate();
  }
}

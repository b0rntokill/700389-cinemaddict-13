import AbstractView from "./abstract";

const createFilmEmptyTemplate = () => {
  return `<section class="films-list">
      <h2 class="films-list__title">There are no movies in our database</h2>
    </section>`;
};

export default class FilmEmptyView extends AbstractView {
  getTemplate() {
    return createFilmEmptyTemplate();
  }
}

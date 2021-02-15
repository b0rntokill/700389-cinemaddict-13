import {getDurationFormat} from "../utils/task";
import {variables} from "../const";
import AbstractView from "./abstract";

const getFormatDescription = (description) => {
  let formatDescription;
  description.length > variables.MAX_SYMBOL_IN_DESCRIPTION ? formatDescription = `${description.slice(0, variables.MAX_SYMBOL_IN_DESCRIPTION)}...` : formatDescription = description;
  return formatDescription;
};

const createFilmCardTemplate = (film) => {
  const {film_info: {title, poster, description, runtime, total_rating: rating, genre, release: {date}}, user_details: {watchlist, already_watched: watched, favorite}, comments} = film;
  const formatDuration = getDurationFormat(runtime);
  const formatDescription = getFormatDescription(description);
  const shortDate = date.toLocaleDateString(`en-US`, variables.SHORT_DATE_OPTIONS);

  return `<article class="film-card">
          <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${shortDate}</span>
            <span class="film-card__duration">${formatDuration}</span>
            <span class="film-card__genre">${genre[0]}</span>
          </p>
          <img src="./${poster}" alt="${title}" class="film-card__poster">
          <p class="film-card__description">${formatDescription}</p>
          <a class="film-card__comments">${comments.length} comments</a>
          <div class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchlist ? `film-card__controls-item--active` : ``}" type="button">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${watched ? `film-card__controls-item--active` : ``}" type="button">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite ${favorite ? `film-card__controls-item--active` : ``}" type="button">Mark as favorite</button>
          </div>
        </article>`;
};

export default class FilmCardView extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
    // Вот тут биндим, но сначала убедимся, что не биндя выйдет пися.
    this._editClickHandler = this._editClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }
  // Компонент не знает о реализации функции коллбэка, он только лишь принимает, ее и сохраняет в свойстве.
  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  // Но выходит знает, на чем она должна выполняться.
  setClickHandler(callback) {
    this._callback.click = callback;
    Array.from(this.getElement().querySelectorAll(`.film-card__poster, .film-card__title, .film-card__comments`))
      .forEach((selector) => selector.addEventListener(`click`, this._editClickHandler));
  }
}

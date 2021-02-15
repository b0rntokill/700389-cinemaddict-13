import {getDurationFormat, getCommentTimeFormat} from "../utils/task";
import {variables} from "../const";
import AbstractView from "./abstract";

const getGenreItemsTemplate = (genres) => {
  return genres.map((genre) => `
    <span class="film-details__genre">${genre}</span>
  `).join(``);
};

const getCommentItemTemplate = (comment) => {
  const {author, comment: text, date, emotion} = comment;

  return `
    <li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
      </span>
      <div>
        <p class="film-details__comment-text">${text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${getCommentTimeFormat(date)}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>
  `;
};

const createPopupTemplate = (film) => {
  const {film_info: {title, alternative_title: alternativeTitle, age_rating: ageRating, director, writers, actors, poster, description, runtime, total_rating: rating, genre, release: {date, release_country: country}}, user_details: {watchlist, already_watched: watched, favorite}, comments} = film;

  const formatDuration = getDurationFormat(runtime);
  const commaTextFormat = (arr) => arr.join(`, `)
  const fullDate = date.toLocaleDateString(`en-GB`, variables.FULL_DATE_OPTIONS);

  const getCheckedDetails = (details) => {
    return details ? `checked` : ``;
  };

  const commentsItemTemplate = comments.sort((a, b) => a.date - b.date).map((comment) => getCommentItemTemplate(comment)).join(``);

  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src=${poster} alt="${title}">

          <p class="film-details__age">${ageRating}</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">${alternativeTitle}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${writers.length > 1 ? `Writers` : `Writer`}</td>
              <td class="film-details__cell">${commaTextFormat(writers)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${actors.length > 1 ? `Actors` : `Actor`}</td>
              <td class="film-details__cell">${commaTextFormat(actors)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${fullDate}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${formatDuration}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${country.length > 1 ? `Countries` : `Country`}</td>
              <td class="film-details__cell">${commaTextFormat(country)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${genre.length > 1 ? `Genres` : `Genre`}</td>
              <td class="film-details__cell">
                ${getGenreItemsTemplate(genre)}
            </tr>
          </table>

          <p class="film-details__film-description">${description}</p>
        </div>
      </div>

      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${getCheckedDetails(watchlist)}>
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${getCheckedDetails(watched)}>
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${getCheckedDetails(favorite)}>
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

        <ul class="film-details__comments-list">
            ${commentsItemTemplate}
        </ul>

        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`;
};

export default class PopupView extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
    // Вот тут биндим, но сначала убедимся, что не биндя выйдет пися.
    this._editClickHandler = this._editClickHandler.bind(this);
    this._editDocumentKeydownHandler = this._editDocumentKeydownHandler.bind(this);
  }

  getTemplate() {
    return createPopupTemplate(this._film);
  }

  // Компонент не знает о реализации функции коллбэка, он только лишь принимает, ее и сохраняет в свойстве.
  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
    this._removeDocumentKeydownHandler();
  }

  _editDocumentKeydownHandler(evt) {
    evt.preventDefault();
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      document.removeEventListener(`keydown`, this._editDocumentKeydownHandler);
      this._callback.keydown();
      this._callback.keydown = null;
    }
  }

  _removeDocumentKeydownHandler() {
    if (this._callback.keydown) {
      document.removeEventListener(`keydown`, this._editDocumentKeydownHandler);
      this._callback.keydown = null;
    }
  }

  // Но выходит знает, на чем она должна выполняться.
  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._editClickHandler);
  }

  setDocumentKeydownHandler(callback) {
    this._callback.keydown = callback;
    document.addEventListener(`keydown`, this._editDocumentKeydownHandler);
  }
}

import FilmEmptyView from "../view/film-empty";
import SortView from "../view/sort";
import FilmsContainerView from "../view/filmsContainer";
import FilmsListView from "../view/films-list";
import FilmsTopView from "../view/films-top";
import FilmsCommentsView from "../view/films-comments";
import ShowButtonView from "../view/showButton";
import FilmCardView from "../view/film-card";
import PopupView from "../view/popup";
import {RenderPosition, render, remove} from "../utils/render";

const FILM_COUNT_ALL = 5;
const FILM_COUNT_EXTRA = 2;

export default class MovieList {
  constructor(movieListContainer) {
    this._movieListContainer = movieListContainer;

    this._filmsContainerComponent = new FilmsContainerView();
    this._sortViewComponent = new SortView();
    this._filmEmptyComponent = new FilmEmptyView();
    this._filmsListComponent = new FilmsListView();
    this._filmsTopComponent = new FilmsTopView();
    this._filmsCommentsComponent = new FilmsCommentsView();
    this._showButtonComponent = new ShowButtonView();

    this._renderedFilmsCount = FILM_COUNT_ALL;

    this._handleShowButtonClick = this._handleShowButtonClick.bind(this);
  }

  init(films) {
    this._films = films.slice();
    // Метод для инициализации (начала работы) модуля,
    // малая часть текущей функции renderFilmsList в main.js
    render(this._movieListContainer, this._sortViewComponent, RenderPosition.BEFOREEND);
    render(this._movieListContainer, this._filmsContainerComponent, RenderPosition.BEFOREEND);

    this._renderFilmsList();
  }

  _renderFilm(film, filmList) {
    // Метод, куда уйдёт логика созданию и рендерингу компонетов задачи,
    // текущая функция renderFilm в main.js
    const filmCardComponent = new FilmCardView(film);
    const popupComponent = new PopupView(film);

    const showPopup = () => {
      this._movieListContainer.appendChild(popupComponent.getElement());
      popupComponent.setDocumentKeydownHandler(closePopup);
    };

    const closePopup = () => {
      this._movieListContainer.removeChild(popupComponent.getElement());
    };

    filmCardComponent.setClickHandler(showPopup);
    popupComponent.setClickHandler(closePopup);

    render(filmList, filmCardComponent, RenderPosition.BEFOREEND);
  }

  _renderFilms(from, to, where) {
    // Метод для рендеринга N-карточек фильма за раз
    this._films
      .slice(from, to)
      .forEach((film) => this._renderFilm(film, where));
  }

  _renderFilmsList() {
    // Метод для рендеринга и логики рендеринга фильмов (тут условие для заглушки при отсутствии фильмов)
    if (this._films.length === 0) {
      this._renderNoFilms();
      return;
    }

    render(this._filmsContainerComponent, this._filmsListComponent, RenderPosition.AFTERBEGIN);

    this._siteFilmsAllElement = this._filmsContainerComponent.getElement().querySelector(`.films-list--all`);
    this._siteFilmsAllContainerElement = this._filmsContainerComponent.getElement().querySelector(`.films-list--all .films-list__container`);

    // Math.min чтобы не пытаться рисовать 5 задач, если их меньше
    this._renderFilms(0, Math.min(FILM_COUNT_ALL, this._films.length), this._siteFilmsAllContainerElement);

    if (this._films.length > FILM_COUNT_ALL) {
      this._renderShowButton();
    }

    this._renderExtraFilmsList();
  }

  _renderExtraFilmsList() {
    // Сортируем для отрисовки топовых и комментируемых
    const filmsTop = this._films.slice().sort((a, b) => b.film_info.total_rating - a.film_info.total_rating);
    const filmMostComments = this._films.slice().sort((a, b) => b.comments.length - a.comments.length);

    render(this._filmsContainerComponent, this._filmsTopComponent, RenderPosition.BEFOREEND);
    render(this._filmsContainerComponent, this._filmsCommentsComponent, RenderPosition.BEFOREEND);

    this._siteFilmsExtraElement = Array.from(this._filmsContainerComponent.getElement().querySelectorAll(`.films-list--extra .films-list__container`));

    this._siteFilmsExtraElement.forEach((elem) => {
      // Залепуха
      if (elem.parentElement.classList.contains(`films-list--top`)) {
        filmsTop
          .slice(0, Math.min(FILM_COUNT_EXTRA, filmsTop.length))
          .forEach((film) => {
            this._renderFilm(film, elem);
          });
      } else {
        filmMostComments
          .slice(0, Math.min(FILM_COUNT_EXTRA, filmsTop.length))
          .forEach((film) => {
            this._renderFilm(film, elem);
          });
      }
    });
  }

  _renderNoFilms() {
    // Метод для рендеринга заглушки при отсутствии фильмов
    render(this._filmsContainerComponent, this._filmEmptyComponent, RenderPosition.AFTERBEGIN);
  }

  _handleShowButtonClick() {
    // Метод с логикой кнопки Show Button
    if (this._renderedFilmsCount < this._films.length) {
      this._renderFilms(this._renderedFilmsCount, this._renderedFilmsCount + FILM_COUNT_ALL, this._siteFilmsAllContainerElement);
      this._renderedFilmsCount += FILM_COUNT_ALL;

      if (this._renderedFilmsCount >= this._films.length) {
        remove(this._showButtonComponent);
      }
    }
  }

  _renderShowButton() {
    // Метод c отрисовкой кнопки Show Button
    render(this._siteFilmsAllElement, this._showButtonComponent, RenderPosition.BEFOREEND);
    this._showButtonComponent.setClickHandler(this._handleShowButtonClick);
  }
}

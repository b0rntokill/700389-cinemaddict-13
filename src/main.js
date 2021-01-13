import ProfileView from "./view/profile";
import NavigationView from "./view/navigation";
import SortView from "./view/sort";
import FilmEmptyView from "./view/film-empty";
import FilmsContainerView from "./view/filmsContainer";
import FilmsListView from "./view/films-list";
import FilmsTopView from "./view/films-top";
import FilmsCommentsView from "./view/films-comments";
import FooterStatisticView from "./view/footer-statistics";
import ShowButtonView from "./view/showButton";
import FilmCardView from "./view/film-card";
import PopupView from "./view/popup";
import {filmCards} from "./mock/task";
import {navigation} from "./mock/navigation";
import {RenderPosition, render} from "./utils";

const FILM_COUNT_ALL = 5;
const FILM_COUNT_EXTRA = 2;

// Сортируем для отрисовки топовых и комментируемых
const filmsTop = filmCards.slice().sort((a, b) => b.film_info.total_rating - a.film_info.total_rating);
const filmMostComments = filmCards.slice().sort((a, b) => b.comments.length - a.comments.length);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

// Будем создавать сразу и форму малую фильма и попап от неё (такое себе решение, но мы пока делаем каку, чтобы научиться)
const renderFilm = (filmListElement, film) => {
  const filmComponent = new FilmCardView(film);
  const popupComponent = new PopupView(film);

  const showPopup = () => {
    siteMainElement.appendChild(popupComponent.getElement());
  };

  const closePopup = () => {
    siteMainElement.removeChild(popupComponent.getElement());
  };

  const onEscClosePopup = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      closePopup();
      document.removeEventListener(`keydown`, onEscClosePopup);
    }
  };

  const onClickOpenPopup = () => {
    showPopup();
    document.addEventListener(`keydown`, onEscClosePopup);
  };

  Array.from(filmComponent.getElement().querySelectorAll(`.film-card__poster, .film-card__title, .film-card__comments`))
    .forEach((selector) => selector.addEventListener(`click`, onClickOpenPopup));

  popupComponent.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, () => {
    closePopup();
  });

  render(filmListElement, filmComponent.getElement(), RenderPosition.BEFOREEND);
};

render(siteHeaderElement, new ProfileView().getElement(), RenderPosition.BEFOREEND);

const renderFilmsList = (mainContainer, filmsArr, navArr) => {
  const filmsContainer = new FilmsContainerView();

  render(mainContainer, new NavigationView(navArr).getElement(), RenderPosition.AFTERBEGIN);

  // А вот тута опишем случай когда нет фильмов в базе у юзверя
  if (filmsArr.length === 0) {
    render(mainContainer, filmsContainer.getElement(), RenderPosition.BEFOREEND);
    render(filmsContainer.getElement(), new FilmEmptyView().getElement(), RenderPosition.AFTERBEGIN);
    return;
  } else {
    render(mainContainer, new SortView().getElement(), RenderPosition.BEFOREEND);
    render(mainContainer, filmsContainer.getElement(), RenderPosition.BEFOREEND);

    render(filmsContainer.getElement(), new FilmsListView().getElement(), RenderPosition.AFTERBEGIN);

    const siteFilmsAllElement = filmsContainer.getElement().querySelector(`.films-list--all`);

    const siteFilmsAllContainerElement = filmsContainer.getElement().querySelector(`.films-list--all .films-list__container`);

// Math.min чтобы не пытаться рисовать 5 задач, если их меньше

    filmCards
      .slice(0, Math.min(FILM_COUNT_ALL, filmCards.length))
      .forEach((film) => renderFilm(siteFilmsAllContainerElement, film));

// Как бэ кнопка для отрисовки доп карточек, своими силами.

    if (filmCards.length > FILM_COUNT_ALL) {
      const showButton = new ShowButtonView();
      let renderedFilmsCount = FILM_COUNT_ALL;

      showButton.getElement().addEventListener(`click`, (evt) => {
        evt.preventDefault();
        if (renderedFilmsCount < filmCards.length) {

          filmCards
            .slice(renderedFilmsCount, renderedFilmsCount + FILM_COUNT_ALL)
            .forEach((task) => renderFilm(siteFilmsAllContainerElement, task));

          renderedFilmsCount += FILM_COUNT_ALL;

          if (renderedFilmsCount >= filmCards.length) {
            showButton.getElement().remove();
            showButton.removeElement();
          }
        }
      });

      render(siteFilmsAllElement, showButton.getElement(), RenderPosition.BEFOREEND);
    }

    render(filmsContainer.getElement(), new FilmsTopView().getElement(), RenderPosition.BEFOREEND);
    render(filmsContainer.getElement(), new FilmsCommentsView().getElement(), RenderPosition.BEFOREEND);

    const siteFilmsExtraElement = Array.from(filmsContainer.getElement().querySelectorAll(`.films-list--extra .films-list__container`));

    siteFilmsExtraElement.forEach((elem) => {
      // Залепуха
      if (elem.parentElement.classList.contains(`films-list--top`)) {
        filmsTop
          .slice(0, Math.min(FILM_COUNT_EXTRA, filmsTop.length))
          .forEach((film) => {
            renderFilm(elem, film);
          });
      } else {
        filmMostComments
          .slice(0, Math.min(FILM_COUNT_EXTRA, filmsTop.length))
          .forEach((film) => {
            renderFilm(elem, film);
          });
      }
    });
  }
};

renderFilmsList(siteMainElement, filmCards, navigation);

render(siteFooterElement, new FooterStatisticView(filmCards).getElement(), RenderPosition.BEFOREEND);

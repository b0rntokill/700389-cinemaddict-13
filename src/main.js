import {createProfileTemplate} from "./view/profile";
import {createNavigationTemplate} from "./view/navigation";
import {createSortTemplate} from "./view/sort";
import {createFilmsContainerTemplate} from "./view/filmsContainer";
import {createFilmsListTemplate} from "./view/films-list";
import {createFilmsTopTemplate} from "./view/films-top";
import {createFilmsCommentsTemplate} from "./view/films-comments";
import {createFooterStatisticsTemplate} from "./view/footer-statistics";
import {createShowButtonTemplate} from "./view/showButton";
import {createFilmCardTemplate} from "./view/film-card";
import {createPopupTemplate} from "./view/popup";
import {filmCards} from "./mock/task";
import {navigation} from "./mock/navigation";

const FILM_COUNT_ALL = 5;
const FILM_COUNT_EXTRA = 2;

// Сортируем для отрисовки топовых и комментируемых
const filmsTop = filmCards.slice().sort((a, b) => b.film_info.total_rating - a.film_info.total_rating);
const filmMostComments = filmCards.slice().sort((a, b) => b.comments.length - a.comments.length);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

render(siteHeaderElement, createProfileTemplate(), `beforeend`);

render(siteMainElement, createNavigationTemplate(navigation), `afterbegin`);
render(siteMainElement, createSortTemplate(), `beforeend`);
render(siteMainElement, createFilmsContainerTemplate(), `beforeend`);

const siteFilmsContainerElement = document.querySelector(`.films`);

render(siteFilmsContainerElement, createFilmsListTemplate(), `afterbegin`);

const siteFilmsAllElement = siteFilmsContainerElement.querySelector(`.films-list--all`);

const siteFilmsAllContainerElement = siteFilmsContainerElement.querySelector(`.films-list--all .films-list__container`);

// Math.min чтобы не пытаться рисовать 5 задач, если их меньше

for (let i = 0; i < Math.min(FILM_COUNT_ALL, filmCards.length); i++) {
  render(siteFilmsAllContainerElement, createFilmCardTemplate(filmCards[i]), `beforeend`);
}

// Как бэ кнопка для отрисовки доп карточек, своими силами.

if (filmCards.length > FILM_COUNT_ALL) {
  render(siteFilmsAllElement, createShowButtonTemplate(), `beforeend`);

  const showButton = document.querySelector(`.films-list__show-more`);

  let renderedFilmsCount = FILM_COUNT_ALL;

  showButton.addEventListener(`click`, function (evt) {
    evt.preventDefault();
    if (renderedFilmsCount < filmCards.length) {

      filmCards
        .slice(renderedFilmsCount, renderedFilmsCount + FILM_COUNT_ALL)
        .forEach((task) => render(siteFilmsAllContainerElement, createFilmCardTemplate(task), `beforeend`));

      renderedFilmsCount += FILM_COUNT_ALL;

      renderedFilmsCount >= filmCards.length ? showButton.remove() : ``;
    }
  });
}


render(siteFilmsContainerElement, createFilmsTopTemplate(), `beforeend`);
render(siteFilmsContainerElement, createFilmsCommentsTemplate(), `beforeend`);

const siteFilmsExtraElement = Array.from(siteFilmsContainerElement.querySelectorAll(`.films-list--extra .films-list__container`));

siteFilmsExtraElement.forEach((elem) => {
  // Залепуха
  if (elem.parentElement.classList.contains(`films-list--top`)) {
    for (let i = 0; i < FILM_COUNT_EXTRA; i++) {
      render(elem, createFilmCardTemplate(filmsTop[i]), `beforeend`);
    }
  } else {
    for (let i = 0; i < FILM_COUNT_EXTRA; i++) {
      render(elem, createFilmCardTemplate(filmMostComments[i]), `beforeend`);
    }
  }
});

render(siteFooterElement, createFooterStatisticsTemplate(filmCards), `beforeend`);
render(siteFooterElement, createPopupTemplate(filmCards[0]), `afterend`);

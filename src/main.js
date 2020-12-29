import {createProfileTemplate} from "./view/profile";
import {createNavigationTemplate} from "./view/navigation";
import {createSortTemplate} from "./view/sort";
import {createFilmsContainerTemplate} from "./view/filmsContainer";
import {createFilmsListTemplate} from "./view/films-list";
import {createFilmsTopTemplate} from "./view/films-top";
import {createFilmsCommentsTemplate} from "./view/films-comments";
import {createStatisticsTemplate} from "./view/statistics";
import {createShowButtonTemplate} from "./view/showButton";
import {createFilmCardTemplate} from "./view/card";
import {createPopupTemplate} from "./view/popup";

const FILM_COUNT_ALL = 5;
const FILM_COUNT_EXTRA = 2;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

render(siteHeaderElement, createProfileTemplate(), `beforeend`);

render(siteMainElement, createNavigationTemplate(), `afterbegin`);
render(siteMainElement, createSortTemplate(), `beforeend`);
render(siteMainElement, createFilmsContainerTemplate(), `beforeend`);

const siteFilmsContainerElement = document.querySelector(`.films`);

render(siteFilmsContainerElement, createFilmsListTemplate(), `afterbegin`);

const siteFilmsAllElement = siteFilmsContainerElement.querySelector(`.films-list--all`);

const siteFilmsAllContainerElement = siteFilmsContainerElement.querySelector(`.films-list--all .films-list__container`);

for (let i = 0; i < FILM_COUNT_ALL; i++) {
  render(siteFilmsAllContainerElement, createFilmCardTemplate(), `beforeend`);
}

render(siteFilmsAllElement, createShowButtonTemplate(), `beforeend`);

render(siteFilmsContainerElement, createFilmsTopTemplate(), `beforeend`);
render(siteFilmsContainerElement, createFilmsCommentsTemplate(), `beforeend`);

const siteFilmsExtraElement = Array.from(siteFilmsContainerElement.querySelectorAll(`.films-list--extra .films-list__container`));

siteFilmsExtraElement.forEach((elem) => {
  for (let i = 0; i < FILM_COUNT_EXTRA; i++) {
    render(elem, createFilmCardTemplate(), `beforeend`);
  }
});

render(siteFooterElement, createStatisticsTemplate(), `beforeend`);
// render(siteFooterElement, createPopupTemplate(), `afterend`);

import ProfileView from "./view/profile";
import NavigationView from "./view/navigation";
import FooterStatisticView from "./view/footer-statistics";
import {filmCards} from "./mock/task";
import {navigation} from "./mock/navigation";
import {RenderPosition, render} from "./utils/render";
import MovieList from "./presenter/movie-list";

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

render(siteHeaderElement, new ProfileView(), RenderPosition.BEFOREEND);
render(siteMainElement, new NavigationView(navigation), RenderPosition.AFTERBEGIN);

const MovieListPresenter = new MovieList(siteMainElement);

MovieListPresenter.init(filmCards);

render(siteFooterElement, new FooterStatisticView(filmCards), RenderPosition.BEFOREEND);

import {createElement} from "../utils";

const createNavItemTemplate = (nav) => {
  const {name, count} = nav;

  const getFormatLetter = (text) => {
    return `${text[0].toUpperCase()}${text.slice(1)} `;
  };

  return `<a href="#${name}" class="main-navigation__item">${getFormatLetter(name)}
        <span class="main-navigation__item-count">${count}</span>
    </a>`;
};

const createNavigationTemplate = (navArr) => {

  const navItemsTemplates = navArr.map((nav) => createNavItemTemplate(nav)).join(``);

  return `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        ${navItemsTemplates}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`;
};

export default class NavigationView {
  constructor(navigation) {
    this._element = null;
    this._navigation = navigation;
  }

  getTemplate() {
    return createNavigationTemplate(this._navigation);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}


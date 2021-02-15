import AbstractView from "./abstract";

const createFilmsContainerTemplate = () => {
  return `<section class="films"></section>`;
};

export default class FilmsContainerView extends AbstractView {
  getTemplate() {
    return createFilmsContainerTemplate();
  }
}

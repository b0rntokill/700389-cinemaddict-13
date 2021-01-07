import {filmCards} from "./task";

const filmsToNavMap = {
  watchlist: (tasks) => tasks.filter((task) => task.user_details.watchlist === true).length,
  favorite: (tasks) => tasks.filter((task) => task.user_details.favorite === true).length,
  history: (tasks) => tasks.filter((task) => task.user_details.already_watched === true).length,
};

const generateNavigations = (tasks) => {
  return Object.entries(filmsToNavMap).map(([navName, countFilms]) => {
    return {
      name: navName,
      count: countFilms(tasks)
    };
  });
};

const navigation = generateNavigations(filmCards);

export {navigation};

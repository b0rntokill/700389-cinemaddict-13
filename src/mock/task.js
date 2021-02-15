import {variables} from "../const";
import {getRandomArrayValue, getRandomArrayValues, getRandomInteger} from "../utils/common";

const getRandomDescription = (text) => {
  // Регулярка для сбора и поиска предложений в тексте.
  const reg = /[^\.!\?]+[\.!\?]+["']?/g;
  const arraySuggestions = (text.match(reg)).map((it) => it.trim());
  const randomSuggestionsCount = getRandomInteger(variables.MIN_DESCRIPTION, variables.SUGGESTIONS_COUNT);
  return new Array(randomSuggestionsCount).fill(``).map(() => getRandomArrayValue(arraySuggestions)).join(` `);
};

const getRandomRating = (min = variables.MIN_RATING, max = variables.MAX_RATING) => {
  // т.к. .toFixed(2) возвращает строку, потому и преобразуем к числу)
  let rating = Number((min + Math.random() * (max - min + 1)).toFixed(1));
  return rating > variables.MAX_RATING ? rating = variables.MAX_RATING : rating;
};

const getRandomDate = (maxDaysGap, maxHoursGap) => {
  const daysGap = getRandomInteger(-maxDaysGap, 0);
  const hoursGap = getRandomInteger(-maxHoursGap, 0);
  const currentDate = new Date();

  currentDate.setDate(currentDate.getDate() + daysGap);
  currentDate.setHours(currentDate.getHours() + hoursGap);

  return new Date(currentDate);
};

const getRandomComment = (index) => {
  return {
    id: index,
    author: getRandomArrayValue(variables.AUTHORS),
    comment: getRandomArrayValue(variables.COMMENTS),
    date: getRandomDate(variables.MAX_DAYS_GAP, variables.MAX_HOURS_GAP),
    emotion: getRandomArrayValue(variables.EMOJIS),
  };
};

const getRandomComments = () => {
  const commentsCount = getRandomInteger(variables.MIN_COMMENTS, variables.MAX_COMMENTS);
  return new Array(commentsCount).fill(``).map((el, index) => getRandomComment(index + 1));
};

const generateFilmCard = (index) => {
  return {
    id: index,
    comments: getRandomComments(),
    film_info: {
      title: getRandomArrayValue(variables.FILMS_TITLES),
      alternative_title: getRandomArrayValue(variables.FILMS_TITLES),
      total_rating: getRandomRating(),
      poster: getRandomArrayValue(variables.FILMS_POSTERS),
      age_rating: getRandomArrayValue(variables.RATINGS),
      director: getRandomArrayValue(variables.DIRECTORS),
      writers: getRandomArrayValues(variables.DIRECTORS, variables.MIN_WRITERS, variables.MAX_WRITERS),
      actors: getRandomArrayValues(variables.ACTORS, variables.MIN_ACTORS, variables.MAX_ACTORS),
      release: {
        date: getRandomDate(variables.MAX_DAYS_GAP, variables.MAX_HOURS_GAP),
        release_country: getRandomArrayValues(variables.COUNTRIES, variables.MIN_COUNTRY, variables.MAX_COUNTRY),
      },
      runtime: getRandomInteger(variables.MIN_DURATION, variables.MAX_DURATION),
      genre: getRandomArrayValues(variables.GENRES, variables.MIN_GENRES, variables.MAX_GENRES),
      description: getRandomDescription(variables.TEXT_MOCKS),
    },
    user_details: {
      watchlist: Boolean(getRandomInteger()),
      already_watched: Boolean(getRandomInteger()),
      watching_date: getRandomDate(),
      favorite: Boolean(getRandomInteger()),
    }
  };
};

const filmCards = new Array(variables.MAX_FILM_CARD).fill(``).map((el, index) => generateFilmCard(index + 1));

export {filmCards};

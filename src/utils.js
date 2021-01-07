import {variables} from "./const";

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomArrayValue = (array) => {
  return array[getRandomInteger(0, array.length - 1)];
};

const getRandomArrayValues = (array, min, max) => {
  const counter = getRandomInteger(min, max);
  const genres = new Array(counter).fill(``).map(() => {
    return getRandomArrayValue(array);
  });
  return Array.from(new Set(genres));
};

const getDurationFormat = (duration) => {
  let formatTime;
  if (duration > variables.MIN_IN_HOUR) {
    const hours = Number.parseInt(duration / variables.MIN_IN_HOUR);
    let minutes = Math.round((duration / variables.MIN_IN_HOUR - Number.parseInt(duration / variables.MIN_IN_HOUR)) * variables.MIN_IN_HOUR);
    minutes < 10 ? minutes = `${`0` + minutes}` : minutes;
    formatTime = `${hours}${variables.HOUR_FORMAT} ${minutes}${variables.MINUTE_FORMAT}`;
  } else {
    formatTime = `${duration}${variables.MINUTE_FORMAT}`;
  }

  return formatTime;
};

const getCommentTimeFormat = (date) => {
  let formatTime;
  const diff = Math.round((new Date() - date) / 1000);
  console.log(variables.SECOND_IN_DAY);
  console.log(date);
  console.log(diff);

  if (diff < variables.SECOND_IN_DAY) {
    formatTime = `today`;
  }

  if (diff >= variables.SECOND_IN_DAY && diff <= variables.SECOND_IN_DAY * 2) {
    formatTime = `2 days ago`;
  }

  if (diff >= variables.SECOND_IN_DAY * 2 && diff <= variables.SECOND_IN_DAY * 3) {
    formatTime = `3 days ago`;
  }

  if (diff >= variables.SECOND_IN_DAY * 3 && diff <= variables.SECOND_IN_DAY * 4) {
    formatTime = `4 days ago`;
  }

  if (diff >= variables.SECOND_IN_DAY * 4 && diff <= variables.SECOND_IN_DAY * 5) {
    formatTime = `5 days ago`;
  }

  if (diff >= variables.SECOND_IN_DAY * 5 && diff <= variables.SECOND_IN_DAY * 6) {
    formatTime = `6 days ago`;
  }

  if (diff >= variables.SECOND_IN_DAY * 6 && diff <= variables.SECOND_IN_DAY * 7) {
    formatTime = `7 days ago`;
  }

  if (diff > variables.SECOND_IN_DAY * 7) {
    formatTime = date.toLocaleDateString(`en-ZA`, variables.COMMENT_DATE_OPTIONS).replace(`,`,``);
  }

  return formatTime;
};

export {getRandomArrayValue, getRandomArrayValues, getRandomInteger, getDurationFormat, getCommentTimeFormat};

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

export {
  getRandomArrayValue,
  getRandomArrayValues,
  getRandomInteger
};

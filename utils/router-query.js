import { createHashHistory } from "react-router";

/**
 * @param {Object} query
 */
export const addQuery = (query) => {
  const location = Object.assign({}, createHashHistory.getCurrentLocation());
  Object.assign(location.query, query);
  createHashHistory.push(location);
};

/**
 * @param {Object} query
 */
export const replaceQuery = (query) => {
  const location = Object.assign({}, createHashHistory.getCurrentLocation());
  Object.assign(location.query, query);
  createHashHistory.replace(location);
};

/**
 * @param {...String} queryNames
 */
export const removeQuery = (...queryNames) => {
  console.log(createHashHistory);
  // const location = Object.assign({}, browserHistory.getCurrentLocation());
  // queryNames.forEach((q) => delete location.query[q]);
  // browserHistory.push(location);
};

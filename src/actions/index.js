import * as types from "./types";

export const initFilters = filters => ({
  type: types.INIT_FILTERS,
  filters
});

export const setFilter = filter => ({
  type: types.SET_FILTER,
  filter
});

export const reset = () => ({
  type: types.RESET
});

export const setPage = page => ({
  type: types.SET_PAGE,
  page
});

export const scroll = stopIndex => ({
  type: types.SCROLL,
  stopIndex
});

export const reload = () => ({
  type: types.RELOAD
});

import * as types from "../actions/types";

const filters = (state = {}, action) => {
  switch (action.type) {
    case types.INIT_FILTERS:
      return {
        ...state,
        accountNames: action.filters.accountNames,
        transactionTypes: action.filters.transactionTypes,
        scrollToIndex: 0,
        page: 1
      };
    case types.SET_FILTER:
      const name = action.filter.target.name;
      const accountName = state.accountNames.find(
        element => element.name === name
      );
      if (accountName) {
        accountName.selected = !accountName.selected;
      }

      const transactionType = state.transactionTypes.find(
        element => element.name === name
      );
      if (transactionType) {
        transactionType.selected = !transactionType.selected;
      }
      return {
        ...state,
        accountNames: [...state.accountNames],
        transactionTypes: [...state.transactionTypes]
      };
    case types.RESET:
      return {
        ...state,
        accountNames: state.accountNames.map(item => ({
          name: item.name,
          selected: false
        })),
        transactionTypes: state.transactionTypes.map(item => ({
          name: item.name,
          selected: false
        })),
        scrollToIndex: 0,
        page: 1
      };
    case types.SET_PAGE:
      return {
        ...state,
        page: action.page,
        scrollToIndex: (action.page - 1) * 30
      };
    case types.RELOAD:
      return {
        ...state,
        scrollToIndex: undefined
      };
    case types.SCROLL:
      return {
        ...state,
        page: Math.ceil(action.stopIndex / 30),
        scrollToIndex: undefined
      };
    default:
      return state;
  }
};

export default filters;

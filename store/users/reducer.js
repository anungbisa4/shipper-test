import types from './types'

const initialState = {
  data: null,
  pageData: null,
  totalPage: 1,
  page: 1
}

export default function reducer(state= initialState, action) {
  switch (action.type) {
    case types["users/getUsers"]:
      return { ...state, data: action.payload };
    case types["users/getFirstPage"]:
      return { ...state, pageData: action.payload, isSearch: false };
    case types["users/getNextPage"]:
      return { ...state, pageData: action.payload };
    case types["users/searchDriver"]:
      return { ...state, pageData: action.payload, isSearch: true };
    case types["users/getPreviousPage"]:
      return { ...state, pageData: action.payload };
    case types["users/totalPage"]:
      return { ...state, totalPage: action.payload };
    case types["users/nextPage"]:
      return { ...state, page: state.page + 1 };
    case types["users/previousPage"]:
      return { ...state, page: state.page - 1 };
    case types["users/pageFirst"]:
      return { ...state, page: 1 };
    default:
      return state;
  }
}
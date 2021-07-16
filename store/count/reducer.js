import types from './types'

const initialState = {
  count: 1
}

export default function reducer(state= initialState, action) {
  switch (action.type) {
    case types["count/addCount"]:
      return { ...state, count: action.payload };
    case types["count/removeCount"]:
      return { ...state, count: action.payload };
    case types["count/clearCount"]:
      return { ...state, count: 1 };
    default:
      return state;
  }
}
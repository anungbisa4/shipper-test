import { combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import count from "@/store/count/reducer";

const combineReducer = combineReducers({
  count,
});

const reducer = (state, action) => {
  // console.log(state, action);
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    // console.log("HYDRATE", nextState);
    // if (state.count.count) nextState.count.count = state.count.count; // preserve count value on client side navigation
    return nextState;
  } else {
    // console.log("ELSE");
    return combineReducer(state, action);
  }
};

export default reducer;

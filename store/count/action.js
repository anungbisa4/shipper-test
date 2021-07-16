import types from "./types";

const dispatchAddCount = (payload) => {
  return {
    type: types["count/addCount"],
    payload,
  };
};

const dispatchRemoveCount = (payload) => {
  return {
    type: types["count/removeCount"],
    payload,
  };
};

export const addCount = (payload) => {
  return (dispatch) => {
    dispatch(dispatchAddCount(payload));
  };
};

export const removeCount = (payload) => {
  return (dispatch) => {
    dispatch(dispatchRemoveCount(payload));
  };
};

export const clearCount = () => {
  return (dispatch) => {
    dispatch({
      type: types["count/clearCount"],
    });
  };
};

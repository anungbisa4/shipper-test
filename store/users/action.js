import types from "./types";
import { fetcher } from "@/utils/requestApi";

export const getUsers = (results) => {
  return (dispatch) => {
    fetcher(`https://randomuser.me/api?results=${results}`)
      .then((res) => {
        dispatch({
          type: types["users/getUsers"],
          payload: res.results,
        });
        dispatch({
          type: types["users/totalPage"],
          payload: res.results.length / 5,
        });
        getFirstPage(res.results, dispatch);
      })
      .catch((err) => {
        dispatch({
          type: types["users/getUsers"],
          payload: null,
        });
      });
  };
};

export const getNextPage = (users, pageBefore, pageAfter) => {
  let results = users.filter((element, index) => {
    return index > pageBefore * 5 && index < pageAfter * 5;
  });
  return dispatch => {
    dispatch({
      type: types["users/getNextPage"],
      payload: results,
    });
  }
};
export const getPreviousPage = (users, pageBefore, pageAfter) => {
  let results = users.filter((element, index) => {
    if (pageAfter === 1) {
      return index < 5;
    }
    return index > ((pageAfter - 1) * 5) && index < ((pageBefore - 1) * 5);
  });
  return (dispatch) => {
    dispatch({
      type: types["users/getPreviousPage"],
      payload: results,
    });
  };
};

export const setPage = (type) => {
  return (dispatch) => {
    dispatch({
      type: types[`users/${type}`],
    });
  };
};

export const getFirstPage = (users, dispatch) => {
  let pageOne = users.filter((element, index) => {
    return index < 5;
  });
  if (dispatch) {
    return dispatchFirstPage(dispatch, pageOne);
  }
  return (dispatch) => {
    dispatchFirstPage(dispatch, pageOne);
  };
};

const dispatchFirstPage = (dispatch, payload) => {
   return dispatch({
     type: types["users/getFirstPage"],
     payload,
   });
}

export const searchDriver = (users, name) => {
  return (dispatch) => {
    let results = users.filter((element, index) => {
      const regex = new RegExp(`(${element?.name?.first})`, "i");

      return regex.test(name);;
    });
      dispatch({
        type: types["users/searchDriver"],
        payload: results,
      });
    };
};


import { useMemo } from "react"
import { createStore, applyMiddleware } from "redux";
import { createWrapper } from "next-redux-wrapper";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { persistReducer, persistStore } from "redux-persist";
// import storage from "redux-persist/lib/storage"
import storageSession from 'redux-persist/lib/storage/session'
// import localforage from "localforage";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";

import reducer from "@/store/combineReducer";

const logger = createLogger({});
const persistConfig = {
  key: "root_primary",
  storage: storageSession,
  stateReconciler: hardSet,
  whitelist: ["count"],
};

const persistedReducer = persistReducer(persistConfig, reducer)

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const makeStore = ({ isServer }) => {
  if (isServer) {
    //If it's on server side, create a store
    console.log('on server store')
    return createStore(reducer, bindMiddleware([thunkMiddleware]));
  } else {


     // Creating the store again
    let store;
    if (process.env.NODE_ENV !== "production") {
      store = createStore(persistedReducer, bindMiddleware([thunkMiddleware, logger]));
    } else {
      store = createStore(persistedReducer, bindMiddleware([thunkMiddleware]));
    }

    store.__persistor = persistStore(store); // This creates a persistor object & push that persisted object to .__persistor, so that we can avail the persistability feature

    return store;
  }
};

export const wrapper = createWrapper(makeStore);

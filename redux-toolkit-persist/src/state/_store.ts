import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction
} from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  FLUSH,
  getStoredState,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE
} from "redux-persist";
import persistStore from "redux-persist/lib/persistStore";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import counter from "./counter.slice";

/**
 * @see https://daverivera90.medium.com/sharing-state-between-browser-tabs-with-redux-68899eb88fb7
 */
const crossBrowserListener = (store: any, persistConfig: any) => {
  console.log("crossBrowserListener", { store, persistConfig });
  return async function () {
    let state = await getStoredState(persistConfig);
    store.dispatch({
      type: REHYDRATE,
      key: persistConfig.key,
      payload: state,
    });
  };
};

/**
 * @see https://github.com/fazlulkarimweb/with-next-redux-wrapper-redux-persist/blob/master/store/sync_storage.js
 */
const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: string) {
      return Promise.resolve(value);
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const reducer = combineReducers({ counter });

const persistConfig = {
  key: "champ_land",
  timeout: 100,
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export type AppStore = typeof store;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const persistor = persistStore(store);
export const useAppSeletor: TypedUseSelectorHook<AppState> = useSelector;
export const useAppDispatch = useDispatch;
export default store
if (typeof window !== "undefined") {
  window.addEventListener(
    "storage",
    crossBrowserListener(store, persistConfig)
  );
}

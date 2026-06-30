import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import localForage from "localforage";
import { encryptTransform } from "redux-persist-transform-encrypt";
import { createLogger } from "redux-logger";

import { isDev } from "@utils/helpers/HelperBrowser";
import rootReducer from "./reducer";

const persistedReducer = persistReducer(
  {
    key: "root",
    storage: localForage,
    transforms: [
      encryptTransform({
        secretKey: process.env.NEXT_PUBLIC_APPKEY ?? "some-secret",
      }),
    ],
  },
  rootReducer
);

const logger = createLogger({
  collapsed: true,
});

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    });

    return isDev ? middleware.concat(logger) : middleware;
  },
  devTools: isDev,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default function configureReduxStore() {
  return {
    store,
    persistor,
  };
}
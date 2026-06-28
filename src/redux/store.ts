import { applyMiddleware, createStore, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import localForage from "localforage";
import { createLogger } from "redux-logger";
import { encryptTransform } from "redux-persist-transform-encrypt";
import { isClient, isDev } from "@utils/helpers/HelperBrowser";
import rootReducer from "./reducer";

const persistedReducer = persistReducer(
  {
    key: "root",
    storage: localForage,
    transforms: [
      encryptTransform({
        secretKey: process?.env?.NEXT_PUBLIC_APPKEY ?? "some-secret",
      }),
    ],
  },
  rootReducer
);

const store = createStore(
  isClient ? persistedReducer : rootReducer,
  {},
  isDev
    ? compose(applyMiddleware(createLogger({ collapsed: true })))
    : compose()
);

const persistor = persistStore(store);

export default function configureReduxStore() {
  return {
    store,
    persistor,
  };
}

import { legacy_createStore as createStore, applyMiddleware } from "redux";
import Thunk from "redux-thunk";
import { rootReducer } from "./rootReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "pokemon",
  storage,
  blacklist: ['generationByIdReducer']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(Thunk));
const persistor = persistStore(store);

export { persistor };

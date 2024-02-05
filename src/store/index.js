import { applyMiddleware, createStore } from "redux";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import { isAuthReducer } from "./reducers/auth-reducer";
import { languageReducer } from "./reducers/language-reducer";
import { boxesReducer } from "./reducers/boxes-reducer";
import { suportReducer } from "./reducers/suport-reducer";
import { workerReducer } from "./reducers/worker-reducer";
import { historyReducer } from "./reducers/history-reducer";

const rootReducer = combineReducers({
  auth: isAuthReducer,
  lang: languageReducer,
  box: boxesReducer,
  suport: suportReducer,
  worker: workerReducer,
  history: historyReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

import { applyMiddleware, createStore } from "redux";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import { isAuthReducer } from "./reducers/auth-reducer";
import { languageReducer } from "./reducers/language-reducer";

const rootReducer = combineReducers({
  auth: isAuthReducer,
  lang: languageReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

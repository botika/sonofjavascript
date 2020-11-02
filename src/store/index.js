import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

import * as THEME from "./theme";
import * as GENERATION from "./generation";

export const middleware = applyMiddleware(thunk);
export default function store() {
  return createStore(
    combineReducers({ generation: GENERATION.reducer, theme: THEME.reducer }),
    composeWithDevTools(middleware)
  );
}

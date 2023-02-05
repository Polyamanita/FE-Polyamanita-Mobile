import { combineReducers, createStore } from "redux";
import Reducer from "./reducers/reducer";

const rootReducer = combineReducers({
  userData: Reducer,
});

export const store = createStore(rootReducer);
export type ReduxStore = ReturnType<typeof rootReducer>;

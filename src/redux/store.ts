import { combineReducers, createStore } from "redux";
import AccountReducer from "./reducers/account-reducer";
import JournalReducer from "./reducers/journal-reducer";

const rootReducer = combineReducers({
  userData: AccountReducer,
  journalData: JournalReducer,
});

export const store = createStore(rootReducer);
export type ReduxStore = ReturnType<typeof rootReducer>;

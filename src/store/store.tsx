// src/store/store.js
import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import breedReducer from "./breeds/reducers";
import kennelReducer from "./kennels/reducers";

// Combine reducers to handle multiple slices of state
const rootReducer = combineReducers({
	breed: breedReducer,
	kennel: kennelReducer,
});

// Create the Redux store with the combined reducer
const store = createStore(rootReducer, composeWithDevTools());

// Export the RootState type for TypeScript
export type RootState = ReturnType<typeof store.getState>;

export default store;

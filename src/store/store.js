// src/store/store.js
import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import breedReducer from "./breeds/reducers"; // assuming you have breed reducers
import kennelReducer from "./kennels/reducers"; // assuming you have kennel reducers

// Combine reducers to handle multiple slices of state
const rootReducer = combineReducers({
	breed: breedReducer,
	kennel: kennelReducer,
});

// Create the Redux store with the combined reducer
const store = createStore(rootReducer, composeWithDevTools());

export default store;

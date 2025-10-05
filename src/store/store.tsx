// src/store/store.js
import { createStore, combineReducers } from "redux";
import breedReducer from "./breeds/reducers";
import dogOfTheDayReducer from "./dogOfTheDay/reducers";
import {
	loadDogOfTheDayState,
	isStateValidForToday,
	saveDogOfTheDayState,
} from "./dogOfTheDay/persistence";
import { setDogOfTheDay, setLastFetchDate } from "./dogOfTheDay/actions";

// Simple test reducer
const testReducer = (state = { test: "working" }, action: any) => {
	return state;
};

// Combine reducers to handle multiple slices of state
const rootReducer = combineReducers({
	test: testReducer,
	// breed: breedReducer,
	// kennel: kennelReducer,
	dogOfTheDay: dogOfTheDayReducer,
});

// Create the Redux store with the combined reducer
const store = createStore(rootReducer);

const persistedDogOfTheDayState = loadDogOfTheDayState();

if (
	persistedDogOfTheDayState &&
	isStateValidForToday(persistedDogOfTheDayState) &&
	persistedDogOfTheDayState.dog
) {
	store.dispatch(setDogOfTheDay(persistedDogOfTheDayState.dog));
	store.dispatch(setLastFetchDate(persistedDogOfTheDayState.lastFetchDate));
}

// Subscribe to store changes to persist dog of the day state
store.subscribe(() => {
	const state = store.getState();
	if (state.dogOfTheDay) {
		saveDogOfTheDayState(state.dogOfTheDay);
	}
});

// Export the RootState type for TypeScript
export type RootState = ReturnType<typeof store.getState>;

export default store;

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

// Combine reducers to handle multiple slices of state
const rootReducer = combineReducers({
	// breed: breedReducer,
	// kennel: kennelReducer,
	dogOfTheDay: dogOfTheDayReducer,
});

// Create the Redux store with the combined reducer and Redux DevTools
const store = createStore(
	rootReducer,
	(window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

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

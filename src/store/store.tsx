// src/store/store.js
import { createStore, combineReducers } from "redux";
import dogOfTheDayReducer from "./dogOfTheDay/reducers";
import shopReducer from "./shop/reducers";
import {
	loadDogOfTheDayState,
	isStateValidForToday,
	saveDogOfTheDayState,
} from "./dogOfTheDay/persistence";
import { setDogOfTheDay, setDogsOfTheDay, setLastFetchDate } from "./dogOfTheDay/actions";
import { loadCartState, saveCartState } from "./shop/persistence";
import { fetchCartSuccess } from "./shop/actions";

// Combine reducers to handle multiple slices of state
const rootReducer = combineReducers({
	// breed: breedReducer,
	// kennel: kennelReducer,
	dogOfTheDay: dogOfTheDayReducer,
	shop: shopReducer,
});

// Create the Redux store with the combined reducer and Redux DevTools
const store = createStore(
	rootReducer,
	(window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

const persistedDogOfTheDayState = loadDogOfTheDayState();

if (
    persistedDogOfTheDayState &&
    isStateValidForToday(persistedDogOfTheDayState)
) {
    if (persistedDogOfTheDayState.dogs && persistedDogOfTheDayState.dogs.length > 0) {
        store.dispatch(setDogsOfTheDay(persistedDogOfTheDayState.dogs));
        store.dispatch(setDogOfTheDay(persistedDogOfTheDayState.dogs[0]));
    } else if (persistedDogOfTheDayState.dog) {
        store.dispatch(setDogOfTheDay(persistedDogOfTheDayState.dog));
    }
    store.dispatch(setLastFetchDate(persistedDogOfTheDayState.lastFetchDate));
}

// Load persisted cart state
const persistedCartState = loadCartState();
if (persistedCartState && persistedCartState.items && persistedCartState.items.length > 0) {
	store.dispatch(
		fetchCartSuccess({
			items: persistedCartState.items,
			total_items: persistedCartState.totalItems,
			total_price: persistedCartState.totalPrice,
		})
	);
}

// Subscribe to store changes to persist state
store.subscribe(() => {
	const state = store.getState();
	if (state.dogOfTheDay) {
		saveDogOfTheDayState(state.dogOfTheDay);
	}
	if (state.shop && state.shop.cart) {
		saveCartState({
			items: state.shop.cart.items,
			totalItems: state.shop.cart.totalItems,
			totalPrice: state.shop.cart.totalPrice,
		});
	}
});

// Export the RootState type for TypeScript
export type RootState = ReturnType<typeof store.getState>;

export default store;

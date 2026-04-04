import { configureStore, combineReducers } from "@reduxjs/toolkit";
import dogOfTheDayReducer from "./dogOfTheDay/reducers";
import shopReducer from "./shop/reducers";
import {
	loadDogOfTheDayState,
	isStateValidForToday,
	saveDogOfTheDayState,
} from "./dogOfTheDay/persistence";
import {
	setDogOfTheDay,
	setDogsOfTheDay,
	setLastFetchDate,
} from "./dogOfTheDay/actions";
import { loadCartState, saveCartState } from "./shop/persistence";
import { fetchCartSuccess } from "./shop/actions";

const rootReducer = combineReducers({
	dogOfTheDay: dogOfTheDayReducer,
	shop: shopReducer,
});

export const store = configureStore({
	reducer: rootReducer,
	devTools: process.env.NODE_ENV !== "production",
});

const persistedDogOfTheDayState = loadDogOfTheDayState();

if (
	persistedDogOfTheDayState &&
	isStateValidForToday(persistedDogOfTheDayState)
) {
	if (
		persistedDogOfTheDayState.dogs &&
		persistedDogOfTheDayState.dogs.length > 0
	) {
		store.dispatch(setDogsOfTheDay(persistedDogOfTheDayState.dogs));
		store.dispatch(setDogOfTheDay(persistedDogOfTheDayState.dogs[0]));
	} else if (persistedDogOfTheDayState.dog) {
		store.dispatch(setDogOfTheDay(persistedDogOfTheDayState.dog));
	}
	store.dispatch(setLastFetchDate(persistedDogOfTheDayState.lastFetchDate));
}

const persistedCartState = loadCartState();
if (
	persistedCartState &&
	persistedCartState.items &&
	persistedCartState.items.length > 0
) {
	store.dispatch(
		fetchCartSuccess({
			items: persistedCartState.items,
			total_items: persistedCartState.totalItems,
			total_price: persistedCartState.totalPrice,
		})
	);
}

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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

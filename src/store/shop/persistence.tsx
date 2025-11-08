// Cart persistence utilities
const STORAGE_KEY = 'shop_cart_state';

export interface CartState {
	items: any[];
	totalItems: number;
	totalPrice: string;
	loading?: boolean;
	error?: any;
}

// Save cart state to localStorage
export const saveCartState = (cart: CartState): void => {
	try {
		const serializedState = JSON.stringify(cart);
		localStorage.setItem(STORAGE_KEY, serializedState);
	} catch (error) {
		console.error('Error saving cart state to localStorage:', error);
	}
};

// Load cart state from localStorage
export const loadCartState = (): CartState | null => {
	try {
		const serializedState = localStorage.getItem(STORAGE_KEY);
		if (serializedState === null) {
			return null;
		}
		return JSON.parse(serializedState);
	} catch (error) {
		console.error('Error loading cart state from localStorage:', error);
		return null;
	}
};

// Clear cart state from localStorage
export const clearCartState = (): void => {
	try {
		localStorage.removeItem(STORAGE_KEY);
	} catch (error) {
		console.error('Error clearing cart state from localStorage:', error);
	}
};


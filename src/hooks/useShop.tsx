import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { shopAPI } from "../services/shopApi";
import {
	fetchProductsRequest,
	fetchProductsSuccess,
	fetchProductsFailure,
	fetchProductRequest,
	fetchProductSuccess,
	fetchProductFailure,
	fetchFeaturedProductsRequest,
	fetchFeaturedProductsSuccess,
	fetchFeaturedProductsFailure,
	fetchCategoriesRequest,
	fetchCategoriesSuccess,
	fetchCategoriesFailure,
	addToCartRequest,
	addToCartSuccess,
	addToCartFailure,
	updateCartItemRequest,
	updateCartItemSuccess,
	updateCartItemFailure,
	removeFromCartRequest,
	removeFromCartSuccess,
	removeFromCartFailure,
	clearCartRequest,
	clearCartSuccess,
	clearCartFailure,
	fetchOrdersRequest,
	fetchOrdersSuccess,
	fetchOrdersFailure,
	createOrderRequest,
	createOrderSuccess,
	createOrderFailure,
	applyCouponRequest,
	applyCouponSuccess,
	applyCouponFailure,
	clearCoupon,
	setProductFilters,
} from "../store/shop/actions";

export const useShop = () => {
	const dispatch = useDispatch();
	const shopState = useSelector((state: RootState) => state.shop);

	// Products
	const fetchProducts = async (filters?: any) => {
		dispatch(fetchProductsRequest());
		try {
			const response = await shopAPI.getProducts(filters);
			dispatch(fetchProductsSuccess(response, response));
		} catch (error: any) {
			dispatch(
				fetchProductsFailure(
					error.message || "Failed to fetch products"
				)
			);
		}
	};

	const fetchProduct = async (id: number) => {
		dispatch(fetchProductRequest());
		try {
			const response = await shopAPI.getProduct(id);
			dispatch(fetchProductSuccess(response));
		} catch (error: any) {
			dispatch(
				fetchProductFailure(error.message || "Failed to fetch product")
			);
		}
	};

	const fetchFeaturedProducts = async () => {
		dispatch(fetchFeaturedProductsRequest());
		try {
			const response = await shopAPI.getFeaturedProducts();
			dispatch(fetchFeaturedProductsSuccess(response));
		} catch (error: any) {
			dispatch(
				fetchFeaturedProductsFailure(
					error.message || "Failed to fetch featured products"
				)
			);
		}
	};

	const fetchCategories = async () => {
		dispatch(fetchCategoriesRequest());
		try {
			const response = await shopAPI.getProductCategories();
			dispatch(fetchCategoriesSuccess(response));
		} catch (error: any) {
			dispatch(
				fetchCategoriesFailure(
					error.message || "Failed to fetch categories"
				)
			);
		}
	};

	// Cart - handled entirely with Redux (no API calls)
	const fetchCart = async () => {
		// Cart is already in Redux state, no need to fetch from API
	};

	const addToCart = async (productId: number, quantity: number) => {
		dispatch(addToCartRequest());
		try {
			// Find the product in the current products list
			const product = shopState.products.items.find(
				(p: any) => p.id === productId
			);
			if (product) {
				// Check if product already exists in cart
				const existingItemIndex = shopState.cart.items.findIndex(
					(item: any) => item.product === productId
				);

				let updatedItems;
				let newTotalItems;
				let newTotalPrice;

				if (existingItemIndex >= 0) {
					// Update existing item quantity
					updatedItems = shopState.cart.items.map(
						(item: any, index: number) => {
							if (index === existingItemIndex) {
								const newQuantity = item.quantity + quantity;
								return {
									...item,
									quantity: newQuantity,
									total_price: (
										parseFloat(item.price) * newQuantity
									).toFixed(2),
								};
							}
							return item;
						}
					);
					newTotalItems = shopState.cart.totalItems + quantity;
					newTotalPrice = (
						parseFloat(shopState.cart.totalPrice) +
						parseFloat(product.price) * quantity
					).toFixed(2);
				} else {
					// Add new item
					const cartItem = {
						product: productId,
						product_name: product.name,
						product_sku: product.sku,
						price: product.price,
						quantity: quantity,
						total_price: (parseFloat(product.price) * quantity).toFixed(
							2
						),
					};
					updatedItems = [...shopState.cart.items, cartItem];
					newTotalItems = shopState.cart.totalItems + quantity;
					newTotalPrice = (
						parseFloat(shopState.cart.totalPrice) +
						parseFloat(cartItem.total_price)
					).toFixed(2);
				}

				// Update Redux state directly
				dispatch(
					addToCartSuccess({
						items: updatedItems,
						total_items: newTotalItems,
						total_price: newTotalPrice,
					})
				);
			}
		} catch (error: any) {
			dispatch(
				addToCartFailure(error.message || "Failed to add item to cart")
			);
		}
	};

	const updateCartItem = async (productId: number, quantity: number) => {
		dispatch(updateCartItemRequest());
		try {
			// Update cart item in Redux state
			const updatedItems = shopState.cart.items.map((item: any) =>
				item.product === productId
					? {
							...item,
							quantity,
							total_price: (
								parseFloat(item.price) * quantity
							).toFixed(2),
					  }
					: item
			);

			const totalItems = updatedItems.reduce(
				(sum: number, item: any) => sum + item.quantity,
				0
			);
			const totalPrice = updatedItems
				.reduce(
					(sum: number, item: any) =>
						sum + parseFloat(item.total_price),
					0
				)
				.toFixed(2);

			dispatch(
				updateCartItemSuccess({
					items: updatedItems,
					total_items: totalItems,
					total_price: totalPrice,
				})
			);
		} catch (error: any) {
			dispatch(
				updateCartItemFailure(
					error.message || "Failed to update cart item"
				)
			);
		}
	};

	const removeFromCart = async (productId: number) => {
		dispatch(removeFromCartRequest());
		try {
			// Remove item from Redux state
			const updatedItems = shopState.cart.items.filter(
				(item: any) => item.product !== productId
			);
			const totalItems = updatedItems.reduce(
				(sum: number, item: any) => sum + item.quantity,
				0
			);
			const totalPrice = updatedItems
				.reduce(
					(sum: number, item: any) =>
						sum + parseFloat(item.total_price),
					0
				)
				.toFixed(2);

			dispatch(
				removeFromCartSuccess({
					items: updatedItems,
					total_items: totalItems,
					total_price: totalPrice,
				})
			);
		} catch (error: any) {
			dispatch(
				removeFromCartFailure(
					error.message || "Failed to remove item from cart"
				)
			);
		}
	};

	const clearCart = async () => {
		dispatch(clearCartRequest());
		try {
			// Clear cart in Redux state
			dispatch(
				clearCartSuccess({
					items: [],
					total_items: 0,
					total_price: "0.00",
				})
			);
		} catch (error: any) {
			dispatch(clearCartFailure(error.message || "Failed to clear cart"));
		}
	};

	// Orders
	const fetchOrders = async () => {
		dispatch(fetchOrdersRequest());
		try {
			const response = await shopAPI.getOrders();
			dispatch(fetchOrdersSuccess(response, response));
		} catch (error: any) {
			dispatch(
				fetchOrdersFailure(error.message || "Failed to fetch orders")
			);
		}
	};

	const createOrder = async (orderData: any) => {
		dispatch(createOrderRequest());
		try {
			const response = await shopAPI.createOrder(orderData);
			dispatch(createOrderSuccess(response));
			return response;
		} catch (error: any) {
			dispatch(
				createOrderFailure(error.message || "Failed to create order")
			);
			throw error;
		}
	};

	// Coupons
	const applyCoupon = async (code: string, totalAmount: string) => {
		dispatch(applyCouponRequest());
		try {
			const response = await shopAPI.applyCoupon(code, totalAmount);
			dispatch(applyCouponSuccess(response));
		} catch (error: any) {
			dispatch(
				applyCouponFailure(error.message || "Invalid coupon code")
			);
		}
	};

	const removeCoupon = () => {
		dispatch(clearCoupon());
	};

	// Filters
	const setFilters = (filters: any) => {
		dispatch(setProductFilters(filters));
	};

	return {
		// State
		...shopState,

		// Actions
		fetchProducts,
		fetchProduct,
		fetchFeaturedProducts,
		fetchCategories,
		fetchCart,
		addToCart,
		updateCartItem,
		removeFromCart,
		clearCart,
		fetchOrders,
		createOrder,
		applyCoupon,
		removeCoupon,
		setFilters,
	};
};

// Shop Actions
export const SHOP_ACTIONS = {
  // Products
  FETCH_PRODUCTS_REQUEST: 'FETCH_PRODUCTS_REQUEST',
  FETCH_PRODUCTS_SUCCESS: 'FETCH_PRODUCTS_SUCCESS',
  FETCH_PRODUCTS_FAILURE: 'FETCH_PRODUCTS_FAILURE',
  
  FETCH_PRODUCT_REQUEST: 'FETCH_PRODUCT_REQUEST',
  FETCH_PRODUCT_SUCCESS: 'FETCH_PRODUCT_SUCCESS',
  FETCH_PRODUCT_FAILURE: 'FETCH_PRODUCT_FAILURE',
  
  FETCH_FEATURED_PRODUCTS_REQUEST: 'FETCH_FEATURED_PRODUCTS_REQUEST',
  FETCH_FEATURED_PRODUCTS_SUCCESS: 'FETCH_FEATURED_PRODUCTS_SUCCESS',
  FETCH_FEATURED_PRODUCTS_FAILURE: 'FETCH_FEATURED_PRODUCTS_FAILURE',
  
  FETCH_CATEGORIES_REQUEST: 'FETCH_CATEGORIES_REQUEST',
  FETCH_CATEGORIES_SUCCESS: 'FETCH_CATEGORIES_SUCCESS',
  FETCH_CATEGORIES_FAILURE: 'FETCH_CATEGORIES_FAILURE',
  
  // Cart
  FETCH_CART_REQUEST: 'FETCH_CART_REQUEST',
  FETCH_CART_SUCCESS: 'FETCH_CART_SUCCESS',
  FETCH_CART_FAILURE: 'FETCH_CART_FAILURE',
  
  ADD_TO_CART_REQUEST: 'ADD_TO_CART_REQUEST',
  ADD_TO_CART_SUCCESS: 'ADD_TO_CART_SUCCESS',
  ADD_TO_CART_FAILURE: 'ADD_TO_CART_FAILURE',
  
  UPDATE_CART_ITEM_REQUEST: 'UPDATE_CART_ITEM_REQUEST',
  UPDATE_CART_ITEM_SUCCESS: 'UPDATE_CART_ITEM_SUCCESS',
  UPDATE_CART_ITEM_FAILURE: 'UPDATE_CART_ITEM_FAILURE',
  
  REMOVE_FROM_CART_REQUEST: 'REMOVE_FROM_CART_REQUEST',
  REMOVE_FROM_CART_SUCCESS: 'REMOVE_FROM_CART_SUCCESS',
  REMOVE_FROM_CART_FAILURE: 'REMOVE_FROM_CART_FAILURE',
  
  CLEAR_CART_REQUEST: 'CLEAR_CART_REQUEST',
  CLEAR_CART_SUCCESS: 'CLEAR_CART_SUCCESS',
  CLEAR_CART_FAILURE: 'CLEAR_CART_FAILURE',
  
  // Orders
  FETCH_ORDERS_REQUEST: 'FETCH_ORDERS_REQUEST',
  FETCH_ORDERS_SUCCESS: 'FETCH_ORDERS_SUCCESS',
  FETCH_ORDERS_FAILURE: 'FETCH_ORDERS_FAILURE',
  
  FETCH_ORDER_REQUEST: 'FETCH_ORDER_REQUEST',
  FETCH_ORDER_SUCCESS: 'FETCH_ORDER_SUCCESS',
  FETCH_ORDER_FAILURE: 'FETCH_ORDER_FAILURE',
  
  CREATE_ORDER_REQUEST: 'CREATE_ORDER_REQUEST',
  CREATE_ORDER_SUCCESS: 'CREATE_ORDER_SUCCESS',
  CREATE_ORDER_FAILURE: 'CREATE_ORDER_FAILURE',
  
  // Coupons
  FETCH_COUPONS_REQUEST: 'FETCH_COUPONS_REQUEST',
  FETCH_COUPONS_SUCCESS: 'FETCH_COUPONS_SUCCESS',
  FETCH_COUPONS_FAILURE: 'FETCH_COUPONS_FAILURE',
  
  APPLY_COUPON_REQUEST: 'APPLY_COUPON_REQUEST',
  APPLY_COUPON_SUCCESS: 'APPLY_COUPON_SUCCESS',
  APPLY_COUPON_FAILURE: 'APPLY_COUPON_FAILURE',
  
  CLEAR_COUPON: 'CLEAR_COUPON',
  
  // Filters
  SET_PRODUCT_FILTERS: 'SET_PRODUCT_FILTERS',
  CLEAR_PRODUCT_FILTERS: 'CLEAR_PRODUCT_FILTERS',
} as const;

// Product Actions
export const fetchProductsRequest = () => ({
  type: SHOP_ACTIONS.FETCH_PRODUCTS_REQUEST,
});

export const fetchProductsSuccess = (products: any, pagination: any) => ({
  type: SHOP_ACTIONS.FETCH_PRODUCTS_SUCCESS,
  payload: { products, pagination },
});

export const fetchProductsFailure = (error: string) => ({
  type: SHOP_ACTIONS.FETCH_PRODUCTS_FAILURE,
  payload: error,
});

export const fetchProductRequest = () => ({
  type: SHOP_ACTIONS.FETCH_PRODUCT_REQUEST,
});

export const fetchProductSuccess = (product: any) => ({
  type: SHOP_ACTIONS.FETCH_PRODUCT_SUCCESS,
  payload: product,
});

export const fetchProductFailure = (error: string) => ({
  type: SHOP_ACTIONS.FETCH_PRODUCT_FAILURE,
  payload: error,
});

export const fetchFeaturedProductsRequest = () => ({
  type: SHOP_ACTIONS.FETCH_FEATURED_PRODUCTS_REQUEST,
});

export const fetchFeaturedProductsSuccess = (products: any[]) => ({
  type: SHOP_ACTIONS.FETCH_FEATURED_PRODUCTS_SUCCESS,
  payload: products,
});

export const fetchFeaturedProductsFailure = (error: string) => ({
  type: SHOP_ACTIONS.FETCH_FEATURED_PRODUCTS_FAILURE,
  payload: error,
});

export const fetchCategoriesRequest = () => ({
  type: SHOP_ACTIONS.FETCH_CATEGORIES_REQUEST,
});

export const fetchCategoriesSuccess = (categories: any[]) => ({
  type: SHOP_ACTIONS.FETCH_CATEGORIES_SUCCESS,
  payload: categories,
});

export const fetchCategoriesFailure = (error: string) => ({
  type: SHOP_ACTIONS.FETCH_CATEGORIES_FAILURE,
  payload: error,
});

// Cart Actions
export const fetchCartRequest = () => ({
  type: SHOP_ACTIONS.FETCH_CART_REQUEST,
});

export const fetchCartSuccess = (cart: any) => ({
  type: SHOP_ACTIONS.FETCH_CART_SUCCESS,
  payload: cart,
});

export const fetchCartFailure = (error: string) => ({
  type: SHOP_ACTIONS.FETCH_CART_FAILURE,
  payload: error,
});

export const addToCartRequest = () => ({
  type: SHOP_ACTIONS.ADD_TO_CART_REQUEST,
});

export const addToCartSuccess = (cart: any) => ({
  type: SHOP_ACTIONS.ADD_TO_CART_SUCCESS,
  payload: cart,
});

export const addToCartFailure = (error: string) => ({
  type: SHOP_ACTIONS.ADD_TO_CART_FAILURE,
  payload: error,
});

export const updateCartItemRequest = () => ({
  type: SHOP_ACTIONS.UPDATE_CART_ITEM_REQUEST,
});

export const updateCartItemSuccess = (cart: any) => ({
  type: SHOP_ACTIONS.UPDATE_CART_ITEM_SUCCESS,
  payload: cart,
});

export const updateCartItemFailure = (error: string) => ({
  type: SHOP_ACTIONS.UPDATE_CART_ITEM_FAILURE,
  payload: error,
});

export const removeFromCartRequest = () => ({
  type: SHOP_ACTIONS.REMOVE_FROM_CART_REQUEST,
});

export const removeFromCartSuccess = (cart: any) => ({
  type: SHOP_ACTIONS.REMOVE_FROM_CART_SUCCESS,
  payload: cart,
});

export const removeFromCartFailure = (error: string) => ({
  type: SHOP_ACTIONS.REMOVE_FROM_CART_FAILURE,
  payload: error,
});

export const clearCartRequest = () => ({
  type: SHOP_ACTIONS.CLEAR_CART_REQUEST,
});

export const clearCartSuccess = (cart: any) => ({
  type: SHOP_ACTIONS.CLEAR_CART_SUCCESS,
  payload: cart,
});

export const clearCartFailure = (error: string) => ({
  type: SHOP_ACTIONS.CLEAR_CART_FAILURE,
  payload: error,
});

// Order Actions
export const fetchOrdersRequest = () => ({
  type: SHOP_ACTIONS.FETCH_ORDERS_REQUEST,
});

export const fetchOrdersSuccess = (orders: any, pagination: any) => ({
  type: SHOP_ACTIONS.FETCH_ORDERS_SUCCESS,
  payload: { orders, pagination },
});

export const fetchOrdersFailure = (error: string) => ({
  type: SHOP_ACTIONS.FETCH_ORDERS_FAILURE,
  payload: error,
});

export const fetchOrderRequest = () => ({
  type: SHOP_ACTIONS.FETCH_ORDER_REQUEST,
});

export const fetchOrderSuccess = (order: any) => ({
  type: SHOP_ACTIONS.FETCH_ORDER_SUCCESS,
  payload: order,
});

export const fetchOrderFailure = (error: string) => ({
  type: SHOP_ACTIONS.FETCH_ORDER_FAILURE,
  payload: error,
});

export const createOrderRequest = () => ({
  type: SHOP_ACTIONS.CREATE_ORDER_REQUEST,
});

export const createOrderSuccess = (order: any) => ({
  type: SHOP_ACTIONS.CREATE_ORDER_SUCCESS,
  payload: order,
});

export const createOrderFailure = (error: string) => ({
  type: SHOP_ACTIONS.CREATE_ORDER_FAILURE,
  payload: error,
});

// Coupon Actions
export const fetchCouponsRequest = () => ({
  type: SHOP_ACTIONS.FETCH_COUPONS_REQUEST,
});

export const fetchCouponsSuccess = (coupons: any[]) => ({
  type: SHOP_ACTIONS.FETCH_COUPONS_SUCCESS,
  payload: coupons,
});

export const fetchCouponsFailure = (error: string) => ({
  type: SHOP_ACTIONS.FETCH_COUPONS_FAILURE,
  payload: error,
});

export const applyCouponRequest = () => ({
  type: SHOP_ACTIONS.APPLY_COUPON_REQUEST,
});

export const applyCouponSuccess = (coupon: any) => ({
  type: SHOP_ACTIONS.APPLY_COUPON_SUCCESS,
  payload: coupon,
});

export const applyCouponFailure = (error: string) => ({
  type: SHOP_ACTIONS.APPLY_COUPON_FAILURE,
  payload: error,
});

export const clearCoupon = () => ({
  type: SHOP_ACTIONS.CLEAR_COUPON,
});

// Filter Actions
export const setProductFilters = (filters: any) => ({
  type: SHOP_ACTIONS.SET_PRODUCT_FILTERS,
  payload: filters,
});

export const clearProductFilters = () => ({
  type: SHOP_ACTIONS.CLEAR_PRODUCT_FILTERS,
});

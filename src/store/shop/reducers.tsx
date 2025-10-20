import { SHOP_ACTIONS } from './actions';

// Initial State
const initialState = {
  // Products
  products: {
    items: [],
    loading: false,
    error: null,
    pagination: {
      count: 0,
      next: null,
      previous: null,
    },
  },
  currentProduct: {
    item: null,
    loading: false,
    error: null,
  },
  featuredProducts: {
    items: [],
    loading: false,
    error: null,
  },
  categories: {
    items: [],
    loading: false,
    error: null,
  },
  
  // Cart
  cart: {
    items: [],
    totalItems: 0,
    totalPrice: '0.00',
    loading: false,
    error: null,
  },
  
  // Orders
  orders: {
    items: [],
    loading: false,
    error: null,
    pagination: {
      count: 0,
      next: null,
      previous: null,
    },
  },
  currentOrder: {
    item: null,
    loading: false,
    error: null,
  },
  
  // Coupons
  coupons: {
    items: [],
    loading: false,
    error: null,
  },
  appliedCoupon: {
    item: null,
    loading: false,
    error: null,
  },
  
  // Filters
  filters: {
    category: '',
    featured: false,
    in_stock: false,
    search: '',
    min_price: null,
    max_price: null,
    page: 1,
    page_size: 20,
  },
};

// Shop Reducer
const shopReducer = (state = initialState, action: any) => {
  switch (action.type) {
    // Products
    case SHOP_ACTIONS.FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        products: {
          ...state.products,
          loading: true,
          error: null,
        },
      };
    case SHOP_ACTIONS.FETCH_PRODUCTS_SUCCESS:
      // Extract the products array from the response
      let productsItems;
      if (action.payload.products?.data?.results) {
        // If the response has products.data.results structure (axios full response)
        productsItems = action.payload.products.data.results;
      } else if (action.payload.products?.results) {
        // If the response has products.results structure
        productsItems = action.payload.products.results;
      } else if (action.payload.results) {
        // If the response has results structure directly
        productsItems = action.payload.results;
      } else if (Array.isArray(action.payload)) {
        // If the payload is directly an array
        productsItems = action.payload;
      } else {
        // Fallback to empty array
        productsItems = [];
      }
      
      return {
        ...state,
        products: {
          ...state.products,
          loading: false,
          items: productsItems,
          pagination: {
            count: action.payload.products?.data?.count || action.payload.products?.count || action.payload.count || 0,
            next: action.payload.products?.data?.next || action.payload.products?.next || action.payload.next || null,
            previous: action.payload.products?.data?.previous || action.payload.products?.previous || action.payload.previous || null,
          },
        },
      };
    case SHOP_ACTIONS.FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        products: {
          ...state.products,
          loading: false,
          error: action.payload,
        },
      };

    case SHOP_ACTIONS.FETCH_PRODUCT_REQUEST:
      return {
        ...state,
        currentProduct: {
          ...state.currentProduct,
          loading: true,
          error: null,
        },
      };
    case SHOP_ACTIONS.FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        currentProduct: {
          ...state.currentProduct,
          loading: false,
          item: action.payload,
        },
      };
    case SHOP_ACTIONS.FETCH_PRODUCT_FAILURE:
      return {
        ...state,
        currentProduct: {
          ...state.currentProduct,
          loading: false,
          error: action.payload,
        },
      };

    case SHOP_ACTIONS.FETCH_FEATURED_PRODUCTS_REQUEST:
      return {
        ...state,
        featuredProducts: {
          ...state.featuredProducts,
          loading: true,
          error: null,
        },
      };
    case SHOP_ACTIONS.FETCH_FEATURED_PRODUCTS_SUCCESS:
      return {
        ...state,
        featuredProducts: {
          ...state.featuredProducts,
          loading: false,
          items: action.payload,
        },
      };
    case SHOP_ACTIONS.FETCH_FEATURED_PRODUCTS_FAILURE:
      return {
        ...state,
        featuredProducts: {
          ...state.featuredProducts,
          loading: false,
          error: action.payload,
        },
      };

    case SHOP_ACTIONS.FETCH_CATEGORIES_REQUEST:
      return {
        ...state,
        categories: {
          ...state.categories,
          loading: true,
          error: null,
        },
      };
    case SHOP_ACTIONS.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: {
          ...state.categories,
          loading: false,
          items: action.payload.data || action.payload,
        },
      };
    case SHOP_ACTIONS.FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        categories: {
          ...state.categories,
          loading: false,
          error: action.payload,
        },
      };

    // Cart
    case SHOP_ACTIONS.FETCH_CART_REQUEST:
      return {
        ...state,
        cart: {
          ...state.cart,
          loading: true,
          error: null,
        },
      };
    case SHOP_ACTIONS.FETCH_CART_SUCCESS:
      return {
        ...state,
        cart: {
          ...state.cart,
          loading: false,
          items: action.payload.items,
          totalItems: action.payload.total_items,
          totalPrice: action.payload.total_price,
        },
      };
    case SHOP_ACTIONS.FETCH_CART_FAILURE:
      return {
        ...state,
        cart: {
          ...state.cart,
          loading: false,
          error: action.payload,
        },
      };

    case SHOP_ACTIONS.ADD_TO_CART_REQUEST:
      return {
        ...state,
        cart: {
          ...state.cart,
          loading: true,
          error: null,
        },
      };
    case SHOP_ACTIONS.ADD_TO_CART_SUCCESS:
      return {
        ...state,
        cart: {
          ...state.cart,
          loading: false,
          items: action.payload.items,
          totalItems: action.payload.total_items,
          totalPrice: action.payload.total_price,
        },
      };
    case SHOP_ACTIONS.ADD_TO_CART_FAILURE:
      return {
        ...state,
        cart: {
          ...state.cart,
          loading: false,
          error: action.payload,
        },
      };

    case SHOP_ACTIONS.UPDATE_CART_ITEM_REQUEST:
      return {
        ...state,
        cart: {
          ...state.cart,
          loading: true,
          error: null,
        },
      };
    case SHOP_ACTIONS.UPDATE_CART_ITEM_SUCCESS:
      return {
        ...state,
        cart: {
          ...state.cart,
          loading: false,
          items: action.payload.items,
          totalItems: action.payload.total_items,
          totalPrice: action.payload.total_price,
        },
      };
    case SHOP_ACTIONS.UPDATE_CART_ITEM_FAILURE:
      return {
        ...state,
        cart: {
          ...state.cart,
          loading: false,
          error: action.payload,
        },
      };

    case SHOP_ACTIONS.REMOVE_FROM_CART_REQUEST:
      return {
        ...state,
        cart: {
          ...state.cart,
          loading: true,
          error: null,
        },
      };
    case SHOP_ACTIONS.REMOVE_FROM_CART_SUCCESS:
      return {
        ...state,
        cart: {
          ...state.cart,
          loading: false,
          items: action.payload.items,
          totalItems: action.payload.total_items,
          totalPrice: action.payload.total_price,
        },
      };
    case SHOP_ACTIONS.REMOVE_FROM_CART_FAILURE:
      return {
        ...state,
        cart: {
          ...state.cart,
          loading: false,
          error: action.payload,
        },
      };

    case SHOP_ACTIONS.CLEAR_CART_REQUEST:
      return {
        ...state,
        cart: {
          ...state.cart,
          loading: true,
          error: null,
        },
      };
    case SHOP_ACTIONS.CLEAR_CART_SUCCESS:
      return {
        ...state,
        cart: {
          ...state.cart,
          loading: false,
          items: [],
          totalItems: 0,
          totalPrice: '0.00',
        },
      };
    case SHOP_ACTIONS.CLEAR_CART_FAILURE:
      return {
        ...state,
        cart: {
          ...state.cart,
          loading: false,
          error: action.payload,
        },
      };

    // Orders
    case SHOP_ACTIONS.FETCH_ORDERS_REQUEST:
      return {
        ...state,
        orders: {
          ...state.orders,
          loading: true,
          error: null,
        },
      };
    case SHOP_ACTIONS.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: {
          ...state.orders,
          loading: false,
          items: action.payload.orders.results,
          pagination: {
            count: action.payload.orders.count,
            next: action.payload.orders.next,
            previous: action.payload.orders.previous,
          },
        },
      };
    case SHOP_ACTIONS.FETCH_ORDERS_FAILURE:
      return {
        ...state,
        orders: {
          ...state.orders,
          loading: false,
          error: action.payload,
        },
      };

    case SHOP_ACTIONS.FETCH_ORDER_REQUEST:
      return {
        ...state,
        currentOrder: {
          ...state.currentOrder,
          loading: true,
          error: null,
        },
      };
    case SHOP_ACTIONS.FETCH_ORDER_SUCCESS:
      return {
        ...state,
        currentOrder: {
          ...state.currentOrder,
          loading: false,
          item: action.payload,
        },
      };
    case SHOP_ACTIONS.FETCH_ORDER_FAILURE:
      return {
        ...state,
        currentOrder: {
          ...state.currentOrder,
          loading: false,
          error: action.payload,
        },
      };

    case SHOP_ACTIONS.CREATE_ORDER_REQUEST:
      return {
        ...state,
        currentOrder: {
          ...state.currentOrder,
          loading: true,
          error: null,
        },
      };
    case SHOP_ACTIONS.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        currentOrder: {
          ...state.currentOrder,
          loading: false,
          item: action.payload,
        },
        // Clear cart after successful order
        cart: {
          ...state.cart,
          items: [],
          totalItems: 0,
          totalPrice: '0.00',
        },
      };
    case SHOP_ACTIONS.CREATE_ORDER_FAILURE:
      return {
        ...state,
        currentOrder: {
          ...state.currentOrder,
          loading: false,
          error: action.payload,
        },
      };

    // Coupons
    case SHOP_ACTIONS.FETCH_COUPONS_REQUEST:
      return {
        ...state,
        coupons: {
          ...state.coupons,
          loading: true,
          error: null,
        },
      };
    case SHOP_ACTIONS.FETCH_COUPONS_SUCCESS:
      return {
        ...state,
        coupons: {
          ...state.coupons,
          loading: false,
          items: action.payload,
        },
      };
    case SHOP_ACTIONS.FETCH_COUPONS_FAILURE:
      return {
        ...state,
        coupons: {
          ...state.coupons,
          loading: false,
          error: action.payload,
        },
      };

    case SHOP_ACTIONS.APPLY_COUPON_REQUEST:
      return {
        ...state,
        appliedCoupon: {
          ...state.appliedCoupon,
          loading: true,
          error: null,
        },
      };
    case SHOP_ACTIONS.APPLY_COUPON_SUCCESS:
      return {
        ...state,
        appliedCoupon: {
          ...state.appliedCoupon,
          loading: false,
          item: action.payload,
        },
      };
    case SHOP_ACTIONS.APPLY_COUPON_FAILURE:
      return {
        ...state,
        appliedCoupon: {
          ...state.appliedCoupon,
          loading: false,
          error: action.payload,
        },
      };

    case SHOP_ACTIONS.CLEAR_COUPON:
      return {
        ...state,
        appliedCoupon: {
          item: null,
          loading: false,
          error: null,
        },
      };

    // Filters
    case SHOP_ACTIONS.SET_PRODUCT_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload,
        },
      };

    case SHOP_ACTIONS.CLEAR_PRODUCT_FILTERS:
      return {
        ...state,
        filters: {
          category: '',
          featured: false,
          in_stock: false,
          search: '',
          min_price: null,
          max_price: null,
          page: 1,
          page_size: 20,
        },
      };

    default:
      return state;
  }
};

export default shopReducer;

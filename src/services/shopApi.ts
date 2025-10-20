import axiosService from "../helpers/axios";

// Types
export interface Product {
	id: number;
	name: string;
	description?: string;
	brand: string;
	category: string;
	category_display: string;
	price: string;
	compare_price?: string;
	sku: string;
	stock_quantity: number;
	low_stock_threshold: number;
	weight?: string;
	dimensions?: string;
	is_active: boolean;
	is_bestseller: boolean;
	tags?: string;
	images: ProductImage[];
	primary_image?: string;
	image_2?: string;
	image_3?: string;
	image_4?: string;
	is_in_stock: boolean;
	is_low_stock: boolean;
	discount_percentage?: string;
	created_at: string;
	updated_at: string;
}

export interface ProductImage {
	image: string;
	is_primary: boolean;
	order: number;
}

export interface ProductCategory {
	code: string;
	name: string;
	product_count: number;
}

export interface CartItem {
	id: number;
	user: number;
	product: Product;
	product_id: number;
	quantity: number;
	total_price: string;
	added_at: string;
	updated_at: string;
}

export interface Cart {
	total_items: number;
	total_price: string;
	items: CartItem[];
}

export interface Order {
	id: number;
	order_number: string;
	user: number;
	status: string;
	payment_status: string;
	subtotal: string;
	tax_amount: string;
	shipping_cost: string;
	discount_amount: string;
	total_amount: string;
	shipping_first_name: string;
	shipping_last_name: string;
	shipping_address: string;
	shipping_city: string;
	shipping_county: string;
	shipping_postal_code: string;
	shipping_country: string;
	shipping_phone: string;
	tracking_number?: string;
	billing_first_name: string;
	billing_last_name: string;
	billing_address: string;
	billing_city: string;
	billing_county: string;
	billing_postal_code: string;
	billing_country: string;
	notes?: string;
	order_items: OrderItem[];
	created_at: string;
	updated_at: string;
	shipped_at?: string;
	delivered_at?: string;
}

export interface OrderItem {
	id: number;
	product: Product;
	quantity: number;
	price: string;
	total_price: string;
}

export interface Coupon {
	id: number;
	code: string;
	description: string;
	discount_type: string;
	discount_value: string;
	minimum_order_amount: string;
	maximum_discount_amount?: string;
	valid_from: string;
	valid_until: string;
	usage_limit: number;
	used_count: number;
	is_active: boolean;
	created_at: string;
	updated_at: string;
}

export interface CouponApplication {
	code: string;
	discount_amount: string;
	description: string;
}

export interface ProductFilters {
	page?: number;
	page_size?: number;
	category?: string;
	featured?: boolean;
	in_stock?: boolean;
	search?: string;
	min_price?: number;
	max_price?: number;
}

export interface PaginatedResponse<T> {
	count: number;
	next?: string;
	previous?: string;
	results: T[];
}

export interface CreateOrderData {
	shipping_first_name: string;
	shipping_last_name: string;
	shipping_address: string;
	shipping_city: string;
	shipping_county: string;
	shipping_postal_code: string;
	shipping_country: string;
	shipping_phone: string;
	billing_first_name: string;
	billing_last_name: string;
	billing_address: string;
	billing_city: string;
	billing_county: string;
	billing_postal_code: string;
	billing_country: string;
	notes?: string;
}

// Shop API
export const shopAPI = {
	// Products
	getProducts: (
		filters?: ProductFilters
	): Promise<PaginatedResponse<Product>> => {
		const params = new URLSearchParams();
		if (filters) {
			Object.entries(filters).forEach(([key, value]) => {
				if (value !== undefined && value !== null) {
					params.append(key, value.toString());
				}
			});
		}
		const url = `/api/shop/products/?${params.toString()}`;
		return axiosService.get(url);
	},

	getProduct: (id: number): Promise<Product> => {
		return axiosService.get(`/api/shop/products/${id}/`);
	},

	getFeaturedProducts: (): Promise<Product[]> => {
		return axiosService.get(`/api/shop/products/featured/`);
	},

	getBestsellerProducts: (): Promise<Product[]> => {
		return axiosService.get(`/api/shop/products/bestseller/`);
	},

	getProductCategories: (): Promise<ProductCategory[]> => {
		return axiosService.get(`/api/shop/products/categories/`);
	},

	// Note: Cart functionality is handled entirely on the frontend using Redux
	// No backend cart endpoints are available according to the API documentation

	// Orders
	getOrders: (): Promise<PaginatedResponse<Order>> => {
		return axiosService.get(`/api/shop/orders/`);
	},

	getOrder: (id: number): Promise<Order> => {
		return axiosService.get(`/api/shop/orders/${id}/`);
	},

	createOrder: (orderData: CreateOrderData): Promise<Order> => {
		return axiosService.post(`/api/shop/orders/`, orderData);
	},

	// Coupons
	getCoupons: (): Promise<PaginatedResponse<Coupon>> => {
		return axiosService.get(`/api/shop/coupons/`);
	},

	applyCoupon: (
		code: string,
		totalAmount: string
	): Promise<CouponApplication> => {
		return axiosService.post(`/api/shop/coupons/apply/`, {
			code,
			total_amount: totalAmount,
		});
	},
};

export default shopAPI;

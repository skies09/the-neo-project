import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import ProductList from "../../components/shop/ProductList";
import CategoryGrid from "../../components/shop/CategoryGrid";
import { shopAPI } from "../../services/shopApi";
import {
	fetchProductsRequest,
	fetchProductsSuccess,
	fetchProductsFailure,
	fetchFeaturedProductsRequest,
	fetchFeaturedProductsSuccess,
	fetchFeaturedProductsFailure,
	fetchCategoriesRequest,
	fetchCategoriesSuccess,
	fetchCategoriesFailure,
	addToCartRequest,
	addToCartSuccess,
	addToCartFailure,
	setProductFilters,
} from "../../store/shop/actions";

const ShopHome: React.FC = () => {
	const dispatch = useDispatch();
	const shopState = useSelector((state: RootState) => state.shop);
	const [selectedCategory, setSelectedCategory] = useState<string | null>(
		null
	);
	const [currentFilters, setCurrentFilters] = useState<any>({});

	// Safely extract state with defaults
	const products = shopState?.products || {
		items: [],
		loading: false,
		error: null,
		pagination: { count: 0, next: null, previous: null },
	};
	const featuredProducts = shopState?.featuredProducts || {
		items: [],
		loading: false,
		error: null,
	};
	const categories = shopState?.categories || {
		items: [],
		loading: false,
		error: null,
	};
	const cart = shopState?.cart || {
		items: [],
		totalItems: 0,
		totalPrice: "0.00",
		loading: false,
		error: null,
	};

	useEffect(() => {
		// Fetch initial data
		fetchProducts();
		fetchFeaturedProducts();
		fetchCategories();
	}, []);

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

	const fetchFeaturedProducts = async () => {
		dispatch(fetchFeaturedProductsRequest());
		try {
			const response = await shopAPI.getBestsellerProducts();
			dispatch(fetchFeaturedProductsSuccess(response));
		} catch (error: any) {
			dispatch(
				fetchFeaturedProductsFailure(
					error.message || "Failed to fetch bestseller products"
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

	const handleAddToCart = async (productId: number, quantity: number) => {
		// Cart is handled entirely with Redux - no API calls needed
		dispatch(addToCartRequest());
		try {
			// Find the product in the current products list
			const product = products.items.find((p) => p.id === productId);
			if (product) {
				// Create a cart item object
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

				// Update Redux state directly
				dispatch(
					addToCartSuccess({
						items: [...cart.items, cartItem],
						total_items: cart.totalItems + quantity,
						total_price: (
							parseFloat(cart.totalPrice) +
							parseFloat(cartItem.total_price)
						).toFixed(2),
					})
				);
			}
		} catch (error: any) {
			dispatch(
				addToCartFailure(error.message || "Failed to add item to cart")
			);
		}
	};

	const handleCategorySelect = (categoryCode: string) => {
		if (categoryCode === "") {
			// View All Products - show all products without category filter
			setSelectedCategory("all");
			const filters = { page: 1, page_size: 20 };
			setCurrentFilters(filters);
			dispatch(setProductFilters(filters));
			fetchProducts(filters);
		} else {
			// Specific category selected
			setSelectedCategory(categoryCode);
			const filters = { category: categoryCode, page: 1, page_size: 20 };
			setCurrentFilters(filters);
			dispatch(setProductFilters(filters));
			fetchProducts(filters);
		}
	};

	const handleFilterChange = async (filters: any) => {
		const newFilters = { ...currentFilters, ...filters };
		setCurrentFilters(newFilters);
		dispatch(setProductFilters(newFilters));
		fetchProducts(newFilters);
	};

	const handleBackToCategories = () => {
		setSelectedCategory(null);
		setCurrentFilters({});
		// Clear products when going back to categories
		dispatch(
			fetchProductsSuccess(
				{ results: [], count: 0, next: null, previous: null },
				{ results: [], count: 0, next: null, previous: null }
			)
		);
	};

	return (
		<div className="min-h-screen bg-gray-50 pt-16">
			{/* Hero Section */}
			<div className="bg-gradient-to-r from-skyBlue to-blue-600 text-white py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h1 className="text-4xl md:text-6xl font-bold mb-4">
						The Neo Project Shop
					</h1>
					<p className="text-xl md:text-2xl mb-8 opacity-90">
						Premium products for your beloved pets
					</p>
					<div className="flex justify-center space-x-4">
						<div className="bg-white bg-opacity-20 rounded-lg px-6 py-3">
							<span className="text-sm font-medium">
								Free UK Shipping
							</span>
						</div>
						<div className="bg-white bg-opacity-20 rounded-lg px-6 py-3">
							<span className="text-sm font-medium">
								Premium Quality
							</span>
						</div>
						<div className="bg-white bg-opacity-20 rounded-lg px-6 py-3">
							<span className="text-sm font-medium">
								Expert Curated
							</span>
						</div>
					</div>
				</div>
			</div>

			{/* Featured Products Section */}
			{featuredProducts.items && featuredProducts.items.length > 0 && (
				<div className="py-16">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-12">
							<h2 className="text-3xl font-bold text-gray-800 mb-4">
								Bestseller Products
							</h2>
							<p className="text-lg text-gray-600">
								Our most popular and best-selling items
							</p>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
							{featuredProducts.items
								?.slice(0, 4)
								.map((product) => (
									<div
										key={product.id}
										className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
									>
										<div className="relative">
											<img
												src={
													product.primary_image ||
													"/images/dog1.jpg"
												}
												alt={product.name}
												className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
											/>
											<div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
												Bestseller
											</div>
										</div>
										<div className="p-4">
											{product.brand && (
												<div className="mb-2">
													<span className="text-sm text-gray-500 font-medium">
														{product.brand}
													</span>
												</div>
											)}
											<h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
												{product.name}
											</h3>
											<div className="flex items-center gap-2 mb-4">
												<span className="text-xl font-bold text-gray-900">
													£
													{parseFloat(
														product.price
													).toFixed(2)}
												</span>
												{product.compare_price && (
													<span className="text-sm text-gray-500 line-through">
														£
														{parseFloat(
															product.compare_price
														).toFixed(2)}
													</span>
												)}
											</div>
											<button
												onClick={() =>
													handleAddToCart(
														product.id,
														1
													)
												}
												disabled={!product.is_in_stock}
												className={`w-full py-2 px-4 rounded-md font-semibold transition-colors duration-200 ${
													product.is_in_stock
														? "bg-skyBlue text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-skyBlue focus:ring-offset-2"
														: "bg-gray-300 text-gray-500 cursor-not-allowed"
												}`}
											>
												{product.is_in_stock
													? "Add to Cart"
													: "Out of Stock"}
											</button>
										</div>
									</div>
								))}
						</div>
					</div>
				</div>
			)}

			{/* Main Content */}
			<div className="py-16">
				{!selectedCategory || selectedCategory === null ? (
					/* Show Categories */
					<>
						<CategoryGrid
							categories={categories.items || []}
							loading={categories.loading}
							onCategorySelect={handleCategorySelect}
						/>
					</>
				) : (
					/* Show Products for Selected Category */
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						{/* Back to Categories Button */}
						<div className="mb-8">
							<button
								onClick={handleBackToCategories}
								className="flex items-center space-x-2 text-skyBlue hover:text-blue-600 font-medium transition-colors duration-200"
							>
								<svg
									className="w-5 h-5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M15 19l-7-7 7-7"
									/>
								</svg>
								<span>Back to Categories</span>
							</button>
						</div>

						{/* Category Title */}
						<div className="text-center mb-12">
							<h2 className="text-3xl font-bold text-gray-800 mb-4">
								{selectedCategory === "all"
									? "All Products"
									: selectedCategory
									? categories.items?.find(
											(cat) =>
												cat.code === selectedCategory
									  )?.name || "Products"
									: "All Products"}
							</h2>
							<p className="text-lg text-gray-600">
								{selectedCategory === "all"
									? "Browse our complete collection of pet products"
									: selectedCategory
									? `Browse ${categories.items
											?.find(
												(cat) =>
													cat.code ===
													selectedCategory
											)
											?.name?.toLowerCase()} products`
									: "Browse our complete collection of pet products"}
							</p>
						</div>

						<ProductList
							products={products.items || []}
							loading={products.loading}
							onAddToCart={handleAddToCart}
							showFilters={true}
							onFilterChange={handleFilterChange}
							categories={categories.items || []}
							currentFilters={currentFilters}
						/>
					</div>
				)}
			</div>

			{/* Cart Summary (if items in cart) */}
			{cart && cart.totalItems > 0 && (
				<div className="fixed bottom-4 right-4 z-50">
					<div className="bg-skyBlue text-white rounded-full px-6 py-3 shadow-lg hover:bg-blue-600 transition-colors duration-200 cursor-pointer">
						<div className="flex items-center space-x-2">
							<svg
								className="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
								/>
							</svg>
							<span className="font-semibold">
								{cart.totalItems} item
								{cart.totalItems !== 1 ? "s" : ""} - £
								{parseFloat(cart.totalPrice).toFixed(2)}
							</span>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ShopHome;

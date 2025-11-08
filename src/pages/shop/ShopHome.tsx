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
		<div className="min-h-screen bg-gradient-to-br from-honeydew to-mintCream pt-16">
			{/* Hero Section */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-4">
				<div className="flex justify-center items-center my-4">
					<h1 className="font-delius text-4xl md:text-6xl lg:text-7xl font-bold text-oxfordBlue drop-shadow-md text-center">
						The Neo Project Shop
					</h1>
				</div>
				<p className="text-lg lg:text-xl text-highland font-fredoka max-w-3xl mx-auto mb-8">
					Premium products for your beloved pets
				</p>
				<div className="flex justify-center space-x-4 flex-wrap gap-4">
					<div className="bg-gradient-to-br from-tara to-mintCream rounded-full px-6 py-3 border-2 border-oxfordBlue/20 shadow-md">
						<span className="text-sm font-medium font-poppins text-oxfordBlue">
							Free UK Shipping
						</span>
					</div>
					<div className="bg-gradient-to-br from-tara to-mintCream rounded-full px-6 py-3 border-2 border-oxfordBlue/20 shadow-md">
						<span className="text-sm font-medium font-poppins text-oxfordBlue">
							Premium Quality
						</span>
					</div>
					<div className="bg-gradient-to-br from-tara to-mintCream rounded-full px-6 py-3 border-2 border-oxfordBlue/20 shadow-md">
						<span className="text-sm font-medium font-poppins text-oxfordBlue">
							Expert Curated
						</span>
					</div>
				</div>
			</div>

			{/* Featured Products Section */}
			{featuredProducts.items && featuredProducts.items.length > 0 && (
				<div className="py-16">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-12">
							<h2 className="text-3xl font-bold text-oxfordBlue font-delius mb-4">
								Bestseller Products
							</h2>
							<p className="text-lg text-highland font-fredoka">
								Our most popular and best-selling items
							</p>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
							{featuredProducts.items
								?.slice(0, 4)
								.map((product) => (
									<div
										key={product.id}
										className="bg-gradient-to-br from-tara to-mintCream rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
									>
										<div className="relative">
											{/* <img
												src={
													product.primary_image ||
													"/images/dog1.jpg"
												}
												alt={product.name}
												className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
											/> */}
											<div className="absolute top-2 right-2 bg-gradient-to-r from-highland to-sark text-honeydew px-3 py-1 rounded-full text-xs font-bold font-poppins shadow-md">
												Bestseller
											</div>
										</div>
										<div className="p-4">
											{product.brand && (
												<div className="mb-2">
													<span className="text-sm text-oxfordBlue/70 font-medium font-poppins">
														{product.brand}
													</span>
												</div>
											)}
											<h3 className="text-lg font-semibold text-oxfordBlue mb-2 line-clamp-2 font-delius group-hover:text-highland transition-colors">
												{product.name}
											</h3>
											<div className="flex items-center gap-2 mb-4">
												<span className="text-xl font-bold text-oxfordBlue font-poppins">
													£
													{parseFloat(
														product.price
													).toFixed(2)}
												</span>
												{product.compare_price && (
													<span className="text-sm text-oxfordBlue/50 line-through font-poppins">
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
												className={`w-full py-2 px-4 rounded-full font-semibold transition-all duration-300 font-fredoka ${
													product.is_in_stock
														? "bg-gradient-to-r from-highland to-sark text-honeydew hover:shadow-lg transform hover:scale-105 hover:text-sunset"
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
			<div className="py-4">
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
								className="group flex items-center space-x-2 text-highland hover:text-sark font-medium font-poppins transition-colors duration-200"
							>
								<svg
									className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300"
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
						<div className="text-center mb-4">
							<h2 className="text-3xl font-bold text-oxfordBlue font-delius mb-4">
								{selectedCategory === "all"
									? "All Products"
									: selectedCategory
									? categories.items?.find(
											(cat) =>
												cat.code === selectedCategory
									  )?.name || "Products"
									: "All Products"}
							</h2>
							<p className="text-lg text-highland font-fredoka">
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
		</div>
	);
};

export default ShopHome;

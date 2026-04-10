import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faClipboardList,
	faGem,
	faImage,
	faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import { RootState } from "../../store/store";
import ProductList from "../../components/shop/ProductList";
import CategoryGrid from "../../components/shop/CategoryGrid";
import { shopAPI, type Product } from "../../services/shopApi";
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

function getProductDiscountLabel(product: Product): string | null {
	if (!product.discount_percentage) return null;
	const n = parseFloat(String(product.discount_percentage));
	if (!Number.isFinite(n) || n <= 0) return null;
	return `${Math.round(n)}% OFF`;
}

const ShopHome: React.FC = () => {
	const dispatch = useDispatch();
	const shopState = useSelector((state: RootState) => state.shop);
	const [selectedCategory, setSelectedCategory] = useState<string | null>(
		null,
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

	const fetchProducts = useCallback(
		async (filters?: any) => {
			dispatch(fetchProductsRequest());
			try {
				const response = await shopAPI.getProducts(filters);
				dispatch(fetchProductsSuccess(response, response));
			} catch (error: any) {
				dispatch(
					fetchProductsFailure(
						error.message || "Failed to fetch products",
					),
				);
			}
		},
		[dispatch],
	);

	const fetchFeaturedProducts = useCallback(async () => {
		dispatch(fetchFeaturedProductsRequest());
		try {
			const response = await shopAPI.getBestsellerProducts();
			dispatch(fetchFeaturedProductsSuccess(response));
		} catch (error: any) {
			dispatch(
				fetchFeaturedProductsFailure(
					error.message || "Failed to fetch bestseller products",
				),
			);
		}
	}, [dispatch]);

	const fetchCategories = useCallback(async () => {
		dispatch(fetchCategoriesRequest());
		try {
			const response = await shopAPI.getProductCategories();
			dispatch(fetchCategoriesSuccess(response));
		} catch (error: any) {
			dispatch(
				fetchCategoriesFailure(
					error.message || "Failed to fetch categories",
				),
			);
		}
	}, [dispatch]);

	useEffect(() => {
		// Fetch initial data
		fetchProducts();
		fetchFeaturedProducts();
		fetchCategories();
	}, [fetchProducts, fetchFeaturedProducts, fetchCategories]);

	const handleAddToCart = async (productId: number, quantity: number) => {
		// Cart is handled entirely with Redux - no API calls needed
		dispatch(addToCartRequest());
		try {
			// Find the product in the current products list
			const product = products.items.find((p) => p.id === productId);
			if (product) {
				// Check if product already exists in cart
				const existingItemIndex = cart.items.findIndex(
					(item: any) => item.product === productId,
				);

				let updatedItems;
				let newTotalItems;
				let newTotalPrice;

				if (existingItemIndex >= 0) {
					// Update existing item quantity
					updatedItems = cart.items.map(
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
						},
					);
					newTotalItems = cart.totalItems + quantity;
					newTotalPrice = (
						parseFloat(cart.totalPrice) +
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
						total_price: (
							parseFloat(product.price) * quantity
						).toFixed(2),
					};
					updatedItems = [...cart.items, cartItem];
					newTotalItems = cart.totalItems + quantity;
					newTotalPrice = (
						parseFloat(cart.totalPrice) +
						parseFloat(cartItem.total_price)
					).toFixed(2);
				}

				// Update Redux state directly
				dispatch(
					addToCartSuccess({
						items: updatedItems,
						total_items: newTotalItems,
						total_price: newTotalPrice,
					}),
				);
			}
		} catch (error: any) {
			dispatch(
				addToCartFailure(error.message || "Failed to add item to cart"),
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
				{ results: [], count: 0, next: null, previous: null },
			),
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
				<p className="mx-auto mb-8 max-w-3xl font-fredoka text-lg leading-relaxed text-highland lg:text-xl hidden lg:block">
					Everything you’ll need for your new furry friend.
					<br />
					Quality picks to help them feel happy, safe, and right at
					home.
				</p>

				<p className="mx-auto mb-8 max-w-3xl font-fredoka text-lg leading-relaxed text-highland lg:text-xl lg:hidden">
					Everything you’ll need for your new furry friend. Quality
					picks to help them feel happy, safe, and right at home.
				</p>

				<div
					className="mx-auto mb-2 max-w-4xl overflow-hidden rounded-2xl lg:rounded-full border border-highland/25 bg-gradient-to-r from-highland to-sark shadow-[0_10px_40px_rgba(11,37,69,0.14)]"
					role="region"
					aria-label="Shop benefits"
				>
					<ul className="flex flex-col divide-y divide-honeydew/20 sm:flex-row sm:divide-x sm:divide-y-0">
						<li className="flex flex-1 items-center justify-center gap-3 px-5 py-4 sm:py-5">
							<span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-honeydew/20 text-honeydew">
								<FontAwesomeIcon
									icon={faTruckFast}
									className="text-lg"
									aria-hidden
								/>
							</span>
							<span className="text-left font-poppins text-sm font-semibold leading-snug text-honeydew sm:text-base">
								Free UK shipping
							</span>
						</li>
						<li className="flex flex-1 items-center justify-center gap-3 px-5 py-4 sm:py-5">
							<span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-honeydew/20 text-honeydew">
								<FontAwesomeIcon
									icon={faGem}
									className="text-lg"
									aria-hidden
								/>
							</span>
							<span className="text-left font-poppins text-sm font-semibold leading-snug text-honeydew sm:text-base">
								Premium quality
							</span>
						</li>
						<li className="flex flex-1 items-center justify-center gap-3 px-5 py-4 sm:py-5">
							<span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-honeydew/20 text-honeydew">
								<FontAwesomeIcon
									icon={faClipboardList}
									className="text-lg"
									aria-hidden
								/>
							</span>
							<span className="text-left font-poppins text-sm font-semibold leading-snug text-honeydew sm:text-base">
								Expert curated
							</span>
						</li>
					</ul>
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

						<div className="flex flex-wrap items-stretch justify-center gap-6">
							{featuredProducts.items
								?.slice(0, 4)
								.map((product) => {
									const discountLabel =
										getProductDiscountLabel(product);
									return (
										<div
											key={product.id}
											className="group flex h-full min-h-[26rem] w-full max-w-sm shrink-0 flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-tara to-mintCream shadow-lg transition-all duration-300 hover:shadow-xl sm:min-h-[26rem] sm:w-72"
										>
											<div className="relative h-48 w-full shrink-0 overflow-hidden bg-gradient-to-br from-highland/20 to-sark/20">
												{product.primary_image ? (
													<img
														src={
															product.primary_image
														}
														alt={product.name}
														className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
													/>
												) : (
													<div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-sprout/45 via-tara/35 to-mintCream/50 px-3 text-center">
														<FontAwesomeIcon
															icon={faImage}
															className="text-5xl text-highland/30"
															aria-hidden
														/>
													</div>
												)}
												{discountLabel && (
													<div className="absolute left-2 top-2 z-10 rounded-full bg-gradient-to-r from-highland to-sark px-3 py-1 font-poppins text-xs font-bold text-honeydew shadow-md">
														{discountLabel}
													</div>
												)}
												<div className="absolute right-2 top-2 z-10 rounded-full bg-gradient-to-r from-highland to-sark px-3 py-1 font-poppins text-xs font-bold text-honeydew shadow-md">
													Bestseller
												</div>
											</div>
											<div className="flex min-h-0 flex-1 flex-col p-4">
												<div className="min-h-0 flex-1">
													{product.brand && (
														<div className="mb-2">
															<span className="font-poppins text-sm font-medium text-oxfordBlue/70">
																{product.brand}
															</span>
														</div>
													)}
													<h3 className="mb-0 line-clamp-2 font-delius text-lg font-semibold text-oxfordBlue transition-colors group-hover:text-highland">
														{product.name}
													</h3>
												</div>
												<div className="mt-auto shrink-0 pt-4">
													<div className="mb-3 flex items-center gap-2">
														<span className="font-poppins text-xl font-bold text-oxfordBlue">
															£
															{parseFloat(
																product.price,
															).toFixed(2)}
														</span>
														{product.compare_price && (
															<span className="font-poppins text-sm text-oxfordBlue/50 line-through">
																£
																{parseFloat(
																	product.compare_price,
																).toFixed(2)}
															</span>
														)}
													</div>
													<button
														type="button"
														onClick={() =>
															handleAddToCart(
																product.id,
																1,
															)
														}
														disabled={
															!product.is_in_stock
														}
														className={`w-full rounded-full px-4 py-2 font-fredoka font-semibold transition-all duration-300 ${
															product.is_in_stock
																? "btn-primary"
																: "cursor-not-allowed bg-gray-300 text-gray-500"
														}`}
													>
														{product.is_in_stock
															? "Add to Cart"
															: "Out of Stock"}
													</button>
												</div>
											</div>
										</div>
									);
								})}
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
								className="group flex items-center space-x-2 text-highland hover:text-sark font-poppins font-semibold transition-colors"
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
													cat.code ===
													selectedCategory,
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
														selectedCategory,
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

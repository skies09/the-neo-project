import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "../../services/shopApi";

interface ProductListProps {
	products: Product[];
	loading?: boolean;
	onAddToCart?: (productId: number, quantity: number) => void;
	showFilters?: boolean;
	onFilterChange?: (filters: any) => void;
	categories?: Array<{ code: string; name: string; product_count: number }>;
	currentFilters?: any;
}

const ProductList: React.FC<ProductListProps> = ({
	products,
	loading = false,
	onAddToCart,
	showFilters = false,
	onFilterChange,
	categories = [],
	currentFilters = {},
}) => {
	// Ensure products is always an array
	const safeProducts = Array.isArray(products) ? products : [];

	// Ensure categories is always an array
	const safeCategories = Array.isArray(categories) ? categories : [];
	const handleCategoryChange = (category: string) => {
		if (onFilterChange) {
			onFilterChange({ ...currentFilters, category, page: 1 });
		}
	};

	const handleSearchChange = (search: string) => {
		if (onFilterChange) {
			onFilterChange({ ...currentFilters, search, page: 1 });
		}
	};

	const handleBestsellerToggle = (bestseller: boolean) => {
		if (onFilterChange) {
			onFilterChange({ ...currentFilters, bestseller, page: 1 });
		}
	};

	const handleInStockToggle = (in_stock: boolean) => {
		if (onFilterChange) {
			onFilterChange({ ...currentFilters, in_stock, page: 1 });
		}
	};

	const clearFilters = () => {
		if (onFilterChange) {
			onFilterChange({
				category: "",
				bestseller: false,
				in_stock: false,
				search: "",
				min_price: null,
				max_price: null,
				page: 1,
				page_size: 20,
			});
		}
	};

	if (loading) {
		return (
			<div className="flex justify-center items-center py-12">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-highland border-t-transparent"></div>
			</div>
		);
	}

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			{/* Filters at the top */}
			{showFilters && (
				<div className="bg-gradient-to-br from-tara to-mintCream rounded-2xl shadow-xl p-6 mb-8 border-2 border-oxfordBlue/10">
					<div className="flex justify-between items-center mb-6">
						<h3 className="text-lg font-semibold text-oxfordBlue font-delius">
							Filters
						</h3>
						<button
							onClick={clearFilters}
							className="text-sm text-highland hover:text-sark font-poppins font-semibold transition-colors"
						>
							Clear All
						</button>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
						{/* Search */}
						<div>
							<label className="block text-sm font-medium text-oxfordBlue mb-2 font-poppins">
								Search
							</label>
							<input
								type="text"
								value={currentFilters?.search || ""}
								onChange={(e) =>
									handleSearchChange(e.target.value)
								}
								placeholder="Search products..."
								className="w-full px-3 py-2 border-2 border-oxfordBlue/20 rounded-full focus:outline-none focus:ring-2 focus:ring-highland focus:border-highland bg-white/80 font-poppins"
							/>
						</div>

						{/* Categories */}
						<div>
							<label className="block text-sm font-medium text-oxfordBlue mb-2 font-poppins">
								Category
							</label>
							<select
								value={currentFilters?.category || ""}
								onChange={(e) =>
									handleCategoryChange(e.target.value)
								}
								className="w-full px-3 py-2 border-2 border-oxfordBlue/20 rounded-full focus:outline-none focus:ring-2 focus:ring-highland focus:border-highland bg-white/80 font-poppins"
							>
								<option value="">All Categories</option>
								{safeCategories.map((category) => (
									<option
										key={category.code}
										value={category.code}
									>
										{category.name} (
										{category.product_count})
									</option>
								))}
							</select>
						</div>

						{/* Bestseller Products */}
						<div className="flex items-center">
							<label className="flex items-center cursor-pointer">
								<input
									type="checkbox"
									checked={
										currentFilters?.bestseller || false
									}
									onChange={(e) =>
										handleBestsellerToggle(e.target.checked)
									}
									className="rounded border-oxfordBlue/30 text-highland focus:ring-highland w-5 h-5"
								/>
								<span className="ml-2 text-sm text-oxfordBlue font-poppins">
									Bestseller Products
								</span>
							</label>
						</div>

						{/* In Stock Only */}
						<div className="flex items-center">
							<label className="flex items-center cursor-pointer">
								<input
									type="checkbox"
									checked={currentFilters?.in_stock || false}
									onChange={(e) =>
										handleInStockToggle(e.target.checked)
									}
									className="rounded border-oxfordBlue/30 text-highland focus:ring-highland w-5 h-5"
								/>
								<span className="ml-2 text-sm text-oxfordBlue font-poppins">
									In Stock Only
								</span>
							</label>
						</div>
					</div>
				</div>
			)}

			{/* Products Grid */}
			<div>
				{safeProducts.length === 0 ? (
					<div className="text-center py-12">
						<div className="bg-gradient-to-br from-tara to-mintCream rounded-2xl shadow-xl p-8 max-w-2xl mx-auto border-2 border-oxfordBlue/10">
							<div className="text-oxfordBlue text-lg mb-4 font-delius font-bold">
								No products found
							</div>
							<p className="text-oxfordBlue/70 font-poppins">
								Try adjusting your filters or search terms.
							</p>
						</div>
					</div>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{safeProducts.map((product) => (
							<ProductCard
								key={product.id}
								product={product}
								onAddToCart={onAddToCart}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default ProductList;

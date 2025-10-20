import React from "react";
import { ProductCategory } from "../../services/shopApi";

interface CategoryGridProps {
	categories: ProductCategory[];
	loading?: boolean;
	onCategorySelect?: (categoryCode: string) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({
	categories,
	loading = false,
	onCategorySelect,
}) => {
	// Ensure categories is always an array
	const safeCategories = Array.isArray(categories) ? categories : [];


	if (loading) {
		return (
			<div className="flex justify-center items-center py-12">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-skyBlue"></div>
			</div>
		);
	}

	if (safeCategories.length === 0) {
		return (
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="text-center">
					<h2 className="text-3xl font-bold text-gray-800 mb-4">
						Shop by Category
					</h2>
					<p className="text-lg text-gray-600 mb-8">
						No categories available at the moment.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div className="text-center mb-12">
				<h2 className="text-3xl font-bold text-gray-800 mb-4">
					Shop by Category
				</h2>
				<p className="text-lg text-gray-600">
					Choose a category to browse our products
				</p>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{safeCategories.map((category) => (
					<button
						key={category.code}
						onClick={() => onCategorySelect?.(category.code)}
						className="group relative overflow-hidden bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
					>
						<div className="p-8 text-center">
					{/* Category visual removed (emoji icons removed) */}

							{/* Category Name */}
							<h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-skyBlue transition-colors duration-200">
								{category.name}
							</h3>

							{/* Product Count */}
							<p className="text-sm text-gray-500">
								{category.product_count}{" "}
								{category.product_count === 1
									? "product"
									: "products"}
							</p>

							{/* Hover Effect */}
							<div className="absolute inset-0 bg-gradient-to-br from-skyBlue/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
						</div>
					</button>
				))}
			</div>

			{/* View All Products Option */}
			<div className="text-center mt-12">
				<button
					onClick={() => onCategorySelect?.("")}
					className="group relative overflow-hidden bg-gradient-to-r from-skyBlue to-blue-600 text-white px-8 py-4 rounded-xl font-poppins font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
				>
					<div className="flex items-center space-x-3 relative z-10">
						<span>View All Products</span>
						<svg
							className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 5l7 7-7 7"
							/>
						</svg>
					</div>
					<div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-aquamarine opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
				</button>
			</div>
		</div>
	);
};

export default CategoryGrid;

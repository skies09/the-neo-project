import React from "react";
import { motion } from "framer-motion";
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
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-highland border-t-transparent"></div>
			</div>
		);
	}

	if (safeCategories.length === 0) {
		return (
			<motion.div
				className="max-w-7xl mx-auto min-h-screen"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{
					duration: 0.6,
					delay: 0.3,
					ease: "easeOut",
				}}
			>
				<div className="flex flex-col justify-center items-center py-12 bg-gradient-to-br from-tara to-mintCream rounded-3xl shadow-xl border-2 border-oxfordBlue/20">
					<p className="text-lg lg:text-xl text-oxfordBlue font-poppins max-w-5xl mx-auto text-center">
						Shop currently unavailable, please try again later
					</p>
				</div>
			</motion.div>
		);
	}

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div className="text-center mb-12">
				<h2 className="text-3xl font-bold text-oxfordBlue font-delius mb-4">
					Shop by Category
				</h2>
				<p className="text-lg text-highland font-fredoka">
					Choose a category to browse our products
				</p>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{safeCategories.map((category) => (
					<button
						key={category.code}
						onClick={() => onCategorySelect?.(category.code)}
						className="group relative overflow-hidden bg-gradient-to-br from-tara to-mintCream rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
					>
						<div className="p-8 text-center">
							{/* Category visual removed (emoji icons removed) */}

							{/* Category Name */}
							<h3 className="text-xl font-semibold text-oxfordBlue mb-2 group-hover:text-highland transition-colors duration-200 font-delius">
								{category.name}
							</h3>

							{/* Product Count */}
							<p className="text-sm text-oxfordBlue/60 font-poppins">
								{category.product_count}{" "}
								{category.product_count === 1
									? "product"
									: "products"}
							</p>

							{/* Hover Effect */}
							<div className="absolute inset-0 bg-gradient-to-br from-highland/10 to-sark/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
						</div>
					</button>
				))}
			</div>

			{/* View All Products Option */}
			<div className="text-center mt-12">
				<button
					onClick={() => onCategorySelect?.("")}
					className="group relative overflow-hidden bg-gradient-to-r from-highland to-sark text-honeydew px-8 py-4 rounded-full font-fredoka font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:text-sunset"
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
				</button>
			</div>
		</div>
	);
};

export default CategoryGrid;

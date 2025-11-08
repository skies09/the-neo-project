import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../../services/shopApi";

interface ProductCardProps {
	product: Product;
	onAddToCart?: (productId: number, quantity: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
	const handleAddToCart = () => {
		if (onAddToCart && product.is_in_stock) {
			onAddToCart(product.id, 1);
		}
	};

	const formatPrice = (price: string) => {
		return `£${parseFloat(price).toFixed(2)}`;
	};

	const getDiscountPercentage = () => {
		if (
			product.discount_percentage &&
			parseFloat(product.discount_percentage.toString()) > 0
		) {
			const discount = Math.round(
				parseFloat(product.discount_percentage.toString())
			);
			return `${discount}% OFF`;
		}
		return null;
	};

	const hasValidDiscount = () => {
		return (
			product.discount_percentage &&
			parseFloat(product.discount_percentage.toString()) > 0
		);
	};

	const getCategoryDisplay = (category: string) => {
		const categoryMap: { [key: string]: string } = {
			FOOD: "Dog Food",
			TOYS: "Toys",
			ACCESSORIES: "Accessories",
			HEALTH: "Health & Wellness",
			GROOMING: "Grooming",
			TRAINING: "Training",
			BEDDING: "Bedding",
			TRAVEL: "Travel",
			SAFETY: "Safety",
			OTHER: "Other",
		};
		return categoryMap[category] || category;
	};

	return (
		<div className="bg-gradient-to-br from-tara to-mintCream rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col">
			{/* Product Image */}
			<div className="relative h-72 bg-gradient-to-br from-highland/20 to-sark/20">
				<Link to={`/shop/products/${product.id}`}>
					{/* <img
            src={product.primary_image || '/images/dog1.jpg'}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          /> */}
				</Link>

				{/* Bestseller Badge */}
				{product.is_bestseller && (
					<div className="absolute top-2 right-2 bg-gradient-to-r from-highland to-sark text-honeydew px-3 py-1 rounded-full text-xs font-bold font-poppins shadow-md z-10">
						Bestseller
					</div>
				)}

				{/* Stock Status */}
				{!product.is_in_stock && (
					<div className="absolute inset-0 bg-black/50 rounded-t-2xl flex items-center justify-center">
						<span className="text-white font-semibold text-lg font-poppins">
							Out of Stock
						</span>
					</div>
				)}
			</div>

			{/* Product Info */}
			<div className="px-6 py-2 relative flex flex-col h-1/2">
				{/* Discount Badge - Moved to product info section */}
				{hasValidDiscount() && (
					<div className="absolute top-4 right-4 bg-gradient-to-r from-highland to-sark text-honeydew px-3 py-1 rounded-full text-xs font-bold font-poppins shadow-md z-10">
						{getDiscountPercentage()}
					</div>
				)}

				<div className="flex-grow flex flex-col">
					{/* Brand - Always render to maintain consistent spacing */}
					<div className="mb-1 min-h-[20px]">
						{product.brand && (
							<span className="text-sm text-oxfordBlue/70 font-medium font-poppins">
								{product.brand}
							</span>
						)}
					</div>

					<Link to={`/shop/products/${product.id}`}>
						<h3
							className={`text-lg font-semibold text-oxfordBlue hover:text-highland transition-colors duration-200 mb-1 line-clamp-2 font-delius ${
								hasValidDiscount() ? "pr-20" : ""
							}`}
						>
							{product.name}
						</h3>
					</Link>

					<div className="mb-2">
						<span className="text-sm text-oxfordBlue/60 font-poppins">
							{getCategoryDisplay(product.category)}
						</span>
					</div>

					{/* Price */}
					<div className="flex items-center gap-2 mt-auto px-2">
						<span className="text-xl font-bold text-oxfordBlue font-poppins">
							{formatPrice(product.price)}
						</span>
						{product.compare_price && (
							<span className="text-sm text-oxfordBlue/50 line-through font-poppins">
								{formatPrice(product.compare_price)}
							</span>
						)}
					</div>
				</div>

				{/* Add to Cart Button - Always at bottom */}
				<div className="mt-2 pb-2">
					<button
						onClick={handleAddToCart}
						disabled={!product.is_in_stock}
						className={`w-full py-2 px-4 rounded-full font-semibold transition-all duration-300 font-fredoka ${
							product.is_in_stock
								? "bg-gradient-to-r from-highland to-sark text-honeydew hover:shadow-lg transform hover:scale-105 hover:text-sunset"
								: "bg-gray-300 text-gray-500 cursor-not-allowed"
						}`}
					>
						{product.is_in_stock ? "Add to Cart" : "Out of Stock"}
					</button>

					{/* Stock Indicator */}
					{product.is_low_stock && product.is_in_stock && (
						<p className="text-orange-600 text-sm mt-2 text-center font-poppins">
							Only {product.stock_quantity} left in stock!
						</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default ProductCard;

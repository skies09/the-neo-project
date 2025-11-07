import React from "react";
import { Link } from "react-router-dom";
import { Cart as CartType } from "../../services/shopApi";

interface CartProps {
	cart: CartType;
	loading?: boolean;
	onUpdateQuantity?: (productId: number, quantity: number) => void;
	onRemoveItem?: (productId: number) => void;
	onClearCart?: () => void;
}

const Cart: React.FC<CartProps> = ({
	cart,
	loading = false,
	onUpdateQuantity,
	onRemoveItem,
	onClearCart,
}) => {
	const formatPrice = (price: string | number) => {
		const numPrice = typeof price === "string" ? parseFloat(price) : price;
		if (isNaN(numPrice)) return "£0.00";
		return `£${numPrice.toFixed(2)}`;
	};

	const handleQuantityChange = (productId: number, newQuantity: number) => {
		if (onUpdateQuantity && newQuantity > 0) {
			onUpdateQuantity(productId, newQuantity);
		}
	};

	const handleRemoveItem = (productId: number) => {
		if (onRemoveItem) {
			onRemoveItem(productId);
		}
	};

	const handleClearCart = () => {
		if (
			onClearCart &&
			window.confirm("Are you sure you want to clear your cart?")
		) {
			onClearCart();
		}
	};

	if (loading) {
		return (
			<div className="flex justify-center items-center py-12">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-skyBlue"></div>
			</div>
		);
	}

	if (cart.items.length === 0) {
		return (
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="text-center py-12">
					<div className="text-gray-500 text-lg mb-4">
						Your cart is empty
					</div>
					<p className="text-gray-400 mb-8">
						Add some products to get started!
					</p>
					<Link
						to="/shop"
						className="inline-block bg-skyBlue text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-600 transition-colors duration-200"
					>
						Continue Shopping
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-bold text-gray-800">
					Shopping Cart
				</h1>
				<button
					onClick={handleClearCart}
					className="text-red-600 hover:text-red-700 font-medium"
				>
					Clear Cart
				</button>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Cart Items */}
				<div className="lg:col-span-2">
					<div className="bg-white rounded-lg shadow-md overflow-hidden">
						{cart.items.map((item: any, index: number) => (
							<div
								key={item.product || index}
								className="border-b border-gray-200 last:border-b-0"
							>
								<div className="p-6">
									<div className="flex items-center space-x-4">
										{/* Product Image */}
										<div className="flex-shrink-0">
											{/* <img
												src="/images/dog1.jpg"
												alt={
													item.product_name ||
													"Product"
												}
												className="w-20 h-20 object-cover rounded-md"
											/> */}
										</div>

										{/* Product Info */}
										<div className="flex-1 min-w-0">
											<div className="text-lg font-semibold text-gray-800">
												{item.product_name || "Product"}
											</div>
										</div>

										{/* Price and Quantity */}
										<div className="flex items-center space-x-4">
											{/* Quantity Controls */}
											<div className="flex items-center space-x-2">
												<button
													onClick={() =>
														handleQuantityChange(
															item.product,
															item.quantity - 1
														)
													}
													className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors duration-200"
													disabled={
														item.quantity <= 1
													}
												>
													<span className="text-gray-600">
														-
													</span>
												</button>
												<span className="w-8 text-center font-medium">
													{item.quantity || 0}
												</span>
												<button
													onClick={() =>
														handleQuantityChange(
															item.product,
															item.quantity + 1
														)
													}
													className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors duration-200"
												>
													<span className="text-gray-600">
														+
													</span>
												</button>
											</div>

											{/* Price */}
											<div className="text-right">
												<div className="text-lg font-semibold text-gray-800">
													{formatPrice(
														item.total_price
													)}
												</div>
												<div className="text-sm text-gray-500">
													{formatPrice(item.price)}{" "}
													each
												</div>
											</div>

											{/* Remove Button */}
											<button
												onClick={() =>
													handleRemoveItem(
														item.product
													)
												}
												className="text-red-600 hover:text-red-700 p-2"
												title="Remove item"
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
														d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
													/>
												</svg>
											</button>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Order Summary */}
				<div className="lg:col-span-1">
					<div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
						<h2 className="text-xl font-semibold text-gray-800 mb-4">
							Order Summary
						</h2>

						<div className="space-y-3 mb-6">
							<div className="flex justify-between">
								<span className="text-gray-600">
									Items (
									{cart.total_items || cart.totalItems || 0})
								</span>
								<span className="font-medium">
									{formatPrice(
										cart.total_price ||
											cart.totalPrice ||
											"0"
									)}
								</span>
							</div>
							<div className="flex justify-between">
								<span className="text-gray-600">Shipping</span>
								<span className="font-medium">£4.99</span>
							</div>
							<div className="flex justify-between">
								<span className="text-gray-600">
									Tax (20% VAT)
								</span>
								<span className="font-medium">
									{formatPrice(
										(
											parseFloat(
												cart.total_price ||
													cart.totalPrice ||
													"0"
											) * 0.2
										).toFixed(2)
									)}
								</span>
							</div>
							<div className="border-t border-gray-200 pt-3">
								<div className="flex justify-between">
									<span className="text-lg font-semibold text-gray-800">
										Total
									</span>
									<span className="text-lg font-semibold text-gray-800">
										{formatPrice(
											(
												parseFloat(
													cart.total_price ||
														cart.totalPrice ||
														"0"
												) +
												4.99 +
												parseFloat(
													cart.total_price ||
														cart.totalPrice ||
														"0"
												) *
													0.2
											).toFixed(2)
										)}
									</span>
								</div>
							</div>
						</div>

						<Link
							to="/shop/checkout"
							className="w-full bg-skyBlue text-white py-3 px-4 rounded-md font-semibold text-center block hover:bg-blue-600 transition-colors duration-200 mb-4"
						>
							Proceed to Checkout
						</Link>

						<Link
							to="/shop"
							className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-md font-semibold text-center block hover:bg-gray-50 transition-colors duration-200"
						>
							Continue Shopping
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cart;

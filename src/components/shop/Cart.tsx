import React, { useState } from "react";
import { Link } from "react-router-dom";
import ConfirmModal from "../modals/ConfirmModal";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

interface CartProps {
	cart: {
		items: any[];
		totalItems?: number;
		totalPrice?: string;
		total_items?: number;
		total_price?: string;
		loading?: boolean;
		error?: any;
	};
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
	const [showClearModal, setShowClearModal] = useState(false);

	const formatPrice = (price: string | number) => {
		const numPrice = typeof price === "string" ? parseFloat(price) : price;
		if (isNaN(numPrice)) return "£0.00";
		return `£${numPrice.toFixed(2)}`;
	};

	const handleQuantityChange = (productId: number, newQuantity: number) => {
		if (onUpdateQuantity) {
			onUpdateQuantity(productId, newQuantity);
		}
	};

	const handleRemoveItem = (productId: number) => {
		if (onRemoveItem) {
			onRemoveItem(productId);
		}
	};

	const handleClearCart = () => {
		setShowClearModal(true);
	};

	const handleConfirmClear = () => {
		if (onClearCart) {
			onClearCart();
		}
	};

	if (loading) {
		return (
			<div className="flex justify-center items-center py-12">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-highland border-t-transparent"></div>
			</div>
		);
	}

	if (cart.items.length === 0) {
		return (
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="text-center py-12">
					<div className="bg-gradient-to-br from-tara to-mintCream rounded-2xl shadow-xl p-8 max-w-2xl mx-auto border-2 border-oxfordBlue/10">
						<div className="text-oxfordBlue text-lg mb-4 font-delius font-bold">
							Your cart is empty
						</div>
						<p className="text-oxfordBlue/70 mb-8 font-poppins">
							Add some products to get started!
						</p>
						<Link
							to="/shop"
							className="inline-block bg-gradient-to-r from-highland to-sark text-honeydew px-6 py-3 rounded-full font-fredoka font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:text-sunset"
						>
							Continue Shopping
						</Link>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-bold text-oxfordBlue font-delius">
					Shopping Cart
				</h1>
				<button
					onClick={handleClearCart}
					className="text-red-600 hover:text-red-700 font-medium font-poppins transition-colors"
				>
					Clear Cart
				</button>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Cart Items */}
				<div className="lg:col-span-2">
					<div className="bg-gradient-to-br from-tara to-mintCream rounded-2xl shadow-xl overflow-hidden border-2 border-oxfordBlue/10">
						{cart.items.map((item: any, index: number) => (
							<div
								key={item.id || `${item.product}-${index}` || index}
								className="border-b border-oxfordBlue/20 last:border-b-0"
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
											<div className="text-lg font-semibold text-oxfordBlue font-delius">
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
													className="w-8 h-8 rounded-full border-2 border-oxfordBlue/20 flex items-center justify-center hover:bg-oxfordBlue hover:text-honeydew transition-all duration-300"
												>
													<span className="text-oxfordBlue font-poppins">
														-
													</span>
												</button>
												<span className="w-8 text-center font-medium font-poppins text-oxfordBlue">
													{item.quantity || 0}
												</span>
												<button
													onClick={() =>
														handleQuantityChange(
															item.product,
															item.quantity + 1
														)
													}
													className="w-8 h-8 rounded-full border-2 border-oxfordBlue/20 flex items-center justify-center hover:bg-oxfordBlue hover:text-honeydew transition-all duration-300"
												>
													<span className="text-oxfordBlue font-poppins">
														+
													</span>
												</button>
											</div>

											{/* Price */}
											<div className="text-right">
												<div className="text-lg font-semibold text-oxfordBlue font-poppins">
													{formatPrice(
														item.total_price
													)}
												</div>
												<div className="text-sm text-oxfordBlue/60 font-poppins">
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
												className="text-red-600 hover:text-red-700 p-2 transition-colors"
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
					<div className="bg-gradient-to-br from-tara to-mintCream rounded-2xl shadow-xl p-6 sticky top-4 border-2 border-oxfordBlue/10">
						<h2 className="text-xl font-semibold text-oxfordBlue mb-4 font-delius">
							Order Summary
						</h2>

						<div className="space-y-3 mb-6">
							<div className="flex justify-between">
								<span className="text-oxfordBlue/70 font-poppins">
									Items (
									{cart.total_items || cart.totalItems || 0})
								</span>
								<span className="font-medium font-poppins text-oxfordBlue">
									{formatPrice(
										cart.total_price ||
											cart.totalPrice ||
											"0"
									)}
								</span>
							</div>
							<div className="flex justify-between">
								<span className="text-oxfordBlue/70 font-poppins">Shipping</span>
								<span className="font-medium font-poppins text-oxfordBlue">£4.99</span>
							</div>
							<div className="flex justify-between">
								<span className="text-oxfordBlue/70 font-poppins">
									Tax (20% VAT)
								</span>
								<span className="font-medium font-poppins text-oxfordBlue">
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
							<div className="border-t border-oxfordBlue/20 pt-3">
								<div className="flex justify-between">
									<span className="text-lg font-semibold text-oxfordBlue font-delius">
										Total
									</span>
									<span className="text-lg font-semibold text-oxfordBlue font-poppins">
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
							className="w-full bg-gradient-to-r from-highland to-sark text-honeydew py-3 px-4 rounded-full font-fredoka font-semibold text-center block hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:text-sunset mb-4"
						>
							Proceed to Checkout
						</Link>

						<Link
							to="/shop"
							className="w-full border-2 border-oxfordBlue text-oxfordBlue py-3 px-4 rounded-full font-fredoka font-semibold text-center block hover:bg-oxfordBlue hover:text-honeydew transition-all duration-300 bg-gradient-to-r from-tara to-mintCream"
						>
							Continue Shopping
						</Link>
					</div>
				</div>
			</div>

			{/* Clear Cart Modal */}
			<ConfirmModal
				isOpen={showClearModal}
				onClose={() => setShowClearModal(false)}
				onConfirm={handleConfirmClear}
				title="Clear Cart?"
				message="Are you sure you want to clear your cart? This action cannot be undone."
				icon={faExclamationTriangle}
				confirmText="Clear Cart"
				cancelText="Cancel"
				confirmButtonStyle="danger"
			/>
		</div>
	);
};

export default Cart;

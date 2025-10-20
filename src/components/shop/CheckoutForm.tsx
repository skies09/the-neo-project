import React, { useState } from "react";
import { Cart } from "../../services/shopApi";

interface CheckoutFormProps {
	cart: Cart;
	loading?: boolean;
	onSubmit?: (orderData: any) => void;
	appliedCoupon?: any;
	onApplyCoupon?: (code: string) => void;
	onRemoveCoupon?: () => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
	cart,
	loading = false,
	onSubmit,
	appliedCoupon,
	onApplyCoupon,
	onRemoveCoupon,
}) => {
	const [formData, setFormData] = useState({
		shipping_first_name: "",
		shipping_last_name: "",
		shipping_address: "",
		shipping_city: "",
		shipping_county: "ENGLAND",
		shipping_postal_code: "",
		shipping_country: "United Kingdom",
		shipping_phone: "",
		billing_first_name: "",
		billing_last_name: "",
		billing_address: "",
		billing_city: "",
		billing_county: "ENGLAND",
		billing_postal_code: "",
		billing_country: "United Kingdom",
		notes: "",
	});

	const [couponCode, setCouponCode] = useState("");
	const [useSameAddress, setUseSameAddress] = useState(true);
	const [errors, setErrors] = useState<Record<string, string>>({});

	const ukCounties = [
		{ value: "ENGLAND", label: "England" },
		{ value: "SCOTLAND", label: "Scotland" },
		{ value: "WALES", label: "Wales" },
		{ value: "NORTHERN_IRELAND", label: "Northern Ireland" },
	];

	const formatPrice = (price: string | number) => {
		const numPrice = typeof price === "string" ? parseFloat(price) : price;
		if (isNaN(numPrice)) return "£0.00";
		return `£${numPrice.toFixed(2)}`;
	};

	const calculateTotal = () => {
		const subtotal = parseFloat(cart.total_price || cart.totalPrice || "0");
		const shipping = 4.99;
		const discount = appliedCoupon
			? parseFloat(appliedCoupon.discount_amount || "0")
			: 0;
		const tax = (subtotal - discount) * 0.2; // 20% VAT
		return (subtotal + shipping + tax - discount).toFixed(2);
	};

	const handleInputChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		// Clear error when user starts typing
		if (errors[name]) {
			setErrors((prev) => ({
				...prev,
				[name]: "",
			}));
		}
	};

	const handleUseSameAddressChange = (checked: boolean) => {
		setUseSameAddress(checked);
		if (checked) {
			setFormData((prev) => ({
				...prev,
				billing_first_name: prev.shipping_first_name,
				billing_last_name: prev.shipping_last_name,
				billing_address: prev.shipping_address,
				billing_city: prev.shipping_city,
				billing_county: prev.shipping_county,
				billing_postal_code: prev.shipping_postal_code,
				billing_country: prev.shipping_country,
			}));
		}
	};

	const validateForm = () => {
		const newErrors: Record<string, string> = {};

		// Required fields
		const requiredFields = [
			"shipping_first_name",
			"shipping_last_name",
			"shipping_address",
			"shipping_city",
			"shipping_postal_code",
			"shipping_phone",
		];

		requiredFields.forEach((field) => {
			if (!formData[field as keyof typeof formData]) {
				newErrors[field] = "This field is required";
			}
		});

		// UK postcode validation
		const ukPostcodeRegex = /^[A-Z]{1,2}[0-9R][0-9A-Z]? [0-9][A-Z]{2}$/i;
		if (
			formData.shipping_postal_code &&
			!ukPostcodeRegex.test(formData.shipping_postal_code)
		) {
			newErrors.shipping_postal_code = "Please enter a valid UK postcode";
		}

		if (!useSameAddress) {
			const billingRequiredFields = [
				"billing_first_name",
				"billing_last_name",
				"billing_address",
				"billing_city",
				"billing_postal_code",
			];

			billingRequiredFields.forEach((field) => {
				if (!formData[field as keyof typeof formData]) {
					newErrors[field] = "This field is required";
				}
			});

			if (
				formData.billing_postal_code &&
				!ukPostcodeRegex.test(formData.billing_postal_code)
			) {
				newErrors.billing_postal_code =
					"Please enter a valid UK postcode";
			}
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (validateForm() && onSubmit) {
			onSubmit(formData);
		}
	};

	const handleApplyCoupon = () => {
		if (couponCode.trim() && onApplyCoupon) {
			onApplyCoupon(couponCode.trim());
			setCouponCode("");
		}
	};

	if (loading) {
		return (
			<div className="flex justify-center items-center py-12">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-skyBlue"></div>
			</div>
		);
	}

	return (
		<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

			<form
				onSubmit={handleSubmit}
				className="grid grid-cols-1 lg:grid-cols-3 gap-8"
			>
				{/* Shipping Information */}
				<div className="lg:col-span-2 space-y-8">
					{/* Shipping Address */}
					<div className="bg-white rounded-lg shadow-md p-6">
						<h2 className="text-xl font-semibold text-gray-800 mb-6">
							Shipping Information
						</h2>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									First Name *
								</label>
								<input
									type="text"
									name="shipping_first_name"
									value={formData.shipping_first_name}
									onChange={handleInputChange}
									className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-skyBlue focus:border-transparent ${
										errors.shipping_first_name
											? "border-red-500"
											: "border-gray-300"
									}`}
								/>
								{errors.shipping_first_name && (
									<p className="text-red-500 text-sm mt-1">
										{errors.shipping_first_name}
									</p>
								)}
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Last Name *
								</label>
								<input
									type="text"
									name="shipping_last_name"
									value={formData.shipping_last_name}
									onChange={handleInputChange}
									className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-skyBlue focus:border-transparent ${
										errors.shipping_last_name
											? "border-red-500"
											: "border-gray-300"
									}`}
								/>
								{errors.shipping_last_name && (
									<p className="text-red-500 text-sm mt-1">
										{errors.shipping_last_name}
									</p>
								)}
							</div>

							<div className="md:col-span-2">
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Address *
								</label>
								<input
									type="text"
									name="shipping_address"
									value={formData.shipping_address}
									onChange={handleInputChange}
									className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-skyBlue focus:border-transparent ${
										errors.shipping_address
											? "border-red-500"
											: "border-gray-300"
									}`}
								/>
								{errors.shipping_address && (
									<p className="text-red-500 text-sm mt-1">
										{errors.shipping_address}
									</p>
								)}
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									City *
								</label>
								<input
									type="text"
									name="shipping_city"
									value={formData.shipping_city}
									onChange={handleInputChange}
									className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-skyBlue focus:border-transparent ${
										errors.shipping_city
											? "border-red-500"
											: "border-gray-300"
									}`}
								/>
								{errors.shipping_city && (
									<p className="text-red-500 text-sm mt-1">
										{errors.shipping_city}
									</p>
								)}
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									County *
								</label>
								<select
									name="shipping_county"
									value={formData.shipping_county}
									onChange={handleInputChange}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-skyBlue focus:border-transparent"
								>
									{ukCounties.map((county) => (
										<option
											key={county.value}
											value={county.value}
										>
											{county.label}
										</option>
									))}
								</select>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Postal Code *
								</label>
								<input
									type="text"
									name="shipping_postal_code"
									value={formData.shipping_postal_code}
									onChange={handleInputChange}
									placeholder="e.g., SW1A 1AA"
									className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-skyBlue focus:border-transparent ${
										errors.shipping_postal_code
											? "border-red-500"
											: "border-gray-300"
									}`}
								/>
								{errors.shipping_postal_code && (
									<p className="text-red-500 text-sm mt-1">
										{errors.shipping_postal_code}
									</p>
								)}
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Phone Number *
								</label>
								<input
									type="tel"
									name="shipping_phone"
									value={formData.shipping_phone}
									onChange={handleInputChange}
									placeholder="+44 20 7946 0958"
									className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-skyBlue focus:border-transparent ${
										errors.shipping_phone
											? "border-red-500"
											: "border-gray-300"
									}`}
								/>
								{errors.shipping_phone && (
									<p className="text-red-500 text-sm mt-1">
										{errors.shipping_phone}
									</p>
								)}
							</div>
						</div>
					</div>

					{/* Billing Address */}
					<div className="bg-white rounded-lg shadow-md p-6">
						<div className="flex items-center mb-6">
							<input
								type="checkbox"
								id="useSameAddress"
								checked={useSameAddress}
								onChange={(e) =>
									handleUseSameAddressChange(e.target.checked)
								}
								className="rounded border-gray-300 text-skyBlue focus:ring-skyBlue"
							/>
							<label
								htmlFor="useSameAddress"
								className="ml-2 text-sm font-medium text-gray-700"
							>
								Use same address for billing
							</label>
						</div>

						{!useSameAddress && (
							<>
								<h2 className="text-xl font-semibold text-gray-800 mb-6">
									Billing Information
								</h2>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											First Name *
										</label>
										<input
											type="text"
											name="billing_first_name"
											value={formData.billing_first_name}
											onChange={handleInputChange}
											className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-skyBlue focus:border-transparent ${
												errors.billing_first_name
													? "border-red-500"
													: "border-gray-300"
											}`}
										/>
										{errors.billing_first_name && (
											<p className="text-red-500 text-sm mt-1">
												{errors.billing_first_name}
											</p>
										)}
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Last Name *
										</label>
										<input
											type="text"
											name="billing_last_name"
											value={formData.billing_last_name}
											onChange={handleInputChange}
											className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-skyBlue focus:border-transparent ${
												errors.billing_last_name
													? "border-red-500"
													: "border-gray-300"
											}`}
										/>
										{errors.billing_last_name && (
											<p className="text-red-500 text-sm mt-1">
												{errors.billing_last_name}
											</p>
										)}
									</div>

									<div className="md:col-span-2">
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Address *
										</label>
										<input
											type="text"
											name="billing_address"
											value={formData.billing_address}
											onChange={handleInputChange}
											className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-skyBlue focus:border-transparent ${
												errors.billing_address
													? "border-red-500"
													: "border-gray-300"
											}`}
										/>
										{errors.billing_address && (
											<p className="text-red-500 text-sm mt-1">
												{errors.billing_address}
											</p>
										)}
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											City *
										</label>
										<input
											type="text"
											name="billing_city"
											value={formData.billing_city}
											onChange={handleInputChange}
											className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-skyBlue focus:border-transparent ${
												errors.billing_city
													? "border-red-500"
													: "border-gray-300"
											}`}
										/>
										{errors.billing_city && (
											<p className="text-red-500 text-sm mt-1">
												{errors.billing_city}
											</p>
										)}
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											County *
										</label>
										<select
											name="billing_county"
											value={formData.billing_county}
											onChange={handleInputChange}
											className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-skyBlue focus:border-transparent"
										>
											{ukCounties.map((county) => (
												<option
													key={county.value}
													value={county.value}
												>
													{county.label}
												</option>
											))}
										</select>
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Postal Code *
										</label>
										<input
											type="text"
											name="billing_postal_code"
											value={formData.billing_postal_code}
											onChange={handleInputChange}
											placeholder="e.g., SW1A 1AA"
											className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-skyBlue focus:border-transparent ${
												errors.billing_postal_code
													? "border-red-500"
													: "border-gray-300"
											}`}
										/>
										{errors.billing_postal_code && (
											<p className="text-red-500 text-sm mt-1">
												{errors.billing_postal_code}
											</p>
										)}
									</div>
								</div>
							</>
						)}
					</div>

					{/* Order Notes */}
					<div className="bg-white rounded-lg shadow-md p-6">
						<h2 className="text-xl font-semibold text-gray-800 mb-6">
							Order Notes
						</h2>
						<textarea
							name="notes"
							value={formData.notes}
							onChange={handleInputChange}
							rows={4}
							placeholder="Any special instructions for your order..."
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-skyBlue focus:border-transparent"
						/>
					</div>
				</div>

				{/* Order Summary */}
				<div className="lg:col-span-1">
					<div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
						<h2 className="text-xl font-semibold text-gray-800 mb-4">
							Order Summary
						</h2>

						{/* Cart Items */}
						<div className="space-y-3 mb-6">
							{cart.items.map((item: any, index: number) => (
								<div
									key={item.product || index}
									className="flex justify-between text-sm"
								>
									<span className="text-gray-600">
										{item.product_name || "Product"} x{" "}
										{item.quantity || 0}
									</span>
									<span className="font-medium">
										{formatPrice(item.total_price || "0")}
									</span>
								</div>
							))}
						</div>

						{/* Coupon Section */}
						<div className="mb-6">
							{appliedCoupon ? (
								<div className="bg-green-50 border border-green-200 rounded-md p-3">
									<div className="flex justify-between items-center">
										<div>
											<p className="text-sm font-medium text-green-800">
												Coupon: {appliedCoupon.code}
											</p>
											<p className="text-xs text-green-600">
												{appliedCoupon.description}
											</p>
										</div>
										<button
											type="button"
											onClick={onRemoveCoupon}
											className="text-red-600 hover:text-red-700"
										>
											<svg
												className="w-4 h-4"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M6 18L18 6M6 6l12 12"
												/>
											</svg>
										</button>
									</div>
									<p className="text-sm text-green-800 mt-1">
										Discount: -
										{formatPrice(
											appliedCoupon.discount_amount
										)}
									</p>
								</div>
							) : (
								<div>
									<div className="flex space-x-2">
										<input
											type="text"
											value={couponCode}
											onChange={(e) =>
												setCouponCode(e.target.value)
											}
											placeholder="Coupon code"
											className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-skyBlue focus:border-transparent text-sm"
										/>
										<button
											type="button"
											onClick={handleApplyCoupon}
											className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-200 text-sm"
										>
											Apply
										</button>
									</div>
								</div>
							)}
						</div>

						{/* Totals */}
						<div className="space-y-3 mb-6">
							<div className="flex justify-between">
								<span className="text-gray-600">Subtotal</span>
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
											(parseFloat(
												cart.total_price ||
													cart.totalPrice ||
													"0"
											) -
												(appliedCoupon
													? parseFloat(
															appliedCoupon.discount_amount ||
																"0"
													  )
													: 0)) *
											0.2
										).toFixed(2)
									)}
								</span>
							</div>
							{appliedCoupon && (
								<div className="flex justify-between text-green-600">
									<span>Discount</span>
									<span className="font-medium">
										-
										{formatPrice(
											appliedCoupon.discount_amount || "0"
										)}
									</span>
								</div>
							)}
							<div className="border-t border-gray-200 pt-3">
								<div className="flex justify-between">
									<span className="text-lg font-semibold text-gray-800">
										Total
									</span>
									<span className="text-lg font-semibold text-gray-800">
										{formatPrice(calculateTotal())}
									</span>
								</div>
							</div>
						</div>

						<button
							type="submit"
							className="w-full bg-skyBlue text-white py-3 px-4 rounded-md font-semibold hover:bg-blue-600 transition-colors duration-200"
						>
							Place Order
						</button>

						<p className="text-xs text-gray-500 mt-4 text-center">
							By placing this order, you agree to our terms and
							conditions.
						</p>
					</div>
				</div>
			</form>
		</div>
	);
};

export default CheckoutForm;

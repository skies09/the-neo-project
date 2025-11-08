import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCreditCard,
	faCalendarAlt,
	faLock,
	faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
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
	const [cardNumber, setCardNumber] = useState<string>("");
	const [expiryDate, setExpiryDate] = useState<string>("");
	const [cvv, setCvv] = useState<string>("");
	const [cardholderName, setCardholderName] = useState<string>("");
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

	const formatCardNumber = (value: string) => {
		const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
		const matches = v.match(/\d{4,16}/g);
		const match = (matches && matches[0]) || "";
		const parts = [];
		for (let i = 0, len = match.length; i < len; i += 4) {
			parts.push(match.substring(i, i + 4));
		}
		if (parts.length) {
			return parts.join(" ");
		} else {
			return v;
		}
	};

	const formatExpiryDate = (value: string) => {
		const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
		if (v.length >= 2) {
			return v.substring(0, 2) + "/" + v.substring(2, 4);
		}
		return v;
	};

	const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const formatted = formatCardNumber(e.target.value);
		setCardNumber(formatted);
		if (errors.cardNumber) {
			setErrors((prev) => ({
				...prev,
				cardNumber: "",
			}));
		}
	};

	const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const formatted = formatExpiryDate(e.target.value);
		setExpiryDate(formatted);
		if (errors.expiryDate) {
			setErrors((prev) => ({
				...prev,
				expiryDate: "",
			}));
		}
	};

	const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const v = e.target.value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
		if (v.length <= 4) {
			setCvv(v);
		}
		if (errors.cvv) {
			setErrors((prev) => ({
				...prev,
				cvv: "",
			}));
		}
	};

	const handleCardholderNameChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setCardholderName(e.target.value);
		if (errors.cardholderName) {
			setErrors((prev) => ({
				...prev,
				cardholderName: "",
			}));
		}
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

		// Card details validation
		if (!cardholderName.trim()) {
			newErrors.cardholderName = "Cardholder name is required";
		}

		if (!cardNumber || cardNumber.replace(/\s/g, "").length < 16) {
			newErrors.cardNumber = "Please enter a valid card number";
		}

		if (!expiryDate || expiryDate.length < 5) {
			newErrors.expiryDate = "Please enter a valid expiry date (MM/YY)";
		}

		if (!cvv || cvv.length < 3) {
			newErrors.cvv = "Please enter a valid CVV";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (validateForm() && onSubmit) {
			onSubmit({
				...formData,
				cardholder_name: cardholderName,
				card_number: cardNumber.replace(/\s/g, ""),
				expiry_date: expiryDate,
				cvv: cvv,
			});
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
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-highland border-t-transparent"></div>
			</div>
		);
	}

	return (
		<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			{/* Navigation Buttons */}
			<div className="flex flex-col sm:flex-row gap-4 mb-8">
				<Link
					to="/shop/cart"
					className="group flex items-center justify-center space-x-2 text-highland hover:text-sark font-medium font-poppins transition-colors duration-200"
				>
					<FontAwesomeIcon
						icon={faArrowLeft}
						className="text-sm group-hover:-translate-x-1 transition-transform duration-300"
					/>
					<span>Back to Cart</span>
				</Link>
				<Link
					to="/shop"
					className="group flex items-center justify-center space-x-2 bg-gradient-to-r from-tara to-mintCream text-oxfordBlue border-2 border-oxfordBlue px-6 py-3 rounded-full hover:bg-oxfordBlue hover:text-honeydew transition-all duration-300 font-fredoka font-semibold"
				>
					<span>Continue Shopping</span>
				</Link>
			</div>

			<h1 className="text-3xl font-bold text-oxfordBlue font-delius mb-8">
				Checkout
			</h1>

			<form
				onSubmit={handleSubmit}
				className="grid grid-cols-1 lg:grid-cols-3 gap-8"
			>
				{/* Shipping Information */}
				<div className="lg:col-span-2 space-y-8">
					{/* Shipping Address */}
					<div className="bg-gradient-to-br from-tara to-mintCream rounded-2xl shadow-xl p-6 border-2 border-oxfordBlue/10">
						<h2 className="text-xl font-semibold text-oxfordBlue mb-6 font-delius">
							Shipping Information
						</h2>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label className="block text-sm font-medium text-oxfordBlue mb-2 font-poppins">
									First Name *
								</label>
								<input
									type="text"
									name="shipping_first_name"
									value={formData.shipping_first_name}
									onChange={handleInputChange}
									placeholder="John"
									className={`w-full px-3 py-2 border-2 rounded-full focus:outline-none focus:ring-2 focus:ring-highland focus:border-highland bg-white/80 font-poppins ${
										errors.shipping_first_name
											? "border-red-500"
											: "border-oxfordBlue/20"
									}`}
								/>
								{errors.shipping_first_name && (
									<p className="text-red-500 text-sm mt-1">
										{errors.shipping_first_name}
									</p>
								)}
							</div>

							<div>
								<label className="block text-sm font-medium text-oxfordBlue mb-2 font-poppins">
									Last Name *
								</label>
								<input
									type="text"
									name="shipping_last_name"
									value={formData.shipping_last_name}
									onChange={handleInputChange}
									placeholder="Smith"
									className={`w-full px-3 py-2 border-2 rounded-full focus:outline-none focus:ring-2 focus:ring-highland focus:border-highland bg-white/80 font-poppins ${
										errors.shipping_last_name
											? "border-red-500"
											: "border-oxfordBlue/20"
									}`}
								/>
								{errors.shipping_last_name && (
									<p className="text-red-500 text-sm mt-1">
										{errors.shipping_last_name}
									</p>
								)}
							</div>

							<div className="md:col-span-2">
								<label className="block text-sm font-medium text-oxfordBlue mb-2 font-poppins">
									Address *
								</label>
								<input
									type="text"
									name="shipping_address"
									value={formData.shipping_address}
									onChange={handleInputChange}
									placeholder="123 Main Street"
									className={`w-full px-3 py-2 border-2 rounded-full focus:outline-none focus:ring-2 focus:ring-highland focus:border-highland bg-white/80 font-poppins ${
										errors.shipping_address
											? "border-red-500"
											: "border-oxfordBlue/20"
									}`}
								/>
								{errors.shipping_address && (
									<p className="text-red-500 text-sm mt-1">
										{errors.shipping_address}
									</p>
								)}
							</div>

							<div>
								<label className="block text-sm font-medium text-oxfordBlue mb-2 font-poppins">
									City *
								</label>
								<input
									type="text"
									name="shipping_city"
									value={formData.shipping_city}
									onChange={handleInputChange}
									placeholder="London"
									className={`w-full px-3 py-2 border-2 rounded-full focus:outline-none focus:ring-2 focus:ring-highland focus:border-highland bg-white/80 font-poppins ${
										errors.shipping_city
											? "border-red-500"
											: "border-oxfordBlue/20"
									}`}
								/>
								{errors.shipping_city && (
									<p className="text-red-500 text-sm mt-1">
										{errors.shipping_city}
									</p>
								)}
							</div>

							<div>
								<label className="block text-sm font-medium text-oxfordBlue mb-2 font-poppins">
									County *
								</label>
								<select
									name="shipping_county"
									value={formData.shipping_county}
									onChange={handleInputChange}
									className="w-full px-3 py-2 border-2 border-oxfordBlue/20 rounded-full focus:outline-none focus:ring-2 focus:ring-highland focus:border-highland bg-white/80 font-poppins"
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
								<label className="block text-sm font-medium text-oxfordBlue mb-2 font-poppins">
									Postal Code *
								</label>
								<input
									type="text"
									name="shipping_postal_code"
									value={formData.shipping_postal_code}
									onChange={handleInputChange}
									placeholder="e.g., SW1A 1AA"
									className={`w-full px-3 py-2 border-2 rounded-full focus:outline-none focus:ring-2 focus:ring-highland focus:border-highland bg-white/80 font-poppins ${
										errors.shipping_postal_code
											? "border-red-500"
											: "border-oxfordBlue/20"
									}`}
								/>
								{errors.shipping_postal_code && (
									<p className="text-red-500 text-sm mt-1">
										{errors.shipping_postal_code}
									</p>
								)}
							</div>

							<div>
								<label className="block text-sm font-medium text-oxfordBlue mb-2 font-poppins">
									Phone Number *
								</label>
								<input
									type="tel"
									name="shipping_phone"
									value={formData.shipping_phone}
									onChange={handleInputChange}
									placeholder="+44 20 7946 0958"
									className={`w-full px-3 py-2 border-2 rounded-full focus:outline-none focus:ring-2 focus:ring-highland focus:border-highland bg-white/80 font-poppins ${
										errors.shipping_phone
											? "border-red-500"
											: "border-oxfordBlue/20"
									}`}
								/>
								{errors.shipping_phone && (
									<p className="text-red-500 text-sm mt-1">
										{errors.shipping_phone}
									</p>
								)}
							</div>
						</div>

						{/* Use Same Address Checkbox */}
						<div className="flex items-center mt-6 pt-6 border-t border-oxfordBlue/20">
							<input
								type="checkbox"
								id="useSameAddress"
								checked={useSameAddress}
								onChange={(e) =>
									handleUseSameAddressChange(e.target.checked)
								}
								className="rounded border-oxfordBlue/30 text-highland focus:ring-highland w-5 h-5"
							/>
							<label
								htmlFor="useSameAddress"
								className="ml-2 text-sm font-medium text-oxfordBlue font-poppins cursor-pointer"
							>
								Use same address for billing
							</label>
						</div>
					</div>

					{/* Billing Address */}
					{!useSameAddress && (
						<div className="bg-gradient-to-br from-tara to-mintCream rounded-2xl shadow-xl p-6 border-2 border-oxfordBlue/10">
							<h2 className="text-xl font-semibold text-oxfordBlue mb-6 font-delius">
								Billing Information
							</h2>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium text-oxfordBlue mb-2 font-poppins">
										First Name *
									</label>
									<input
										type="text"
										name="billing_first_name"
										value={formData.billing_first_name}
										onChange={handleInputChange}
										placeholder="John"
										className={`w-full px-3 py-2 border-2 rounded-full focus:outline-none focus:ring-2 focus:ring-highland focus:border-highland bg-white/80 font-poppins ${
											errors.billing_first_name
												? "border-red-500"
												: "border-oxfordBlue/20"
										}`}
									/>
									{errors.billing_first_name && (
										<p className="text-red-500 text-sm mt-1">
											{errors.billing_first_name}
										</p>
									)}
								</div>

								<div>
									<label className="block text-sm font-medium text-oxfordBlue mb-2 font-poppins">
										Last Name *
									</label>
									<input
										type="text"
										name="billing_last_name"
										value={formData.billing_last_name}
										onChange={handleInputChange}
										placeholder="Doe"
										className={`w-full px-3 py-2 border-2 rounded-full focus:outline-none focus:ring-2 focus:ring-highland focus:border-highland bg-white/80 font-poppins ${
											errors.billing_last_name
												? "border-red-500"
												: "border-oxfordBlue/20"
										}`}
									/>
									{errors.billing_last_name && (
										<p className="text-red-500 text-sm mt-1">
											{errors.billing_last_name}
										</p>
									)}
								</div>

								<div className="md:col-span-2">
									<label className="block text-sm font-medium text-oxfordBlue mb-2 font-poppins">
										Address *
									</label>
									<input
										type="text"
										name="billing_address"
										value={formData.billing_address}
										onChange={handleInputChange}
										placeholder="123 Main Street"
										className={`w-full px-3 py-2 border-2 rounded-full focus:outline-none focus:ring-2 focus:ring-highland focus:border-highland bg-white/80 font-poppins ${
											errors.billing_address
												? "border-red-500"
												: "border-oxfordBlue/20"
										}`}
									/>
									{errors.billing_address && (
										<p className="text-red-500 text-sm mt-1">
											{errors.billing_address}
										</p>
									)}
								</div>

								<div>
									<label className="block text-sm font-medium text-oxfordBlue mb-2 font-poppins">
										City *
									</label>
									<input
										type="text"
										name="billing_city"
										value={formData.billing_city}
										onChange={handleInputChange}
										placeholder="London"
										className={`w-full px-3 py-2 border-2 rounded-full focus:outline-none focus:ring-2 focus:ring-highland focus:border-highland bg-white/80 font-poppins ${
											errors.billing_city
												? "border-red-500"
												: "border-oxfordBlue/20"
										}`}
									/>
									{errors.billing_city && (
										<p className="text-red-500 text-sm mt-1">
											{errors.billing_city}
										</p>
									)}
								</div>

								<div>
									<label className="block text-sm font-medium text-oxfordBlue mb-2 font-poppins">
										County *
									</label>
									<select
										name="billing_county"
										value={formData.billing_county}
										onChange={handleInputChange}
										className="w-full px-3 py-2 border-2 border-oxfordBlue/20 rounded-full focus:outline-none focus:ring-2 focus:ring-highland focus:border-highland bg-white/80 font-poppins"
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
									<label className="block text-sm font-medium text-oxfordBlue mb-2 font-poppins">
										Postal Code *
									</label>
									<input
										type="text"
										name="billing_postal_code"
										value={formData.billing_postal_code}
										onChange={handleInputChange}
										placeholder="e.g., SW1A 1AA"
										className={`w-full px-3 py-2 border-2 rounded-full focus:outline-none focus:ring-2 focus:ring-highland focus:border-highland bg-white/80 font-poppins ${
											errors.billing_postal_code
												? "border-red-500"
												: "border-oxfordBlue/20"
										}`}
									/>
									{errors.billing_postal_code && (
										<p className="text-red-500 text-sm mt-1">
											{errors.billing_postal_code}
										</p>
									)}
								</div>
							</div>
						</div>
					)}

					{/* Order Notes */}
					<div className="bg-gradient-to-br from-tara to-mintCream rounded-2xl shadow-xl p-6 border-2 border-oxfordBlue/10">
						<h2 className="text-xl font-semibold text-oxfordBlue mb-6 font-delius">
							Order Notes
						</h2>
						<textarea
							name="notes"
							value={formData.notes}
							onChange={handleInputChange}
							rows={4}
							placeholder="Any special instructions for your order..."
							className="w-full px-3 py-2 border-2 border-oxfordBlue/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-highland focus:border-highland bg-white/80 font-poppins"
						/>
					</div>

					{/* Payment Information */}
					<div className="bg-gradient-to-br from-tara to-mintCream rounded-2xl shadow-xl p-6 border-2 border-oxfordBlue/10">
						<div className="flex items-center mb-6">
							<div className="w-10 h-10 bg-gradient-to-br from-highland to-sark rounded-full flex items-center justify-center mr-3 shadow-md">
								<FontAwesomeIcon
									icon={faLock}
									className="text-honeydew"
								/>
							</div>
							<h2 className="text-xl font-semibold text-oxfordBlue font-delius">
								Payment Information
							</h2>
						</div>

						<div className="space-y-4">
							{/* Cardholder Name */}
							<div>
								<label className="block text-sm font-medium text-oxfordBlue mb-2 font-poppins">
									Cardholder Name *
								</label>
								<input
									type="text"
									value={cardholderName}
									onChange={handleCardholderNameChange}
									placeholder="Name on card"
									className={`w-full px-3 py-2 border-2 rounded-full focus:outline-none focus:ring-2 focus:ring-highland focus:border-highland bg-white/80 font-poppins ${
										errors.cardholderName
											? "border-red-500"
											: "border-oxfordBlue/20"
									}`}
								/>
								{errors.cardholderName && (
									<p className="text-red-500 text-sm mt-1 font-poppins">
										{errors.cardholderName}
									</p>
								)}
							</div>

							{/* Card Number */}
							<div>
								<label className="block text-sm font-medium text-oxfordBlue mb-2 font-poppins">
									Card Number *
								</label>
								<div className="relative">
									<FontAwesomeIcon
										icon={faCreditCard}
										className="absolute left-3 top-1/2 transform -translate-y-1/2 text-highland"
									/>
									<input
										type="text"
										value={cardNumber}
										onChange={handleCardNumberChange}
										placeholder="1234 5678 9012 3456"
										maxLength={19}
										className={`w-full pl-10 pr-3 py-2 border-2 rounded-full focus:outline-none focus:ring-2 focus:ring-highland focus:border-highland bg-white/80 font-poppins ${
											errors.cardNumber
												? "border-red-500"
												: "border-oxfordBlue/20"
										}`}
									/>
								</div>
								{errors.cardNumber && (
									<p className="text-red-500 text-sm mt-1 font-poppins">
										{errors.cardNumber}
									</p>
								)}
							</div>

							{/* Expiry and CVV */}
							<div className="grid grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium text-oxfordBlue mb-2 font-poppins">
										Expiry Date *
									</label>
									<div className="relative">
										<FontAwesomeIcon
											icon={faCalendarAlt}
											className="absolute left-3 top-1/2 transform -translate-y-1/2 text-highland"
										/>
										<input
											type="text"
											value={expiryDate}
											onChange={handleExpiryChange}
											placeholder="MM/YY"
											maxLength={5}
											className={`w-full pl-10 pr-3 py-2 border-2 rounded-full focus:outline-none focus:ring-2 focus:ring-highland focus:border-highland bg-white/80 font-poppins ${
												errors.expiryDate
													? "border-red-500"
													: "border-oxfordBlue/20"
											}`}
										/>
									</div>
									{errors.expiryDate && (
										<p className="text-red-500 text-sm mt-1 font-poppins">
											{errors.expiryDate}
										</p>
									)}
								</div>

								<div>
									<label className="block text-sm font-medium text-oxfordBlue mb-2 font-poppins">
										CVV *
									</label>
									<div className="relative">
										<FontAwesomeIcon
											icon={faLock}
											className="absolute left-3 top-1/2 transform -translate-y-1/2 text-highland"
										/>
										<input
											type="text"
											value={cvv}
											onChange={handleCvvChange}
											placeholder="123"
											maxLength={4}
											className={`w-full pl-10 pr-3 py-2 border-2 rounded-full focus:outline-none focus:ring-2 focus:ring-highland focus:border-highland bg-white/80 font-poppins ${
												errors.cvv
													? "border-red-500"
													: "border-oxfordBlue/20"
											}`}
										/>
									</div>
									{errors.cvv && (
										<p className="text-red-500 text-sm mt-1 font-poppins">
											{errors.cvv}
										</p>
									)}
								</div>
							</div>

							{/* Security Note */}
							<div className="flex items-start space-x-2 pt-2">
								<FontAwesomeIcon
									icon={faLock}
									className="text-highland mt-1"
								/>
								<p className="text-xs text-oxfordBlue/60 font-poppins">
									Your payment information is secure and
									encrypted
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Order Summary */}
				<div className="lg:col-span-1">
					<div className="bg-gradient-to-br from-tara to-mintCream rounded-2xl shadow-xl p-6 sticky top-4 border-2 border-oxfordBlue/10">
						<h2 className="text-xl font-semibold text-oxfordBlue mb-4 font-delius">
							Order Summary
						</h2>

						{/* Cart Items */}
						<div className="space-y-3 mb-6">
							{cart.items.map((item: any, index: number) => (
								<div
									key={item.product || index}
									className="flex justify-between text-sm"
								>
									<span className="text-oxfordBlue/70 font-poppins">
										{item.product_name || "Product"} x{" "}
										{item.quantity || 0}
									</span>
									<span className="font-medium font-poppins text-oxfordBlue">
										{formatPrice(item.total_price || "0")}
									</span>
								</div>
							))}
						</div>

						{/* Coupon Section */}
						<div className="mb-6">
							{appliedCoupon ? (
								<div className="bg-green-50 border-2 border-green-200 rounded-full p-3">
									<div className="flex justify-between items-center">
										<div>
											<p className="text-sm font-medium text-green-800 font-poppins">
												Coupon: {appliedCoupon.code}
											</p>
											<p className="text-xs text-green-600 font-poppins">
												{appliedCoupon.description}
											</p>
										</div>
										<button
											type="button"
											onClick={onRemoveCoupon}
											className="text-red-600 hover:text-red-700 transition-colors"
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
									<p className="text-sm text-green-800 mt-1 font-poppins">
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
											className="flex-1 px-3 py-2 border-2 border-oxfordBlue/20 rounded-full focus:outline-none focus:ring-2 focus:ring-highland focus:border-highland bg-white/80 text-sm font-poppins"
										/>
										<button
											type="button"
											onClick={handleApplyCoupon}
											className="px-4 py-2 bg-gradient-to-r from-highland to-sark text-honeydew rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-sm font-fredoka font-semibold"
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
								<span className="text-oxfordBlue/70 font-poppins">
									Subtotal
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
								<span className="text-oxfordBlue/70 font-poppins">
									Shipping
								</span>
								<span className="font-medium font-poppins text-oxfordBlue">
									£4.99
								</span>
							</div>
							<div className="flex justify-between">
								<span className="text-oxfordBlue/70 font-poppins">
									Tax (20% VAT)
								</span>
								<span className="font-medium font-poppins text-oxfordBlue">
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
									<span className="font-poppins">
										Discount
									</span>
									<span className="font-medium font-poppins">
										-
										{formatPrice(
											appliedCoupon.discount_amount || "0"
										)}
									</span>
								</div>
							)}
							<div className="border-t border-oxfordBlue/20 pt-3">
								<div className="flex justify-between">
									<span className="text-lg font-semibold text-oxfordBlue font-delius">
										Total
									</span>
									<span className="text-lg font-semibold text-oxfordBlue font-poppins">
										{formatPrice(calculateTotal())}
									</span>
								</div>
							</div>
						</div>

						<button
							type="submit"
							className="w-full bg-gradient-to-r from-highland to-sark text-honeydew py-3 px-4 rounded-full font-fredoka font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:text-sunset"
						>
							Place Order
						</button>

						<p className="text-xs text-oxfordBlue/60 mt-4 text-center font-poppins">
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

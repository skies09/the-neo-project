import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faHeart,
	faPaw,
	faGift,
	faHandHoldingHeart,
	faPoundSign,
	faShieldAlt,
	faCheckCircle,
	faCreditCard,
	faCalendarAlt,
	faLock,
} from "@fortawesome/free-solid-svg-icons";
import { useToast } from "../components/ToastContainer";

const Donate: React.FC = () => {
	const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
	const [customAmount, setCustomAmount] = useState<string>("");
	const [isDonating, setIsDonating] = useState(false);
	const [donorName, setDonorName] = useState<string>("");
	const [donorEmail, setDonorEmail] = useState<string>("");
	const [cardNumber, setCardNumber] = useState<string>("");
	const [expiryDate, setExpiryDate] = useState<string>("");
	const [cvv, setCvv] = useState<string>("");
	const [cardholderName, setCardholderName] = useState<string>("");
	const { showToast } = useToast();

	const sectionRef = useRef(null);
	const sectionInView = useInView(sectionRef, {
		once: true,
		margin: "-100px",
	});

	const presetAmounts = [25, 50, 100];

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
	};

	const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const formatted = formatExpiryDate(e.target.value);
		setExpiryDate(formatted);
	};

	const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const v = e.target.value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
		if (v.length <= 4) {
			setCvv(v);
		}
	};

	const handleDonate = async () => {
		const amount = selectedAmount || parseFloat(customAmount);
		if (!amount || amount <= 0) {
			showToast({
				type: "error",
				title: "Invalid Amount",
				message: "Please select or enter a donation amount.",
			});
			return;
		}

		if (!cardNumber || cardNumber.replace(/\s/g, "").length < 16) {
			showToast({
				type: "error",
				title: "Invalid Card",
				message: "Please enter a valid card number.",
			});
			return;
		}

		if (!expiryDate || expiryDate.length < 5) {
			showToast({
				type: "error",
				title: "Invalid Expiry",
				message: "Please enter a valid expiry date (MM/YY).",
			});
			return;
		}

		if (!cvv || cvv.length < 3) {
			showToast({
				type: "error",
				title: "Invalid CVV",
				message: "Please enter a valid CVV.",
			});
			return;
		}

		if (!cardholderName.trim()) {
			showToast({
				type: "error",
				title: "Missing Information",
				message: "Please enter the cardholder name.",
			});
			return;
		}

		setIsDonating(true);

		// Simulate donation process
		setTimeout(() => {
			setIsDonating(false);
			showToast({
				type: "success",
				title: "Thank You!",
				message: `Thank you ${
					donorName || cardholderName || "for your donation"
				} of £${amount}! Your contribution helps rescue dogs find their forever homes.`,
			});
			setSelectedAmount(null);
			setCustomAmount("");
			setDonorName("");
			setDonorEmail("");
			setCardNumber("");
			setExpiryDate("");
			setCvv("");
			setCardholderName("");
		}, 2000);
	};

	return (
		<div className="min-h-screen bg-mintCream">
			<motion.div
				ref={sectionRef}
				className="pt-20 pb-8 px-4"
				initial={{ opacity: 0 }}
				animate={sectionInView ? { opacity: 1 } : { opacity: 0 }}
				transition={{ duration: 0.8, ease: "easeOut" }}
			>
				<div className="max-w-7xl mx-auto">
					{/* Header */}
					<motion.div
						className="text-center mb-16"
						initial={{ opacity: 0, y: -20 }}
						animate={
							sectionInView
								? { opacity: 1, y: 0 }
								: { opacity: 0, y: -20 }
						}
						transition={{
							duration: 0.6,
							delay: 0.2,
							ease: "easeOut",
						}}
					>
						<div className="flex justify-center items-center my-4">
							<h1 className="font-delius text-4xl md:text-6xl lg:text-7xl font-bold text-oxfordBlue drop-shadow-md text-center">
								Support Rescue Dogs
							</h1>
						</div>
						<p className="text-lg lg:text-xl text-highland font-fredoka max-w-3xl mx-auto">
							Every donation helps us provide care, medical
							treatment, and love to rescue dogs waiting for their
							forever homes. Your contribution makes a real
							difference in a dog's life.
						</p>
					</motion.div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
						{/* Left Column - Donation Form */}
						<motion.div
							className="bg-tomThumb rounded-3xl shadow-xl p-8 lg:p-10"
							initial={{ opacity: 0, x: -50 }}
							animate={
								sectionInView
									? { opacity: 1, x: 0 }
									: { opacity: 0, x: -50 }
							}
							transition={{
								duration: 0.8,
								delay: 0.3,
								ease: "easeOut",
							}}
						>
							<h2 className="text-3xl font-bold text-tara font-delius mb-8 text-center">
								Make a Donation
							</h2>

							{/* Donor Information */}
							<div className="mb-6 space-y-4">
								<div>
									<label className="block text-tara font-poppins font-semibold mb-2">
										Your Name (Optional)
									</label>
									<input
										type="text"
										value={donorName}
										onChange={(e) =>
											setDonorName(e.target.value)
										}
										placeholder="Enter your name"
										className="w-full px-4 py-3 border-2 border-oxfordBlue rounded-full font-poppins focus:outline-none transition-colors"
									/>
								</div>
								<div>
									<label className="block text-tara font-poppins font-semibold mb-2">
										Your Email (Optional)
									</label>
									<input
										type="email"
										value={donorEmail}
										onChange={(e) =>
											setDonorEmail(e.target.value)
										}
										placeholder="Enter your email"
										className="w-full px-4 py-3 border-2 border-oxfordBlue rounded-full font-poppins focus:outline-none transition-colors"
									/>
								</div>
							</div>

							{/* Preset Amounts */}
							<div className="mb-6">
								<label className="block text-tara font-poppins font-semibold mb-3">
									Choose an amount
								</label>
								<div className="grid grid-cols-3 gap-3">
									{presetAmounts.map((amount) => (
										<button
											key={amount}
											onClick={() => {
												setSelectedAmount(amount);
												setCustomAmount("");
											}}
											className={`p-4 rounded-full font-poppins font-semibold transition-all duration-300  bg-gradient-to-r from-tara to-mintCream text-oxfordBlue border-2 border-oxfordBlue ${
												selectedAmount === amount
													? "text-yellowOrange shadow-lg transform scale-105"
													: "text-honeydew hover:bg-titan hover:shadow-md"
											}`}
										>
											£{amount}
										</button>
									))}
								</div>
							</div>

							{/* Custom Amount */}
							<div className="mb-6">
								<label className="block text-tara font-poppins font-semibold mb-3">
									Or enter a custom amount
								</label>
								<div className="relative">
									<FontAwesomeIcon
										icon={faPoundSign}
										className="absolute left-4 top-1/2 transform -translate-y-1/2 text-oxfordBlue/80"
									/>
									<input
										type="number"
										value={customAmount}
										onChange={(e) => {
											setCustomAmount(e.target.value);
											setSelectedAmount(null);
										}}
										placeholder="Enter amount"
										min="1"
										step="0.01"
										className="w-full pl-10 pr-4 py-3 border-2 border-oxfordBlue rounded-full font-poppins focus:border-aquamarine focus:outline-none transition-colors bg-white/80"
									/>
								</div>
							</div>

							{/* Payment Details Section */}
							<div className="mb-6 border-t-2 border-oxfordBlue/20 pt-6">
								<h3 className="text-xl font-bold text-tara font-delius mb-4 flex items-center">
									<FontAwesomeIcon
										icon={faCreditCard}
										className="mr-2"
									/>
									Payment Details
								</h3>

								<div className="space-y-4">
									{/* Cardholder Name */}
									<div>
										<label className="block text-tara font-poppins font-semibold mb-2">
											Cardholder Name <span className="text-red-500">*</span>
										</label>
										<input
											type="text"
											value={cardholderName}
											onChange={(e) =>
												setCardholderName(e.target.value)
											}
											placeholder="Name on card"
											className="w-full px-4 py-3 border-2 border-oxfordBlue rounded-full font-poppins focus:outline-none focus:border-highland transition-colors bg-white/80"
											required
										/>
									</div>

									{/* Card Number */}
									<div>
										<label className="block text-tara font-poppins font-semibold mb-2">
											Card Number <span className="text-red-500">*</span>
										</label>
										<div className="relative">
											<FontAwesomeIcon
												icon={faCreditCard}
												className="absolute left-4 top-1/2 transform -translate-y-1/2 text-oxfordBlue/80"
											/>
											<input
												type="text"
												value={cardNumber}
												onChange={handleCardNumberChange}
												placeholder="1234 5678 9012 3456"
												maxLength={19}
												className="w-full pl-10 pr-4 py-3 border-2 border-oxfordBlue rounded-full font-poppins focus:outline-none focus:border-highland transition-colors bg-white/80"
												required
											/>
										</div>
									</div>

									{/* Expiry and CVV */}
									<div className="grid grid-cols-2 gap-4">
										<div>
											<label className="block text-tara font-poppins font-semibold mb-2">
												Expiry Date <span className="text-red-500">*</span>
											</label>
											<div className="relative">
												<FontAwesomeIcon
													icon={faCalendarAlt}
													className="absolute left-4 top-1/2 transform -translate-y-1/2 text-oxfordBlue/80"
												/>
												<input
													type="text"
													value={expiryDate}
													onChange={handleExpiryChange}
													placeholder="MM/YY"
													maxLength={5}
													className="w-full pl-10 pr-4 py-3 border-2 border-oxfordBlue rounded-full font-poppins focus:outline-none focus:border-highland transition-colors bg-white/80"
													required
												/>
											</div>
										</div>
										<div>
											<label className="block text-tara font-poppins font-semibold mb-2">
												CVV <span className="text-red-500">*</span>
											</label>
											<div className="relative">
												<FontAwesomeIcon
													icon={faLock}
													className="absolute left-4 top-1/2 transform -translate-y-1/2 text-oxfordBlue/80"
												/>
												<input
													type="text"
													value={cvv}
													onChange={handleCvvChange}
													placeholder="123"
													maxLength={4}
													className="w-full pl-10 pr-4 py-3 border-2 border-oxfordBlue rounded-full font-poppins focus:outline-none focus:border-highland transition-colors bg-white/80"
													required
												/>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* Security Badge */}
							<div className="mb-6 flex items-center justify-center space-x-2 text-tara">
								<FontAwesomeIcon
									icon={faShieldAlt}
									className="text-lg"
								/>
								<span className="text-sm font-poppins">
									Secure payment • 100% goes to rescue centers
								</span>
							</div>

							{/* Donate Button */}
							<button
								onClick={handleDonate}
								disabled={
									isDonating ||
									(!selectedAmount && !customAmount) ||
									!cardNumber ||
									!expiryDate ||
									!cvv ||
									!cardholderName
								}
								className="w-full group relative overflow-hidden bg-gradient-to-r from-highland to-sark text-honeydew px-8 py-4 rounded-full text-lg font-fredoka font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:text-sunset disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:text-honeydew"
							>
								<div className="flex items-center justify-center space-x-3 relative z-10">
									{isDonating ? (
										<>
											<div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
											<span>Processing...</span>
										</>
									) : (
										<>
											<FontAwesomeIcon
												icon={faHeart}
												className="text-lg"
											/>
											<span>Donate Now</span>
										</>
									)}
								</div>
								<div className="absolute inset-0 bg-gradient-to-r from-turquoise to-skyBlue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
							</button>

							{/* Image below donation form */}
							<motion.div
								className="mt-8"
								initial={{ opacity: 0, y: 20 }}
								animate={
									sectionInView
										? { opacity: 1, y: 0 }
										: { opacity: 0, y: 20 }
								}
								transition={{
									duration: 0.8,
									delay: 0.5,
									ease: "easeOut",
								}}
							>
								<div className="bg-white rounded-3xl shadow-xl overflow-hidden">
									<div className="aspect-[4/3] overflow-hidden">
										<img
											src="/images/donateImages/dog8.jpg"
											alt="Happy adopted rescue dog"
											className="w-full h-full object-cover"
										/>
									</div>
								</div>
							</motion.div>
						</motion.div>

						{/* Right Column - Impact Information */}
						<motion.div
							className="space-y-8"
							initial={{ opacity: 0, x: 50 }}
							animate={
								sectionInView
									? { opacity: 1, x: 0 }
									: { opacity: 0, x: 50 }
							}
							transition={{
								duration: 0.8,
								delay: 0.4,
								ease: "easeOut",
							}}
						>
							{/* Impact Image - Desktop (above) */}
							<div className="hidden lg:block bg-white rounded-3xl shadow-xl overflow-hidden">
								<div className="aspect-[4/3] overflow-hidden">
									<img
										src="/images/donateImages/dog10.jpg"
										alt="Rescue dog being cared for"
										className="w-full h-full object-cover shadow-2xl"
									/>
								</div>
							</div>

							{/* Impact Stats */}
							<div className="bg-tomThumb rounded-3xl shadow-xl p-8">
								<h3 className="text-2xl font-bold text-tara font-poppins mb-8 text-center">
									Your Impact
								</h3>
								<div className="space-y-6">
									<div className="flex items-center space-x-4">
										<div className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0">
											<FontAwesomeIcon
												icon={faHandHoldingHeart}
												className="text-2xl text-tara"
											/>
										</div>
										<div>
											<div className="text-2xl font-bold text-tara font-poppins">
												£25
											</div>
											<div className="text-tara font-poppins">
												Feeds a rescue dog for a week
											</div>
										</div>
									</div>
									<div className="flex items-center space-x-4">
										<div className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0">
											<FontAwesomeIcon
												icon={faHeart}
												className="text-2xl text-tara"
											/>
										</div>
										<div>
											<div className="text-2xl font-bold text-tara font-poppins">
												£50
											</div>
											<div className="text-tara font-poppins">
												Covers essential veterinary care
											</div>
										</div>
									</div>
									<div className="flex items-center space-x-4">
										<div className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0">
											<FontAwesomeIcon
												icon={faGift}
												className="text-2xl text-tara"
											/>
										</div>
										<div>
											<div className="text-2xl font-bold text-tara font-poppins">
												£100
											</div>
											<div className="text-tara font-poppins">
												Sponsors a dog's adoption
												journey
											</div>
										</div>
									</div>
									<div className="flex items-center space-x-4">
										<div className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0">
											<FontAwesomeIcon
												icon={faPaw}
												className="text-2xl text-tara"
											/>
										</div>
										<div>
											<div className="text-2xl font-bold text-tara font-poppins">
												£250+
											</div>
											<div className="text-tara font-poppins">
												Supports multiple dogs'
												rehabilitation
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* Impact Image - Mobile (below) */}
							<div className="block lg:hidden bg-white rounded-3xl shadow-xl overflow-hidden">
								<div className="aspect-[4/3] overflow-hidden">
									<img
										src="/images/donateImages/dog10.jpg"
										alt="Rescue dog being cared for"
										className="w-full h-full object-cover"
									/>
								</div>
							</div>

							{/* Why Donate */}
							<div className="rounded-3xl p-8">
								<h4 className="text-2xl font-bold text-oxfordBlue font-poppins mb-6">
									Why Your Donation Matters
								</h4>
								<ul className="space-y-4 text-oxfordBlue font-poppins">
									<li className="flex items-start space-x-3">
										<FontAwesomeIcon
											icon={faCheckCircle}
											className="text-oxfordBlue mt-1 text-lg"
										/>
										<span>
											Provides essential medical care,
											vaccinations, and spay/neuter
											services
										</span>
									</li>
									<li className="flex items-start space-x-3">
										<FontAwesomeIcon
											icon={faCheckCircle}
											className="text-oxfordBlue mt-1 text-lg"
										/>
										<span>
											Supports rescue center operations
											and daily care for dogs
										</span>
									</li>
									<li className="flex items-start space-x-3">
										<FontAwesomeIcon
											icon={faCheckCircle}
											className="text-oxfordBlue mt-1 text-lg"
										/>
										<span>
											Helps with training, rehabilitation,
											and behavioral support
										</span>
									</li>
									<li className="flex items-start space-x-3">
										<FontAwesomeIcon
											icon={faCheckCircle}
											className="text-oxfordBlue mt-1 text-lg"
										/>
										<span>
											Enables more dogs to find their
											perfect forever homes
										</span>
									</li>
									<li className="flex items-start space-x-3">
										<FontAwesomeIcon
											icon={faCheckCircle}
											className="text-oxfordBlue mt-1 text-lg"
										/>
										<span>
											100% of donations go directly to
											rescue centers and dog care
										</span>
									</li>
								</ul>
							</div>

							{/* Trust Badge */}
							<div className="bg-tomThumb rounded-3xl shadow-xl p-8 text-center">
								<FontAwesomeIcon
									icon={faShieldAlt}
									className="text-4xl text-tara mb-4"
								/>
								<h4 className="text-xl font-bold text-tara font-poppins mb-2">
									Secure & Transparent
								</h4>
								<p className="text-tara font-poppins text-sm">
									All donations are processed securely. We
									ensure 100% of your contribution goes
									directly to supporting rescue dogs and their
									care.
								</p>
							</div>
						</motion.div>
					</div>

					{/* Image Gallery Section */}
					<motion.div
						className="mt-20 mb-12"
						initial={{ opacity: 0, y: 20 }}
						animate={
							sectionInView
								? { opacity: 1, y: 0 }
								: { opacity: 0, y: 20 }
						}
						transition={{
							duration: 0.6,
							delay: 0.6,
							ease: "easeOut",
						}}
					>
						<h2 className="text-3xl font-bold text-oxfordBlue font-delius mb-8 text-center">
							Dogs You're Helping
						</h2>
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
							<div className="aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
								<img
									src="/images/donateImages/dog4.jpg"
									alt="Rescue dog waiting for adoption"
									className="w-full h-full object-cover"
								/>
							</div>
							<div className="aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
								<img
									src="/images/donateImages/dog3.jpg"
									alt="Rescue dog waiting for adoption"
									className="w-full h-full object-cover"
								/>
							</div>
							<div className="aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
								<img
									src="/images/donateImages/dog22.jpg"
									alt="Rescue dog waiting for adoption"
									className="w-full h-full object-cover"
								/>
							</div>
							<div className="aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
								<img
									src="/images/donateImages/dog18.jpg"
									alt="Rescue dog waiting for adoption"
									className="w-full h-full object-cover"
								/>
							</div>
						</div>
					</motion.div>
				</div>
			</motion.div>
		</div>
	);
};

export default Donate;

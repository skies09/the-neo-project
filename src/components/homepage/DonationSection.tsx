import React, { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faHeart,
	faPaw,
	faGift,
	faHandHoldingHeart,
	faPoundSign,
} from "@fortawesome/free-solid-svg-icons";

const DonationSection: React.FC = () => {
	const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
	const [customAmount, setCustomAmount] = useState<string>("");
	const [isDonating, setIsDonating] = useState(false);

	const presetAmounts = [25, 50, 100];

	const handleDonate = async () => {
		const amount = selectedAmount || parseFloat(customAmount);
		if (!amount || amount <= 0) return;

		setIsDonating(true);

		// Simulate donation process
		setTimeout(() => {
			setIsDonating(false);
			alert(
				`Thank you for your donation of £${amount}! Your contribution helps rescue dogs find their forever homes.`
			);
			setSelectedAmount(null);
			setCustomAmount("");
		}, 2000);
	};

	return (
		<section className="py-20 bg-mintCream">
			<div className="max-w-6xl mx-auto px-4">
				{/* Section Header */}
				<motion.div
					className="text-center mb-16"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: "easeOut" }}
				>
					<div className="flex justify-center items-center mb-4">
						<FontAwesomeIcon
							icon={faHandHoldingHeart}
							className="text-4xl text-skyBlue mr-4"
						/>
						<h2 className="font-comic text-4xl lg:text-5xl font-bold text-oxfordBlue tracking-wider drop-shadow-md">
							Support Rescue Dogs
						</h2>
						<FontAwesomeIcon
							icon={faHandHoldingHeart}
							className="text-4xl text-skyBlue ml-4"
						/>
					</div>
					<p className="text-lg text-oxfordBlue/70 font-poppins max-w-3xl mx-auto">
						Help us provide care, medical treatment, and love to
						rescue dogs waiting for their forever homes. Every
						donation makes a difference in a dog's life.
					</p>
				</motion.div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					{/* Left Column - Donation Form */}
					<motion.div
						className="bg-white rounded-3xl shadow-xl p-8"
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, ease: "easeOut" }}
					>
						<h3 className="text-2xl font-bold text-oxfordBlue font-poppins mb-6 text-center">
							Make a Donation
						</h3>

						{/* Preset Amounts */}
						<div className="mb-6">
							<label className="block text-oxfordBlue font-poppins font-semibold mb-3">
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
										className={`p-3 rounded-xl font-poppins font-semibold transition-all duration-300 ${
											selectedAmount === amount
												? "bg-gradient-to-r from-aquamarine to-turquoise text-white shadow-lg"
												: "bg-gray-100 text-oxfordBlue hover:bg-aquamarine/20 hover:shadow-md"
										}`}
									>
										£{amount}
									</button>
								))}
							</div>
						</div>

						{/* Custom Amount */}
						<div className="mb-6">
							<label className="block text-oxfordBlue font-poppins font-semibold mb-3">
								Or enter a custom amount
							</label>
							<div className="relative">
								<FontAwesomeIcon
									icon={faPoundSign}
									className="absolute left-4 top-1/2 transform -translate-y-1/2 text-oxfordBlue/60"
								/>
								<input
									type="number"
									value={customAmount}
									onChange={(e) => {
										setCustomAmount(e.target.value);
										setSelectedAmount(null);
									}}
									placeholder="Enter amount"
									className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl font-poppins focus:border-aquamarine focus:outline-none transition-colors"
								/>
							</div>
						</div>

						{/* Donate Button */}
						<button
							onClick={handleDonate}
							disabled={
								isDonating || (!selectedAmount && !customAmount)
							}
							className="w-full group relative overflow-hidden bg-gradient-to-r from-aquamarine to-turquoise text-white px-8 py-4 rounded-xl font-poppins font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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

						<p className="text-sm text-oxfordBlue/60 font-poppins text-center mt-4">
							Your donation is secure and goes directly to rescue
							centers
						</p>
					</motion.div>

					{/* Right Column - Impact Information */}
					<motion.div
						className="space-y-8"
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{
							duration: 0.8,
							delay: 0.2,
							ease: "easeOut",
						}}
					>
						{/* Impact Stats */}
						<div className="bg-white rounded-3xl shadow-xl p-8">
							<h3 className="text-2xl font-bold text-oxfordBlue font-poppins mb-6 text-center">
								Your Impact
							</h3>
							<div className="space-y-6">
								<div className="flex items-center space-x-4">
									<div className="w-12 h-12 bg-gradient-to-br from-aquamarine to-turquoise rounded-full flex items-center justify-center">
										<FontAwesomeIcon
											icon={faHandHoldingHeart}
											className="text-xl text-white"
										/>
									</div>
									<div>
										<div className="text-2xl font-bold text-oxfordBlue font-poppins">
											£25
										</div>
										<div className="text-oxfordBlue/70 font-poppins text-sm">
											Feeds a rescue dog for a week
										</div>
									</div>
								</div>
								<div className="flex items-center space-x-4">
									<div className="w-12 h-12 bg-gradient-to-br from-turquoise to-skyBlue rounded-full flex items-center justify-center">
										<FontAwesomeIcon
											icon={faHeart}
											className="text-xl text-white"
										/>
									</div>
									<div>
										<div className="text-2xl font-bold text-oxfordBlue font-poppins">
											£50
										</div>
										<div className="text-oxfordBlue/70 font-poppins text-sm">
											Covers essential veterinary care
										</div>
									</div>
								</div>
								<div className="flex items-center space-x-4">
									<div className="w-12 h-12 bg-gradient-to-br from-skyBlue to-aquamarine rounded-full flex items-center justify-center">
										<FontAwesomeIcon
											icon={faGift}
											className="text-xl text-white"
										/>
									</div>
									<div>
										<div className="text-2xl font-bold text-oxfordBlue font-poppins">
											£100
										</div>
										<div className="text-oxfordBlue/70 font-poppins text-sm">
											Sponsors a dog's adoption journey
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Why Donate */}
						<div className="bg-gradient-to-br from-aquamarine/10 to-turquoise/10 rounded-3xl p-8">
							<h4 className="text-xl font-bold text-oxfordBlue font-poppins mb-4">
								Why Your Donation Matters
							</h4>
							<ul className="space-y-3 text-oxfordBlue/70 font-poppins">
								<li className="flex items-start space-x-3">
									<FontAwesomeIcon
										icon={faPaw}
										className="text-aquamarine mt-1"
									/>
									<span>
										Provides medical care and vaccinations
									</span>
								</li>
								<li className="flex items-start space-x-3">
									<FontAwesomeIcon
										icon={faPaw}
										className="text-aquamarine mt-1"
									/>
									<span>
										Supports rescue center operations
									</span>
								</li>
								<li className="flex items-start space-x-3">
									<FontAwesomeIcon
										icon={faPaw}
										className="text-aquamarine mt-1"
									/>
									<span>
										Helps with training and rehabilitation
									</span>
								</li>
								<li className="flex items-start space-x-3">
									<FontAwesomeIcon
										icon={faPaw}
										className="text-aquamarine mt-1"
									/>
									<span>
										Enables more dogs to find loving homes
									</span>
								</li>
							</ul>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default DonationSection;

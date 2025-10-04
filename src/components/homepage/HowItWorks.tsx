import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faSearch,
	faHeart,
	faHome,
	faPaw,
} from "@fortawesome/free-solid-svg-icons";

const HowItWorks: React.FC = () => {
	const steps = [
		{
			icon: faSearch,
			title: "Browse & Search",
			description:
				"Explore our database of rescue dogs. Use our advanced filters to find the perfect match for your lifestyle.",
			image: "Step 1 Image",
		},
		{
			icon: faHeart,
			title: "Connect & Meet",
			description:
				"Get in touch with the rescue center. Arrange to meet your potential new family member in person.",
			image: "Step 2 Image",
		},
		{
			icon: faHome,
			title: "Adopt & Love",
			description:
				"Complete the adoption process and welcome your new best friend into their forever home.",
			image: "Step 3 Image",
		},
	];

	return (
		<section className="py-20 bg-gradient-to-br from-honeydew to-mintCream">
			<div className="max-w-7xl mx-auto px-4">
				{/* Section Header */}
				<motion.div
					className="text-center mb-16"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: "easeOut" }}
				>
					<div className="flex justify-center items-center mb-4">
						<FontAwesomeIcon
							icon={faPaw}
							className="text-4xl text-skyBlue mr-4"
						/>
						<h2 className="font-poppins text-4xl lg:text-5xl font-bold text-oxfordBlue tracking-wider drop-shadow-md">
							How It Works
						</h2>
						<FontAwesomeIcon
							icon={faPaw}
							className="text-4xl text-skyBlue ml-4"
						/>
					</div>
					<p className="text-lg text-oxfordBlue/70 font-poppins max-w-2xl mx-auto">
						Our simple 3-step process makes finding and adopting
						your perfect dog easy and stress-free.
					</p>
				</motion.div>

				{/* Steps Grid */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{steps.map((step, index) => (
						<motion.div
							key={index}
							className="relative"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.6,
								delay: 0.2 + index * 0.1,
								ease: "easeOut",
							}}
						>
							{/* Step Number */}
							{/* <div className="absolute -top-4 -left-4 z-10">
								<div className="w-12 h-12 bg-gradient-to-br from-skyBlue to-aquamarine rounded-full flex items-center justify-center shadow-lg">
									<span className="text-white font-poppins font-bold text-lg">
										{index + 1}
									</span>
								</div>
							</div> */}

							{/* Step Card */}
							<div className="bg-white rounded-3xl shadow-xl p-8 h-full transform hover:scale-105 transition-transform duration-300">
								{/* Step Image */}
								<div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg mb-6 bg-gray-100">
									{index === 0 ? (
										// Step 1 - Browse & Search
										<img
											src="/images/dog1.jpg"
											alt="Person browsing dogs on computer"
											className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
											style={{
												imageRendering: "auto",
											}}
										/>
									) : index === 1 ? (
										// Step 2 - Connect & Meet
										<img
											src="/images/dog2.jpg"
											alt="Person meeting a dog at rescue center"
											className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
											style={{
												imageRendering: "auto",
											}}
										/>
									) : (
										// Step 3 - Adopt & Love
										<img
											src="/images/dog4.jpg"
											alt="Happy family with their adopted dog"
											className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
											style={{
												imageRendering: "auto",
											}}
										/>
									)}
								</div>

								{/* Step Content */}
								<div className="text-center">
									<div className="w-16 h-16 bg-gradient-to-br from-skyBlue to-aquamarine rounded-full flex items-center justify-center mx-auto mb-4">
										<FontAwesomeIcon
											icon={step.icon}
											className="text-2xl text-white"
										/>
									</div>
									<h3 className="text-2xl font-bold text-oxfordBlue font-poppins mb-3">
										{step.title}
									</h3>
									<p className="text-oxfordBlue/70 font-poppins leading-relaxed">
										{step.description}
									</p>
								</div>
							</div>

							{/* Connecting Arrow (except for last step) */}
							{index < steps.length - 1 && (
								<div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
									<FontAwesomeIcon
										icon={faPaw}
										className="text-2xl text-skyBlue/60"
									/>
								</div>
							)}
						</motion.div>
					))}
				</div>

				{/* Call to Action */}
				<motion.div
					className="text-center mt-16"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
				>
					<button className="group relative overflow-hidden bg-gradient-to-r from-oxfordBlue to-skyBlue text-honeydew px-8 py-4 rounded-xl font-poppins font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
						<div className="flex items-center space-x-3 relative z-10">
							<FontAwesomeIcon
								icon={faSearch}
								className="text-lg"
							/>
							<span>Start Your Search</span>
						</div>
						<div className="absolute inset-0 bg-gradient-to-r from-skyBlue to-aquamarine opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
					</button>
				</motion.div>
			</div>
		</section>
	);
};

export default HowItWorks;

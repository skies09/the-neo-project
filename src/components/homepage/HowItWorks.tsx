import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faHeart, faHome } from "@fortawesome/free-solid-svg-icons";

const HowItWorks: React.FC = () => {
	const navigate = useNavigate();
	const cardsRef = useRef(null);
	const cardsInView = useInView(cardsRef, { once: true, margin: "-100px" });
	const [hasAnimated, setHasAnimated] = useState(false);

	useEffect(() => {
		if (cardsInView && !hasAnimated) {
			setHasAnimated(true);
		}
	}, [cardsInView, hasAnimated]);

	const steps = [
		{
			icon: faSearch,
			title: "Browse & Search",
			description:
				"Find your perfect rescue dog with our advanced search engine — or browse all the amazing dogs waiting for their forever homes.",
			image: "Step 1 Image",
		},
		{
			icon: faHeart,
			title: "Connect & Meet",
			description:
				"Get in touch with the rescue center and meet your future furry companion in person and find out if it’s love at first wag.",
			image: "Step 2 Image",
		},
		{
			icon: faHome,
			title: "Adopt & Love",
			description:
				"Finalize the adoption and give a rescue their forever home — where every tail wag begins a new story.",
			image: "Step 3 Image",
		},
	];

	return (
		<section className="py-20 bg-gradient-to-br from-twilight to-sprout">
			<div className="max-w-7xl mx-auto px-4">
				{/* Section Header */}
				<motion.div
					className="text-center mb-4 lg:mb-16"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: "easeOut" }}
				>
					<div className="flex justify-center items-center mb-4">
						<h2 className="font-delius text-4xl lg:text-5xl font-bold text-oxfordBlue tracking-wider drop-shadow-md">
							How It Works
						</h2>
					</div>
					<p className="text-lg text-highland font-fredoka max-w-5xl mx-auto">
						Our simple 3-step process makes finding and adopting
						your perfect dog easy and stress-free.
					</p>
				</motion.div>

				{/* Steps Grid */}
				<motion.div
					ref={cardsRef}
					className="grid grid-cols-1 lg:grid-cols-3 gap-8"
					variants={{
						hidden: { opacity: 0 },
						visible: {
							opacity: 1,
							transition: {
								staggerChildren: 0.2,
							},
						},
					}}
					initial="hidden"
					animate={
						hasAnimated
							? "visible"
							: cardsInView
							? "visible"
							: "hidden"
					}
				>
					{steps.map((step, index) => (
						<motion.div
							key={index}
							className="relative"
							variants={{
								hidden: { opacity: 0 },
								visible: { opacity: 1 },
							}}
							transition={{
								duration: 0.6,
								ease: "easeOut",
							}}
						>
							{/* Step Card */}
							<div className="bg-titan rounded-3xl shadow-xl p-8 h-full transform hover:scale-105 transition-transform duration-300">
								{/* Step Image */}
								<div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg mb-6 bg-gray-100">
									{index === 0 ? (
										// Step 1 - Browse & Search
										<img
											src="/images/homepageImages/dog7.jpg"
											alt="Dog jumping"
											className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
											style={{
												imageRendering: "auto",
											}}
										/>
									) : index === 1 ? (
										// Step 2 - Connect & Meet
										<img
											src="/images/homepageImages/dog6.jpg"
											alt="Hand stroking dog"
											className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
											style={{
												imageRendering: "auto",
											}}
										/>
									) : (
										// Step 3 - Adopt & Love
										<img
											src="/images/homepageImages/dog5.jpg"
											alt="Happy dog on hillside with owner"
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
											className="text-2xl text-yellowOrange"
										/>
									</div>
									<h3 className="text-2xl font-bold text-oxfordBlue font-poppins mb-3">
										{step.title}
									</h3>
									<p className="text-highland font-poppins leading-relaxed">
										{step.description}
									</p>
								</div>
							</div>
						</motion.div>
					))}
				</motion.div>

				{/* Call to Action */}
				<motion.div
					className="text-center mt-16"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
				>
					<button
						onClick={() => navigate("/adopt")}
						className="group relative overflow-hidden bg-gradient-to-r from-highland to-sark text-honeydew px-6 py-4 rounded-full font-fredoka font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:text-sunset whitespace-nowrap text-xl"
					>
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

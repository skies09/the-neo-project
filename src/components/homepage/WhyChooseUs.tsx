import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faShieldAlt,
	faClock,
	faHeart,
	faUsers,
	faPaw,
} from "@fortawesome/free-solid-svg-icons";

const WhyChooseUs: React.FC = () => {
	const features = [
		{
			icon: faShieldAlt,
			title: "Trusted & Verified",
			description:
				"All rescue centers are thoroughly vetted and verified to ensure the highest standards of care.",
			gradient: "from-skyBlue to-aquamarine",
		},
		{
			icon: faClock,
			title: "24/7 Support",
			description:
				"Our dedicated team is here to help you every step of the way, whenever you need us.",
			gradient: "from-aquamarine to-turquoise",
		},
		{
			icon: faHeart,
			title: "Love-First Approach",
			description:
				"Every adoption is about finding the perfect match for both the dog and the family.",
			gradient: "from-turquoise to-skyBlue",
		},
		{
			icon: faUsers,
			title: "Community Driven",
			description:
				"Join a community of dog lovers who share your passion for rescue and adoption.",
			gradient: "from-skyBlue to-turquoise",
		},
	];

	return (
		<section className="pt-20 pb-12 bg-gradient-to-br from-honeydew to-mintCream">
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
							Why Choose Neo Project?
						</h2>
						<FontAwesomeIcon
							icon={faPaw}
							className="text-4xl text-skyBlue ml-4"
						/>
					</div>
					<p className="text-lg text-oxfordBlue/70 font-poppins max-w-2xl mx-auto">
						We're committed to making dog adoption simple, safe, and
						successful for everyone involved.
					</p>
				</motion.div>

				{/* Features Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{features.map((feature, index) => (
						<motion.div
							key={index}
							className="text-center group"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.6,
								delay: 0.2 + index * 0.1,
								ease: "easeOut",
							}}
						>
							{/* Icon */}
							<div className="relative mb-6">
								<div
									className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300`}
								>
									<FontAwesomeIcon
										icon={feature.icon}
										className="text-3xl text-white"
									/>
								</div>
								{/* Decorative Ring */}
								<div
									className={`absolute inset-0 w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-full mx-auto opacity-20 group-hover:scale-125 transition-transform duration-300`}
								></div>
							</div>

							{/* Content */}
							<h3 className="text-xl font-bold text-oxfordBlue font-poppins mb-3">
								{feature.title}
							</h3>
							<p className="text-oxfordBlue/70 font-poppins leading-relaxed">
								{feature.description}
							</p>
						</motion.div>
					))}
				</div>

				{/* Stats Section */}
				<motion.div
					className="mt-20 bg-white rounded-3xl shadow-xl p-8"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
				>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
						<div>
							<div className="text-4xl font-bold text-oxfordBlue font-poppins mb-2">
								500+
							</div>
							<div className="text-oxfordBlue/70 font-poppins">
								Successful Adoptions
							</div>
						</div>
						<div>
							<div className="text-4xl font-bold text-oxfordBlue font-poppins mb-2">
								50+
							</div>
							<div className="text-oxfordBlue/70 font-poppins">
								Partner Rescues
							</div>
						</div>
						<div>
							<div className="text-4xl font-bold text-oxfordBlue font-poppins mb-2">
								98%
							</div>
							<div className="text-oxfordBlue/70 font-poppins">
								Success Rate
							</div>
						</div>
					</div>
				</motion.div>

				{/* Call to Action */}
				<motion.div
					className="text-center mt-16"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
				>
					<button className="group relative overflow-hidden bg-gradient-to-r from-oxfordBlue to-skyBlue text-honeydew px-8 py-4 rounded-xl font-poppins font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
						<div className="flex items-center space-x-3 relative z-10">
							<FontAwesomeIcon
								icon={faHeart}
								className="text-lg"
							/>
							<span>Join Our Community</span>
						</div>
						<div className="absolute inset-0 bg-gradient-to-r from-skyBlue to-aquamarine opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
					</button>
				</motion.div>
			</div>
		</section>
	);
};

export default WhyChooseUs;

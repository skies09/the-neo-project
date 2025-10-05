import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faStar, faPaw } from "@fortawesome/free-solid-svg-icons";

const Testimonials: React.FC = () => {
	const testimonials = [
		{
			name: "Sarah Johnson",
			location: "Manchester",
			text: "The Neo Project made finding our perfect dog so easy! The search filters helped us find exactly what we were looking for, and the adoption process was smooth and stress-free.",
			rating: 5,
			image: "Profile Image Placeholder",
		},
		{
			name: "Michael Chen",
			location: "London",
			text: "We adopted our rescue dog through The Neo Project and couldn't be happier. The platform connected us with a wonderful rescue center, and our new family member is perfect!",
			rating: 5,
			image: "Profile Image Placeholder",
		},
		{
			name: "Emma Williams",
			location: "Birmingham",
			text: "The team at The Neo Project was incredibly helpful throughout the entire process. They made sure we found the right match for our family, and we're so grateful for their support.",
			rating: 5,
			image: "Profile Image Placeholder",
		},
	];

	return (
		<section className="py-20 bg-gradient-to-br from-skyBlue/10 to-aquamarine/10">
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
							icon={faQuoteLeft}
							className="text-4xl text-skyBlue mr-4"
						/>
						<h2 className="font-poppins text-4xl lg:text-5xl font-bold text-oxfordBlue tracking-wider drop-shadow-md">
							Happy Families
						</h2>
						<FontAwesomeIcon
							icon={faQuoteLeft}
							className="text-4xl text-skyBlue ml-4"
						/>
					</div>
					<p className="text-lg text-oxfordBlue/70 font-poppins max-w-2xl mx-auto">
						Hear from families who found their perfect companions
						through The Neo Project.
					</p>
				</motion.div>

				{/* Testimonials Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{testimonials.map((testimonial, index) => (
						<motion.div
							key={index}
							className="bg-white rounded-3xl shadow-xl p-8 transform hover:scale-105 transition-transform duration-300"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.6,
								delay: 0.2 + index * 0.1,
								ease: "easeOut",
							}}
						>
							{/* Quote Icon */}
							<div className="flex justify-center mb-6">
								<div className="w-16 h-16 bg-gradient-to-br from-skyBlue to-aquamarine rounded-full flex items-center justify-center">
									<FontAwesomeIcon
										icon={faQuoteLeft}
										className="text-2xl text-white"
									/>
								</div>
							</div>

							{/* Rating */}
							<div className="flex justify-center mb-4">
								{[...Array(testimonial.rating)].map((_, i) => (
									<FontAwesomeIcon
										key={i}
										icon={faStar}
										className="text-yellow-400 text-lg mx-1"
									/>
								))}
							</div>

							{/* Testimonial Text */}
							<p className="text-oxfordBlue/70 font-poppins text-center leading-relaxed mb-6">
								"{testimonial.text}"
							</p>

							{/* Profile */}
							<div className="flex items-center justify-center space-x-4">
								{/* Profile Image Placeholder */}
								<div className="w-16 h-16 bg-gradient-to-br from-skyBlue/20 to-aquamarine/20 rounded-full flex items-center justify-center border-2 border-dashed border-skyBlue/50">
									<FontAwesomeIcon
										icon={faPaw}
										className="text-skyBlue/60"
									/>
								</div>
								<div className="text-center">
									<h4 className="font-poppins font-semibold text-oxfordBlue">
										{testimonial.name}
									</h4>
									<p className="text-oxfordBlue/60 font-poppins text-sm">
										{testimonial.location}
									</p>
								</div>
							</div>
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
					<div className="bg-white rounded-3xl shadow-xl p-8 max-w-2xl mx-auto">
						<h3 className="text-2xl font-bold text-oxfordBlue font-poppins mb-4">
							Ready to Find Your Perfect Match?
						</h3>
						<p className="text-oxfordBlue/70 font-poppins mb-6">
							Join hundreds of happy families who found their
							forever friends through The Neo Project.
						</p>
						<button className="group relative overflow-hidden bg-gradient-to-r from-oxfordBlue to-skyBlue text-honeydew px-8 py-4 rounded-xl font-poppins font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
							<div className="flex items-center space-x-3 relative z-10">
								<FontAwesomeIcon
									icon={faPaw}
									className="text-lg"
								/>
								<span>Start Your Journey</span>
							</div>
							<div className="absolute inset-0 bg-gradient-to-r from-skyBlue to-aquamarine opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
						</button>
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default Testimonials;

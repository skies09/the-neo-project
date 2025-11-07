import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Testimonials: React.FC = () => {
	const sectionRef = useRef(null);
	const headerRef = useRef(null);
	const cardsRef = useRef(null);

	const headerInView = useInView(headerRef, { once: true, margin: "-100px" });
	const cardsInView = useInView(cardsRef, { once: true, margin: "-100px" });

	const [headerAnimated, setHeaderAnimated] = useState(false);
	const [cardsAnimated, setCardsAnimated] = useState(false);

	useEffect(() => {
		if (headerInView && !headerAnimated) setHeaderAnimated(true);
		if (cardsInView && !cardsAnimated) setCardsAnimated(true);
	}, [headerInView, cardsInView, headerAnimated, cardsAnimated]);

	const testimonials = [
		{
			name: "Sarah Johnson",
			location: "Manchester",
			text: "The Neo Project made finding our perfect dog so easy! The search filters helped us find exactly what we were looking for, and the adoption process was smooth and stress-free.",
			rating: 5,
			image: "/images/homepageImages/reviewsImages/review1.jpg",
		},
		{
			name: "Michael Chen",
			location: "London",
			text: "We adopted our rescue dog through The Neo Project and couldn't be happier. The platform connected us with a wonderful rescue center, and our new family member is perfect!",
			rating: 5,
			image: "/images/homepageImages/reviewsImages/review2.jpg",
		},
		{
			name: "Emma Williams",
			location: "Birmingham",
			text: "The team at The Neo Project was incredibly helpful throughout the entire process. They made sure we found the right match for our family, and we're so grateful for their support.",
			rating: 5,
			image: "/images/homepageImages/reviewsImages/review3.jpg",
		},
	];

	return (
		<section ref={sectionRef} className="pb-20 mb-4 pt-4 bg-peppermint">
			<div className="max-w-7xl mx-auto px-4">
				{/* Section Header */}
				<motion.div
					ref={headerRef}
					className="text-center mb-8"
					initial={{ opacity: 0, y: -20 }}
					animate={
						headerAnimated
							? { opacity: 1, y: 0 }
							: headerInView
							? { opacity: 1, y: 0 }
							: { opacity: 0, y: -20 }
					}
					transition={{ duration: 0.6, ease: "easeOut" }}
				>
					<div className="flex justify-center items-center mt-8 mb-4">
						<h2 className="font-delius text-4xl lg:text-5xl font-bold text-oxfordBlue tracking-wider drop-shadow-md">
							Happy Families
						</h2>
					</div>
					<p className="text-lg text-highland font-fredoka max-w-5xl mx-auto">
						Hear from families who found their perfect companions
						through The Neo Project.
					</p>
				</motion.div>

				{/* Testimonials Grid */}
				<motion.div
					ref={cardsRef}
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
						cardsAnimated
							? "visible"
							: cardsInView
							? "visible"
							: "hidden"
					}
				>
					{testimonials.map((testimonial, index) => (
						<motion.div
							key={index}
							className="bg-sark rounded-3xl shadow-xl p-8 transform hover:scale-105 transition-transform duration-300"
							variants={{
								hidden: { opacity: 0, y: 20 },
								visible: { opacity: 1, y: 0 },
							}}
							transition={{
								duration: 0.6,
								ease: "easeOut",
							}}
						>
							{/* Rating */}
							<div className="flex justify-center mb-4">
								{[...Array(testimonial.rating)].map((_, i) => (
									<FontAwesomeIcon
										key={i}
										icon={faStar}
										className="text-yellowOrange text-lg mx-1"
									/>
								))}
							</div>

							{/* Testimonial Text */}
							<p className="text-feta font-poppins text-center leading-relaxed mb-6">
								"{testimonial.text}"
							</p>

							{/* Profile */}
							<div className="flex items-center justify-center space-x-4">
								{/* Profile Image */}
								<div className="w-28 h-28 rounded-full overflow-hidden border-2 border-cherokee flex-shrink-0">
									<img
										src={testimonial.image}
										alt={testimonial.name}
										className="w-full h-full object-cover"
									/>
								</div>
								<div className="text-center">
									<h4 className="font-poppins font-semibold text-tara">
										{testimonial.name}
									</h4>
									<p className="text-tara font-poppins text-sm">
										{testimonial.location}
									</p>
								</div>
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
};

export default Testimonials;

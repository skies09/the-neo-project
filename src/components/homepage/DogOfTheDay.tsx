import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPaw,
	faHeart,
	faCalendar,
	faStar,
} from "@fortawesome/free-solid-svg-icons";
import { dogAPI, Dog } from "../../services/api";
import AdoptCard from "../cards/adoptCard";

const DogOfTheDay: React.FC = () => {
	const [featuredDog, setFeaturedDog] = useState<Dog | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchFeaturedDog = async () => {
			try {
				const dogs = await dogAPI.getAllDogs();
				if (dogs && dogs.length > 0) {
					// Get a random dog as "dog of the day"
					const randomIndex = Math.floor(Math.random() * dogs.length);
					setFeaturedDog(dogs[randomIndex]);
				}
			} catch (error) {
				console.error("Error fetching featured dog:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchFeaturedDog();
	}, []);

	return (
		<section className="py-20 bg-gradient-to-br from-skyBlue/10 to-aquamarine/10">
			<div className="max-w-7xl mx-auto px-4">
				{/* Section Header */}
				<motion.div
					className="text-center mb-8"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: "easeOut" }}
				>
					<div className="flex justify-center items-center">
						<FontAwesomeIcon
							icon={faCalendar}
							className="text-4xl text-skyBlue mr-4"
						/>
						<h2 className="font-poppins text-4xl lg:text-5xl font-bold text-oxfordBlue tracking-wider drop-shadow-md">
							Dog of the Day
						</h2>
						<FontAwesomeIcon
							icon={faCalendar}
							className="text-4xl text-skyBlue ml-4"
						/>
					</div>
					<p className="text-lg text-oxfordBlue/70 font-poppins max-w-2xl mx-auto">
						Meet today's featured rescue dog, waiting for their
						forever home!
					</p>
				</motion.div>

				{/* Featured Dog Card */}
				<motion.div
					className="max-w-4xl mx-auto"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
				>
					{loading ? (
						<div className="bg-white rounded-3xl shadow-xl p-12 text-center">
							<div className="animate-spin w-16 h-16 border-4 border-skyBlue border-t-transparent rounded-full mx-auto mb-4"></div>
							<p className="text-oxfordBlue/70 font-poppins">
								Loading today's featured dog...
							</p>
						</div>
					) : featuredDog ? (
						<div className="relative">
							{/* Special Badge - Positioned above the card with proper spacing */}
							<div className="flex justify-center mb-8">
								<div className="bg-gradient-to-r from-aquamarine to-turquoise text-white px-8 py-3 rounded-full font-poppins font-bold shadow-lg flex items-center space-x-2">
									<FontAwesomeIcon icon={faStar} />
									<span>Dog of the Day</span>
								</div>
							</div>

							{/* Dog Card - Remove conflicting wrapper styles */}
							<div className="transform hover:scale-105 transition-transform duration-300 px-4">
								<AdoptCard dog={featuredDog} />
							</div>
						</div>
					) : (
						<div className="bg-white rounded-3xl shadow-xl p-12 text-center">
							<FontAwesomeIcon
								icon={faPaw}
								className="text-6xl text-skyBlue/60 mb-4"
							/>
							<h3 className="text-2xl font-bold text-oxfordBlue font-poppins mb-2">
								No Dogs Available
							</h3>
							<p className="text-oxfordBlue/70 font-poppins">
								Check back later for today's featured dog!
							</p>
						</div>
					)}
				</motion.div>

				{/* Call to Action */}
				<motion.div
					className="text-center mt-12"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
				>
					<button className="group relative overflow-hidden bg-gradient-to-r from-oxfordBlue to-skyBlue text-honeydew px-8 py-4 rounded-xl font-poppins font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
						<div className="flex items-center space-x-3 relative z-10">
							<FontAwesomeIcon
								icon={faHeart}
								className="text-lg"
							/>
							<span>View All Available Dogs</span>
						</div>
						<div className="absolute inset-0 bg-gradient-to-r from-skyBlue to-aquamarine opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
					</button>
				</motion.div>
			</div>
		</section>
	);
};

export default DogOfTheDay;

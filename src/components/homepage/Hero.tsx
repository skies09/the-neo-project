import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPaw,
	faHeart,
	faStar,
	faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const Hero: React.FC = () => {
	return (
		<section className="bg-gradient-to-br from-honeydew via-mintCream to-skyBlue/10 flex items-center pt-32 pb-16 px-4">
			<div className="max-w-7xl mx-auto">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					{/* Left Column - Text Content */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, ease: "easeOut" }}
						className="space-y-8"
					>
						<div className="space-y-6">
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.2 }}
								className="flex items-center space-x-3"
							>
								<div className="w-12 h-12 bg-gradient-to-br from-skyBlue to-aquamarine rounded-full flex items-center justify-center">
									<FontAwesomeIcon
										icon={faPaw}
										className="text-2xl text-white"
									/>
								</div>
								<h1 className="font-satisfy text-2xl md:text-5xl font-bold text-oxfordBlue tracking-wider drop-shadow-md">
									The Neo Project
								</h1>
							</motion.div>

							<motion.h1
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.3 }}
								className="text-5xl font-bold text-oxfordBlue font-poppins leading-tight"
							>
								Find Your
								<span className="block bg-gradient-to-r from-skyBlue to-aquamarine bg-clip-text text-transparent">
									Perfect Dog
								</span>
							</motion.h1>

							<motion.p
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.4 }}
								className="text-xl text-oxfordBlue/70 font-poppins leading-relaxed max-w-lg"
							>
								Connect with loving rescue dogs and find your
								new best friend. Every adoption is a new
								beginning filled with joy and unconditional
								love.
							</motion.p>
						</div>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.5 }}
							className="flex flex-col sm:flex-row gap-4"
						>
							<button className="group relative overflow-hidden bg-gradient-to-r from-oxfordBlue to-skyBlue text-honeydew px-8 py-4 rounded-xl font-poppins font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
								<div className="flex items-center space-x-3 relative z-10">
									<FontAwesomeIcon
										icon={faPaw}
										className="text-lg"
									/>
									<span>Browse Dogs</span>
									<FontAwesomeIcon
										icon={faArrowRight}
										className="text-lg group-hover:translate-x-1 transition-transform duration-300"
									/>
								</div>
								<div className="absolute inset-0 bg-gradient-to-r from-skyBlue to-aquamarine opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
							</button>

							<button className="group relative overflow-hidden border-2 border-oxfordBlue text-oxfordBlue px-8 py-4 rounded-xl font-poppins font-semibold hover:bg-oxfordBlue hover:text-honeydew transition-all duration-300 transform hover:scale-105">
								<div className="flex items-center space-x-3 relative z-10">
									<FontAwesomeIcon
										icon={faHeart}
										className="text-lg"
									/>
									<span>Learn More</span>
								</div>
							</button>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.6 }}
							className="flex items-center space-x-8 pt-4"
						>
							<div className="text-center">
								<div className="text-3xl font-bold text-oxfordBlue font-poppins">
									500+
								</div>
								<div className="text-oxfordBlue/70 font-poppins text-sm">
									Dogs Adopted
								</div>
							</div>
							<div className="text-center">
								<div className="text-3xl font-bold text-oxfordBlue font-poppins">
									50+
								</div>
								<div className="text-oxfordBlue/70 font-poppins text-sm">
									Rescue Partners
								</div>
							</div>
							<div className="text-center">
								<div className="text-3xl font-bold text-oxfordBlue font-poppins">
									98%
								</div>
								<div className="text-oxfordBlue/70 font-poppins text-sm">
									Success Rate
								</div>
							</div>
						</motion.div>
					</motion.div>

					{/* Right Column - Hero Image */}
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="relative"
					>
						<div className="relative bg-gradient-to-br from-skyBlue/20 to-aquamarine/20 rounded-3xl p-8 shadow-2xl">
							{/* Hero Image */}
							<div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
								<img
									src="/images/dog3.jpg"
									alt="Happy rescue dog ready for adoption"
									className="w-full h-full object-cover"
								/>
							</div>
							{/* Floating Elements */}
							<div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-aquamarine to-turquoise rounded-full flex items-center justify-center shadow-lg">
								<FontAwesomeIcon
									icon={faStar}
									className="text-2xl text-white"
								/>
							</div>
							<div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-turquoise to-skyBlue rounded-full flex items-center justify-center shadow-lg">
								<FontAwesomeIcon
									icon={faHeart}
									className="text-xl text-white"
								/>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default Hero;

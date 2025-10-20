import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPaw,
	faHeart,
	faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const Hero: React.FC = () => {
	const navigate = useNavigate();

	const renderButtonSection = () => {
		return (
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.5 }}
				className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
			>
				<button
					onClick={() => navigate("/allDogs")}
					className="group relative overflow-hidden bg-gradient-to-r from-oxfordBlue to-skyBlue text-honeydew px-6 py-4 rounded-xl font-poppins font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-44 whitespace-nowrap"
				>
					<div className="flex items-center justify-center space-x-2 relative z-10">
						<FontAwesomeIcon icon={faPaw} className="text-lg" />
						<span>Browse Dogs</span>
						<FontAwesomeIcon
							icon={faArrowRight}
							className="text-lg group-hover:translate-x-1 transition-transform duration-300"
						/>
					</div>
					<div className="absolute inset-0 bg-gradient-to-r from-skyBlue to-aquamarine opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
				</button>

				<button
					onClick={() => navigate("/adopt")}
					className="group relative overflow-hidden border-2 border-oxfordBlue text-oxfordBlue px-6 py-4 rounded-xl font-poppins font-semibold hover:bg-oxfordBlue hover:text-honeydew transition-all duration-300 transform hover:scale-105 w-44 whitespace-nowrap"
				>
					<div className="flex items-center justify-center space-x-2 relative z-10">
						<FontAwesomeIcon icon={faHeart} className="text-lg" />
						<span>Find Your Dog</span>
					</div>
				</button>
			</motion.div>
		);
	};

	const renderStatsSection = () => {
		return (
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.6 }}
				className="absolute bottom-0 left-0 w-full bg-oxfordBlue text-honeydew"
			>
				<div className="max-w-7xl mx-auto px-4">
					<div className="grid grid-cols-3 divide-x divide-honeydew/20">
						<div className="py-4 md:py-6 text-center">
							<div className="text-2xl md:text-3xl font-bold font-comic">
								500+
							</div>
							<div className="text-ghost font-comic font-bold text-sm md:text-lg">
								Dogs Available
							</div>
						</div>
						<div className="py-4 md:py-6 text-center">
							<div className="text-2xl md:text-3xl font-bold font-comic">
								200+
							</div>
							<div className="text-ghost font-comic font-bold text-sm md:text-lg">
								Rescue Partners
							</div>
						</div>
						<div className="py-4 md:py-6 text-center">
							<div className="text-2xl md:text-3xl font-bold font-comic">
								100%
							</div>
							<div className="text-ghost font-comic font-bold text-sm md:text-lg">
								Success Rate
							</div>
						</div>
					</div>
				</div>
			</motion.div>
		);
	};

	return (
		<section className="bg-mintCream flex items-center pt-20 lg:pt-28 px-4 relative pb-28 lg:pb-32">
			<div className="max-w-7xl mx-auto pb-10">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-0 items-center">
					{/* Left Column - Text Content */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, ease: "easeOut" }}
						className="space-y-4 lg:space-y-8"
					>
						<div className="space-y-3 lg:space-y-6 pt-2">
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.2 }}
								className="flex items-center justify-center lg:justify-start space-x-3"
							>
								<h1 className="font-delius text-4xl md:text-6xl font-bold text-oxfordBlue drop-shadow-md text-center lg:text-left">
									Every Dog{" "}
									<span>
										<br></br>Deserves A Home
									</span>
								</h1>
							</motion.div>

							<motion.p
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.4 }}
								className="text-2xl text-oxfordBlue/70 font-fredoka leading-relaxed max-w-lg text-center lg:text-left w-2/3 mx-auto lg:ml-0"
							>
								Find your perfect dog. <br></br>Search hundreds
								of rescue centers and find your perfect
								companion
							</motion.p>
						</div>

						<div className="hidden lg:block">
							{renderButtonSection()}
						</div>
					</motion.div>

					{/* Right Column - Hero Image */}
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="relative"
					>
						<div className="relative">
							{/* Hero Image */}
							<div className="aspect-[4/3] rounded-2xl overflow-hidden">
								<img
									src="/images/hero.png"
									alt="Happy rescue dog ready for adoption"
									className="w-full h-full object-contain"
								/>
							</div>
						</div>
					</motion.div>
				</div>
				<div className="block lg:hidden pt-8">
					{renderButtonSection()}
				</div>
			</div>
			{renderStatsSection()}
		</section>
	);
};

export default Hero;

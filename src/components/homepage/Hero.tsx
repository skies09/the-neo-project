import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPaw,
	faHeart,
	faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const Hero: React.FC = () => {
	const navigate = useNavigate();
	const statsRef = useRef(null);
	const statsInView = useInView(statsRef, { once: true, margin: "-50px" });
	const [statsAnimated, setStatsAnimated] = useState(false);

	useEffect(() => {
		if (statsInView && !statsAnimated) {
			setStatsAnimated(true);
		}
	}, [statsInView, statsAnimated]);

	const renderButtonSection = () => {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1.2, delay: 0.5 }}
				className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
			>
				<button
					onClick={() => navigate("/adopt")}
					className="group relative overflow-hidden bg-gradient-to-r from-sark to-bayleaf text-honeydew px-6 py-4 rounded-full font-fredoka font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:text-sunset w-44 whitespace-nowrap"
				>
					<div className="flex items-center justify-center space-x-2 relative z-10">
						<FontAwesomeIcon icon={faHeart} className="text-lg" />
						<span>Find Your Dog</span>
						<FontAwesomeIcon
							icon={faArrowRight}
							className="text-lg group-hover:translate-x-1 transition-transform duration-300"
						/>
					</div>
					<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
				</button>

				<button
					onClick={() => navigate("/all-dogs")}
					className="group relative overflow-hidden border-2 border-tomThumb text-oxfordBlue px-6 py-4 rounded-full font-fredoka font-semibold hover:bg-gradient-to-r from-sark to-bayleaf hover:text-honeydew transition-all duration-300 transform hover:scale-105 w-44 whitespace-nowrap"
				>
					<div className="flex items-center justify-center space-x-2 relative z-10">
						<FontAwesomeIcon icon={faPaw} className="text-lg" />
						<span>Browse Dogs</span>
					</div>
				</button>
			</motion.div>
		);
	};

	const renderStatsSection = () => {
		return (
			<div
				ref={statsRef}
				className="relative bottom-0 left-0 w-full text-cherokee overflow-hidden"
			>
				{/* Animated gradient background */}
				<div
					className="absolute inset-0"
					style={{
						background:
							"linear-gradient(45deg, #6C8B58, #84AE92, #5A827E, #6C8B58)",
						backgroundSize: "400% 400%",
						animation: "gradientShift 8s ease infinite",
					}}
				/>
				{/* Overlay for better text contrast */}
				<div className="absolute inset-0 bg-black/20" />

				<div className="relative z-10 max-w-7xl mx-auto lg:px-4">
					<motion.div
						className="grid grid-cols-3 divide-x divide-honeydew/20"
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
							statsAnimated
								? "visible"
								: statsInView
								? "visible"
								: "hidden"
						}
					>
						<motion.div
							className="py-4 md:py-6 text-center"
							variants={{
								hidden: { opacity: 0, y: 50, scale: 0.5 },
								visible: {
									opacity: 1,
									y: 0,
									scale: 1,
									transition: {
										type: "spring",
										stiffness: 50,
										damping: 10,
										bounce: 0.2,
									},
								},
							}}
						>
							<div className="text-2xl md:text-3xl font-bold font-comic">
								500+
							</div>
							<div className="text-mintCream font-comic font-bold text-sm md:text-lg">
								Dogs Available
							</div>
						</motion.div>
						<motion.div
							className="py-4 md:py-6 text-center"
							variants={{
								hidden: { opacity: 0, y: 50, scale: 0.5 },
								visible: {
									opacity: 1,
									y: 0,
									scale: 1,
									transition: {
										type: "spring",
										stiffness: 50,
										damping: 10,
										bounce: 0.2,
									},
								},
							}}
						>
							<div className="text-2xl md:text-3xl font-bold font-comic">
								200+
							</div>
							<div className="text-mintCream font-comic font-bold text-sm md:text-lg">
								Rescue Partners
							</div>
						</motion.div>
						<motion.div
							className="py-4 md:py-6 text-center"
							variants={{
								hidden: { opacity: 0, y: 50, scale: 0.5 },
								visible: {
									opacity: 1,
									y: 0,
									scale: 1,
									transition: {
										type: "spring",
										stiffness: 50,
										damping: 10,
										bounce: 0.2,
									},
								},
							}}
						>
							<div className="text-2xl md:text-3xl font-bold font-comic">
								100%
							</div>
							<div className="text-mintCream font-comic font-bold text-sm md:text-lg">
								Success Rate
							</div>
						</motion.div>
					</motion.div>
				</div>
			</div>
		);
	};

	return (
		<section className="bg-mintCream pt-20 lg:pt-32 relative pb-0">
			<div className="max-w-7xl mx-auto pb-10 lg:pb-20 px-4 ">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-center lg:items-start">
					{/* Left Column - Text Content */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.8, ease: "easeOut" }}
						className="space-y-4 lg:space-y-8 pt-3 lg:pt-6"
					>
						<div className="space-y-3 lg:space-y-6 pt-2">
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.8, delay: 0.2 }}
								className="flex items-center justify-center lg:justify-start space-x-3"
							>
								<h1 className="font-delius text-4xl md:text-6xl lg:text-7xl font-bold text-oxfordBlue drop-shadow-md text-center lg:text-left">
									Every Dog{" "}
									<span>
										<br></br>Deserves A Home
									</span>
								</h1>
							</motion.div>

							<motion.p
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.8, delay: 0.2 }}
								className="text-lg lg:text-2xl text-oxfordBlue/70 font-fredoka leading-relaxed max-w-lg text-center lg:text-left w-full lg:w-11/12 mx-auto lg:ml-0"
							>
								Ready to find your perfect rescue dog? <br></br>
								Search hundreds of rescue centers and find your
								perfect companion
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
							{/* Hero Image with Zoom In Animation */}
							<div className="aspect-[4/3] lg:aspect-auto rounded-2xl">
								<motion.img
									src="/images/homepageImages/Hero.png"
									alt="Happy rescue dog ready for adoption"
									className="w-auto justify-center mx-auto max-h-72 lg:max-h-96 h-full object-contain"
									initial={{
										opacity: 0,
										scale: 0.6,
										rotate: -5,
									}}
									animate={{
										opacity: 1,
										scale: 1.3,
										rotate: 0,
									}}
									transition={{
										duration: 2,
										delay: 0.6,
										ease: [0.25, 0.46, 0.45, 0.94],
									}}
								/>
							</div>
						</div>
					</motion.div>
				</div>
				<div className="block lg:hidden mt-12 md:mt-0">
					{renderButtonSection()}
				</div>
			</div>
			{renderStatsSection()}
		</section>
	);
};

export default Hero;

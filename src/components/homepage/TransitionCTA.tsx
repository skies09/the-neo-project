import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faHeart,
	faArrowRight,
	faPaw,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

interface TransitionCTAProps {
	simplified?: boolean;
}

const TransitionCTA: React.FC<TransitionCTAProps> = ({
	simplified = false,
}) => {
	const navigate = useNavigate();

	return (
		<section className="py-4 lg:py-10">
			<div className="max-w-5xl mx-auto px-4">
				<motion.div
					className="text-center"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease: "easeOut" }}
				>
					{/* Main CTA Content */}
					<div
						className={`bg-bayleaf ${
							simplified
								? "rounded-3xl lg:rounded-full"
								: "rounded-3xl"
						} shadow-xl p-8 mb-8`}
					>
						{/* Heading */}
						<motion.h2
							className="text-3xl lg:text-4xl font-bold text-cherokee font-delius mb-4"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.6,
								delay: 0.4,
								ease: "easeOut",
							}}
						>
							{simplified
								? "Find Your Perfect Dog"
								: "Ready to Find Your Perfect Match?"}
						</motion.h2>

						{/* Description - Only show if not simplified */}
						{!simplified && (
							<motion.p
								className="text-lg text-titan font-poppins max-w-5xl mx-auto mb-8"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.6,
									delay: 0.6,
									ease: "easeOut",
								}}
							>
								Join hundreds of happy families who found their
								forever friends through The Neo Project.
							</motion.p>
						)}

						{/* CTA Buttons */}
						<motion.div
							className="flex flex-col sm:flex-row gap-4 justify-center items-center"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.6,
								delay: simplified ? 0.4 : 0.8,
								ease: "easeOut",
							}}
						>
							<>
								{/* Main CTA - Find Your Perfect Dog */}
								<button
									onClick={() => navigate("/adopt")}
									className="group relative overflow-hidden bg-gradient-to-r from-highland to-sark text-honeydew px-6 py-4 rounded-full font-fredoka font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:text-sunset whitespace-nowrap text-xl"
								>
									<div className="flex items-center space-x-3 relative z-10">
										<FontAwesomeIcon
											icon={faHeart}
											className="text-lg"
										/>
										<span>
											{" "}
											{simplified
												? "Start Your Journey"
												: "Find Your Match"}
										</span>
									</div>
									<div className="absolute inset-0 bg-gradient-to-r from-skyBlue to-aquamarine opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
								</button>

								{/* Secondary CTA - Browse All Dogs */}
								{!simplified && (
									<button
										onClick={() => navigate("/allDogs")}
										className="group relative overflow-hidden bg-gradient-to-r from-tara to-mintCream text-oxfordBlue px-8 py-4 rounded-full font-fredoka font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
									>
										<div className="flex items-center space-x-3 relative z-10">
											<FontAwesomeIcon
												icon={faPaw}
												className="text-lg"
											/>
											<span>Browse All Dogs</span>
										</div>
										<div className="absolute inset-0 bg-gradient-to-r from-turquoise to-skyBlue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
									</button>
								)}
							</>
						</motion.div>
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default TransitionCTA;

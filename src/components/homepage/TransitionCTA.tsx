import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPaw } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

interface TransitionCTAProps {
	simplified?: boolean;
	title?: string;
	firstButtonText?: string;
	showFirstButtonIcon?: boolean;
}

const TransitionCTA: React.FC<TransitionCTAProps> = ({
	simplified = false,
	title,
	firstButtonText,
	showFirstButtonIcon = true,
}) => {
	const navigate = useNavigate();
	const sectionRef = useRef(null);
	const sectionInView = useInView(sectionRef, {
		once: true,
		margin: "-100px",
	});
	const [hasAnimated, setHasAnimated] = useState(false);

	useEffect(() => {
		if (sectionInView && !hasAnimated) {
			setHasAnimated(true);
		}
	}, [sectionInView, hasAnimated]);

	return (
		<section ref={sectionRef} className="py-4 lg:py-10">
			<div className="max-w-5xl mx-auto px-4">
				<motion.div
					className="text-center"
					initial={{ opacity: 0 }}
					animate={
						hasAnimated
							? { opacity: 1 }
							: sectionInView
							? { opacity: 1 }
							: { opacity: 0 }
					}
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
							initial={{ opacity: 0 }}
							animate={
								hasAnimated
									? { opacity: 1 }
									: sectionInView
									? { opacity: 1 }
									: { opacity: 0 }
							}
							transition={{
								duration: 0.6,
								delay: 0.4,
								ease: "easeOut",
							}}
						>
							{title ||
								(simplified
									? "Find Your Perfect Dog"
									: "Ready to Find Your Perfect Match?")}
						</motion.h2>

						{/* Description - Only show if not simplified */}
						{!simplified && (
							<motion.p
								className="text-lg text-titan font-poppins max-w-5xl mx-auto mb-8"
								initial={{ opacity: 0 }}
								animate={
									hasAnimated
										? { opacity: 1 }
										: sectionInView
										? { opacity: 1 }
										: { opacity: 0 }
								}
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
							initial={{ opacity: 0 }}
							animate={
								hasAnimated
									? { opacity: 1 }
									: sectionInView
									? { opacity: 1 }
									: { opacity: 0 }
							}
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
										{showFirstButtonIcon && (
											<FontAwesomeIcon
												icon={faHeart}
												className="text-lg"
											/>
										)}
										<span>
											{firstButtonText ||
												(simplified
													? "Start Your Journey"
													: "Find Your Match")}
										</span>
									</div>
								</button>

								{/* Secondary CTA - Browse All Dogs */}
								{!simplified && (
									<button
										onClick={() => navigate("/all-dogs")}
										className="group relative overflow-hidden bg-gradient-to-r from-tara to-mintCream text-oxfordBlue px-8 py-4 rounded-full font-fredoka font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
									>
										<div className="flex items-center space-x-3 relative z-10">
											<FontAwesomeIcon
												icon={faPaw}
												className="text-lg"
											/>
											<span>Browse All Dogs</span>
										</div>
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

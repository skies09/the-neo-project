import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faSearch,
	faClock,
	faGlobe,
	faPaw,
} from "@fortawesome/free-solid-svg-icons";

const WhyChooseUs: React.FC = () => {
	return (
		<section className="pt-10 lg:pt-20 pb-12 bg-gradient-to-br from-red-50 to-orange-50">
			<div className="max-w-7xl mx-auto px-4">
				{/* Section Header */}
				<motion.div
					className="text-center mb-16"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: "easeOut" }}
				>
					<div className="flex justify-center items-center mb-4">
						<h2 className="font-comic text-4xl lg:text-5xl font-bold text-oxfordBlue tracking-wider drop-shadow-md">
							Why choose The Neo Project
						</h2>
					</div>
					<p className="text-lg text-highland font-fredoka max-w-5xl mx-auto">
						You opened your heart to a rescue dog, dreaming of love
						and companionship.
						<br></br>Now, you’re feeling lost — weighed down by
						frustration, missed signals, and heartache.
					</p>
				</motion.div>

				{/* Problem Content and Image - Desktop Layout */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
					{/* Text Content - Left side on desktop */}
					<motion.div
						className="order-2 lg:order-1"
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{
							duration: 0.6,
							delay: 0.2,
							ease: "easeOut",
						}}
					>
						<div className="space-y-6 lg:pt-6">
							<div className="flex items-start space-x-3">
								<FontAwesomeIcon
									icon={faSearch}
									className="text-yellowOrange text-lg mt-1 flex-shrink-0"
								/>
								<div>
									<p className="text-highland font-poppins">
										<strong className="text-oxfordBlue">
											The Neo Project does the searching
											for you.
										</strong>{" "}
										We gather listings from hundreds of
										rescues in one place, making it easy to
										find your perfect dog — no endless
										scrolling, no scattered sites.
									</p>
								</div>
							</div>
							<div className="flex items-start space-x-3">
								<FontAwesomeIcon
									icon={faClock}
									className="text-yellowOrange text-lg mt-1 flex-shrink-0"
								/>
								<div>
									<p className="text-highland font-poppins">
										<strong className="text-oxfordBlue">
											Your perfect dog is just a few
											clicks away.
										</strong>{" "}
										The Neo Project curates matches from
										hundreds of dogs, so you can connect
										with your future companion quickly,
										easily, and stress-free.
									</p>
								</div>
							</div>
							<div className="flex items-start space-x-3">
								<FontAwesomeIcon
									icon={faGlobe}
									className="text-yellowOrange text-lg mt-1 flex-shrink-0"
								/>
								<div>
									<p className="text-highland font-poppins">
										<strong className="text-oxfordBlue">
											One platform, one simple process.
										</strong>{" "}
										Fill out your information once, and The
										Neo Project connects you with multiple
										rescues — fast, easy, and stress-free.
									</p>
								</div>
							</div>
							<div className="flex items-start space-x-3">
								<FontAwesomeIcon
									icon={faPaw}
									className="text-yellowOrange text-lg mt-1 flex-shrink-0"
								/>
								<div>
									<p className="text-highland font-poppins">
										<strong className="text-oxfordBlue">
											Never miss your perfect dog again.
										</strong>{" "}
										The Neo Project searches hundreds of
										rescue sites, bringing every match
										straight to you — so connecting with
										your future best friend is fast and
										easy.
									</p>
								</div>
							</div>
						</div>
					</motion.div>

					{/* Image Placeholder - Right side on desktop */}
					<div className="order-1 lg:order-2">
						<div className="aspect-[4/3] lg:aspect-auto rounded-2xl">
							<motion.img
								src="/images/DogMatrix.png"
								alt="Happy rescue dog ready for adoption"
								className="w-auto justify-center mx-auto max-h-72 lg:max-h-96 h-full object-contain py-2 lg:pt-6"
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
				</div>
			</div>
		</section>
	);
};

export default WhyChooseUs;

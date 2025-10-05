import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faQuestionCircle,
	faChevronDown,
	faChevronUp,
	faHeart,
	faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { faqData, faqCategories } from "../data/faqData";

const FAQ: React.FC = () => {
	const [openItems, setOpenItems] = useState<number[]>([]);
	const [selectedCategory, setSelectedCategory] = useState("All");

	const toggleItem = (id: number) => {
		setOpenItems((prev) =>
			prev.includes(id)
				? prev.filter((item) => item !== id)
				: [...prev, id]
		);
	};

	const filteredFAQs =
		selectedCategory === "All"
			? faqData
			: faqData.filter((item) => item.category === selectedCategory);

	return (
		<div className="min-h-screen bg-gradient-to-br from-honeydew via-mintCream to-skyBlue/10">
			{/* Header */}
			<section className="py-20 bg-gradient-to-br from-oxfordBlue to-skyBlue text-white">
				<div className="max-w-7xl mx-auto px-4 text-center">
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, ease: "easeOut" }}
					>
						<FontAwesomeIcon
							icon={faQuestionCircle}
							className="text-6xl mb-6 text-honeydew"
						/>
						<h1 className="font-poppins text-5xl lg:text-6xl font-bold mb-6 drop-shadow-md">
							Frequently Asked Questions
						</h1>
						<p className="text-xl text-honeydew/90 font-poppins max-w-3xl mx-auto">
							Find answers to common questions about dog adoption,
							our process, and how to give a rescue dog their
							forever home.
						</p>
					</motion.div>
				</div>
			</section>

			{/* Category Filter */}
			<section className="py-12 bg-white/50">
				<div className="max-w-7xl mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="text-center mb-8"
					>
						<h2 className="font-poppins text-3xl font-bold text-oxfordBlue mb-6">
							Browse by Category
						</h2>
						<div className="flex flex-wrap justify-center gap-4">
							{faqCategories.map((category) => (
								<button
									key={category}
									onClick={() =>
										setSelectedCategory(category)
									}
									className={`px-6 py-3 rounded-full font-poppins font-semibold transition-all duration-300 ${
										selectedCategory === category
											? "bg-gradient-to-r from-skyBlue to-aquamarine text-white shadow-lg transform scale-105"
											: "bg-white text-oxfordBlue border-2 border-skyBlue hover:bg-skyBlue hover:text-white"
									}`}
								>
									{category}
								</button>
							))}
						</div>
					</motion.div>
				</div>
			</section>

			{/* FAQ Items */}
			<section className="py-16">
				<div className="max-w-4xl mx-auto px-4">
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.6, delay: 0.4 }}
						className="space-y-6"
					>
						{filteredFAQs.map((item, index) => (
							<motion.div
								key={item.id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.4,
									delay: index * 0.1,
								}}
								className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
							>
								<button
									onClick={() => toggleItem(item.id)}
									className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
								>
									<div className="flex items-center space-x-4">
										<div className="w-12 h-12 bg-gradient-to-br from-skyBlue to-aquamarine rounded-full flex items-center justify-center">
											<FontAwesomeIcon
												icon={item.icon}
												className="text-white text-lg"
											/>
										</div>
										<div>
											<h3 className="font-poppins text-lg font-semibold text-oxfordBlue">
												{item.question}
											</h3>
											<span className="text-sm text-skyBlue font-poppins">
												{item.category}
											</span>
										</div>
									</div>
									<FontAwesomeIcon
										icon={
											openItems.includes(item.id)
												? faChevronUp
												: faChevronDown
										}
										className="text-skyBlue text-lg transition-transform duration-200"
									/>
								</button>

								<AnimatePresence>
									{openItems.includes(item.id) && (
										<motion.div
											initial={{ height: 0, opacity: 0 }}
											animate={{
												height: "auto",
												opacity: 1,
											}}
											exit={{ height: 0, opacity: 0 }}
											transition={{
												duration: 0.3,
												ease: "easeInOut",
											}}
											className="overflow-hidden"
										>
											<div className="px-8 pb-6">
												<div className="border-t border-gray-100 pt-4">
													<p className="text-oxfordBlue/80 font-poppins leading-relaxed">
														{item.answer}
													</p>
												</div>
											</div>
										</motion.div>
									)}
								</AnimatePresence>
							</motion.div>
						))}
					</motion.div>
				</div>
			</section>

			{/* Contact CTA */}
			<section className="py-16 bg-gradient-to-br from-skyBlue/10 to-aquamarine/10">
				<div className="max-w-4xl mx-auto px-4 text-center">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.6 }}
					>
						<h2 className="font-poppins text-3xl font-bold text-oxfordBlue mb-6">
							Still Have Questions?
						</h2>
						<p className="text-lg text-oxfordBlue/70 font-poppins mb-8 max-w-2xl mx-auto">
							Can't find the answer you're looking for? Our team
							is here to help you find your perfect furry
							companion.
						</p>
						<div className="flex flex-col sm:flex-row justify-center gap-4">
							<button className="group relative overflow-hidden bg-gradient-to-r from-oxfordBlue to-skyBlue text-honeydew px-8 py-4 rounded-xl font-poppins font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
								<div className="flex items-center space-x-3 relative z-10">
									<FontAwesomeIcon
										icon={faPhone}
										className="text-lg"
									/>
									<span>Contact Us</span>
								</div>
								<div className="absolute inset-0 bg-gradient-to-r from-skyBlue to-aquamarine opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
							</button>
							<button className="group relative overflow-hidden bg-white text-oxfordBlue px-8 py-4 rounded-xl font-poppins font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-300">
								<div className="flex items-center space-x-3 relative z-10">
									<FontAwesomeIcon
										icon={faHeart}
										className="text-lg"
									/>
									<span>Browse Dogs</span>
								</div>
								<div className="absolute inset-0 bg-gradient-to-r from-honeydew to-mintCream opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
							</button>
						</div>
					</motion.div>
				</div>
			</section>
		</div>
	);
};

export default FAQ;

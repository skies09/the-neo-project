import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, AnimatePresence } from "framer-motion";
import {
	faSearch,
	faArrowRight,
	faDog,
	faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import AdoptionCard from "../../components/cards/adoptCard";
import { questions } from "./adoptionCalculatorQuestions";
import type { AdoptionCalculatorModel } from "./useAdoptionCalculator";
import { BreedSearchSelect } from "../../components/forms/BreedSearchSelect";

export function AdoptionCalculatorView(props: AdoptionCalculatorModel) {
	const {
		hasStarted,
		setHasStarted,
		currentQuestionIndex,
		dogs,
		matchRates,
		currentDogIndex,
		error,
		loading,
		breedOptions,
		resultsRef,
		getCurrentValue,
		isQuestionAnswered,
		handleAnswer,
		handleNext,
		handlePrevious,
		resetFlow,
		dismissMatch,
		currentQuestion,
		progress,
	} = props;

	return (
		<motion.div
			id="adopt"
			className="min-h-screen bg-gradient-to-br from-twilight to-sprout pt-16 pb-8 px-4"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.8, ease: "easeOut" }}
		>
			<div className="max-w-4xl mx-auto">
				{!hasStarted && (
					<motion.div
						className="text-center py-20"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, ease: "easeOut" }}
					>
						<motion.div
							className="mb-8"
							initial={{ scale: 0.8, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							transition={{ duration: 0.6, delay: 0.2 }}
						>
							<div className="w-24 h-24 bg-gradient-to-br from-highland to-sark rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
								<FontAwesomeIcon
									icon={faDog}
									className="text-4xl text-honeydew"
								/>
							</div>
						</motion.div>
						<motion.h1
							className="font-delius text-4xl md:text-6xl lg:text-7xl font-bold text-oxfordBlue drop-shadow-md mb-6"
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.3 }}
						>
							Find Your Perfect Dog
						</motion.h1>
						<motion.p
							className="text-lg lg:text-xl text-highland font-fredoka max-w-3xl mx-auto mb-12"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.6, delay: 0.4 }}
						>
							Tell us what you're looking for and we'll find your
							ideal companion. <br />
							This will only take a few moments!{" "}
						</motion.p>
						<motion.button
							type="button"
							onClick={() => setHasStarted(true)}
							className="group relative overflow-hidden bg-gradient-to-r from-highland to-sark text-honeydew px-8 py-4 rounded-full font-fredoka font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:text-sunset text-xl"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.5 }}
						>
							<div className="flex items-center justify-center space-x-3 relative z-10">
								<span>Begin</span>
								<FontAwesomeIcon
									icon={faArrowRight}
									className="text-lg group-hover:translate-x-1 transition-transform duration-300"
								/>
							</div>
						</motion.button>
					</motion.div>
				)}

				{hasStarted && !loading && dogs.length === 0 && (
					<>
						<motion.div
							className="mb-8"
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4 }}
						>
							<div className="flex justify-between items-center mb-2">
								<span className="text-oxfordBlue font-poppins font-semibold">
									Question {currentQuestionIndex + 1} of{" "}
									{questions.length}
								</span>
							</div>
							<div className="w-full bg-tara/30 rounded-full h-3 overflow-hidden">
								<motion.div
									className="h-full bg-gradient-to-r from-highland to-sark rounded-full"
									initial={{ width: 0 }}
									animate={{ width: `${progress}%` }}
									transition={{
										duration: 0.5,
										ease: "easeOut",
									}}
								/>
							</div>
						</motion.div>

						<div className="bg-tomThumb rounded-3xl shadow-xl p-8 lg:p-10 mb-8">
							<AnimatePresence mode="wait">
								<motion.div
									key={currentQuestionIndex}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{
										duration: 0.3,
										ease: "easeInOut",
									}}
								>
									<div className="text-center mb-8">
										<div className="w-16 h-16 bg-gradient-to-br from-highland to-tomThumb rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_4px_12px_rgba(0,0,0,0.4)]">
											<FontAwesomeIcon
												icon={currentQuestion.icon}
												className="text-2xl text-sunset"
											/>
										</div>
										<h2 className="text-2xl lg:text-3xl font-bold text-tara font-delius mb-2">
											{currentQuestion.label}
										</h2>
									</div>

									{currentQuestion.helpText && (
										<p className="text-sm text-tara/80 font-poppins text-center mb-6 max-w-2xl mx-auto">
											{currentQuestion.helpText}
										</p>
									)}

									<div className="space-y-4">
										{currentQuestion.field === "breed" ? (
											<div className="max-w-2xl mx-auto space-y-3">
												<BreedSearchSelect
													options={breedOptions}
													value={
														(getCurrentValue(
															currentQuestion.field
														) as string) || ""
													}
													onChange={(v) =>
														handleAnswer(
															currentQuestion,
															v
														)
													}
													emptyLabel="No preference"
												/>
												<p className="text-center mt-2">
													<Link
														to="/contact"
														className="inline-flex items-center gap-2 font-poppins text-sm text-twilight hover:text-yellowOrange hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-highland focus-visible:ring-offset-2 rounded transition-colors duration-200"
														aria-label="My breed is not in the list, go to contact form"
													>
														<FontAwesomeIcon
															icon={faEnvelope}
															className="text-xs"
															aria-hidden
														/>
														<span>
															My breed isn’t
															listed — contact us
														</span>
													</Link>
												</p>
											</div>
										) : currentQuestion.type === "text" ? (
											<div className="max-w-2xl mx-auto">
												<input
													type="text"
													value={
														(getCurrentValue(
															currentQuestion.field
														) as string) || ""
													}
													onChange={(e) =>
														handleAnswer(
															currentQuestion,
															e.target.value
														)
													}
													placeholder={
														currentQuestion.placeholder ||
														""
													}
													className="w-full px-6 py-4 border-2 border-oxfordBlue rounded-full font-poppins focus:outline-none focus:ring-2 focus:ring-highland transition-colors text-center"
												/>
											</div>
										) : currentQuestion.type ===
										  "boolean" ? (
											<div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
												{currentQuestion.options?.map(
													(option, optionIndex) => {
														const currentValue =
															getCurrentValue(
																currentQuestion.field
															);
														const isSelected =
															currentValue ===
															option.value;
														return (
															<label
																key={`${currentQuestion.id}-${optionIndex}`}
																className={`flex items-center justify-center space-x-3 cursor-pointer group p-4 rounded-2xl border-2 transition-all duration-300 ${
																	isSelected
																		? "bg-gradient-to-r from-highland to-sark text-honeydew border-highland shadow-lg transform scale-105"
																		: "bg-gradient-to-r from-tara to-mintCream text-oxfordBlue border-oxfordBlue hover:from-highland hover:to-sark hover:text-honeydew hover:border-highland"
																}`}
															>
																<input
																	type="radio"
																	name={
																		currentQuestion.id
																	}
																	checked={
																		isSelected
																	}
																	onChange={() =>
																		handleAnswer(
																			currentQuestion,
																			option.value
																		)
																	}
																	className="sr-only"
																/>
																<span className="font-poppins font-semibold text-center text-sm md:text-base">
																	{
																		option.label
																	}
																</span>
															</label>
														);
													}
												)}
											</div>
										) : (
											<div
												className={`grid gap-4 ${
													currentQuestion.options
														?.length === 3
														? "grid-cols-1 md:grid-cols-3"
														: "grid-cols-1 md:grid-cols-2"
												}`}
											>
												{currentQuestion.options?.map(
													(option, optionIndex) => {
														const currentValue =
															getCurrentValue(
																currentQuestion.field
															);
														let isSelected = false;
														if (
															currentQuestion.field2
														) {
															if (
																currentQuestion.field ===
																"age_min"
															) {
																const ageMin =
																	getCurrentValue(
																		"age_min"
																	);
																const ageMax =
																	getCurrentValue(
																		"age_max"
																	);
																isSelected =
																	ageMin ===
																		option.age_min &&
																	ageMax ===
																		option.age_max;
															}
														} else {
															isSelected =
																currentValue ===
																option.value;
														}
														return (
															<label
																key={`${currentQuestion.id}-${optionIndex}`}
																className={`flex items-start justify-start space-x-3 cursor-pointer group p-4 rounded-2xl border-2 transition-all duration-300 ${
																	isSelected
																		? "bg-gradient-to-r from-highland to-sark text-honeydew border-highland shadow-lg transform scale-105"
																		: "bg-gradient-to-r from-tara to-mintCream text-oxfordBlue border-oxfordBlue hover:from-highland hover:to-sark hover:text-honeydew hover:border-highland"
																}`}
															>
																<input
																	type="radio"
																	name={
																		currentQuestion.id
																	}
																	checked={
																		isSelected
																	}
																	onChange={() =>
																		handleAnswer(
																			currentQuestion,
																			option.value
																		)
																	}
																	className="sr-only"
																/>
																{option.icon && (
																	<FontAwesomeIcon
																		icon={
																			option.icon
																		}
																		className="text-lg mt-1 flex-shrink-0"
																	/>
																)}
																<span className="font-poppins font-semibold text-left text-sm md:text-base">
																	{
																		option.label
																	}
																</span>
															</label>
														);
													}
												)}
											</div>
										)}
									</div>

									<div
										className={`flex ${
											currentQuestionIndex === 0
												? "justify-end"
												: "justify-between"
										} items-center mt-8`}
									>
										{currentQuestionIndex > 0 && (
											<button
												type="button"
												onClick={handlePrevious}
												className="px-6 py-3 rounded-full font-poppins font-semibold transition-all duration-300 bg-gradient-to-r from-tara to-mintCream text-oxfordBlue border-2 border-oxfordBlue hover:from-highland hover:to-sark hover:text-honeydew hover:border-highland"
											>
												Previous
											</button>
										)}

										<button
											type="button"
											onClick={handleNext}
											className="group relative overflow-hidden bg-gradient-to-r from-highland to-sark text-honeydew px-8 py-4 rounded-full font-fredoka font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:text-sunset"
										>
											<div className="flex items-center justify-center space-x-3 relative z-10">
												<span>
													{currentQuestionIndex ===
													questions.length - 1
														? "Find My Dogs"
														: isQuestionAnswered(
																	currentQuestion
															  )
															? "Next"
															: "Skip"}
												</span>
												{currentQuestionIndex !==
													questions.length - 1 && (
													<FontAwesomeIcon
														icon={faArrowRight}
														className="text-lg group-hover:translate-x-1 transition-transform duration-300"
													/>
												)}
											</div>
										</button>
									</div>
								</motion.div>
							</AnimatePresence>
						</div>
					</>
				)}

				{loading && (
					<motion.div
						className="bg-tomThumb rounded-3xl shadow-xl p-12 text-center"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
					>
						<div className="animate-spin w-16 h-16 border-4 border-skyBlue border-t-transparent rounded-full mx-auto mb-4"></div>
						<p className="text-tara font-poppins text-lg">
							Finding your perfect dogs...
						</p>
					</motion.div>
				)}

				{dogs.length > 0 && currentDogIndex < dogs.length && (
					<motion.div
						ref={resultsRef}
						className="w-full max-w-7xl mx-auto py-10 px-4"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.6,
							delay: 0.2,
							ease: "easeOut",
						}}
					>
						<motion.div
							className="text-center mb-8"
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.3 }}
						>
							<div className="w-20 h-20 bg-gradient-to-br from-highland to-sark rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
								<FontAwesomeIcon
									icon={["fas", "heart"]}
									className="text-3xl text-honeydew"
								/>
							</div>
							<h2 className="font-delius text-4xl md:text-5xl font-bold text-oxfordBlue drop-shadow-md mb-3">
								Your Perfect Match!
							</h2>
							<p className="text-lg text-highland font-fredoka max-w-2xl mx-auto mb-4">
								{dogs.length > 1 && (
									<span>
										Match {currentDogIndex + 1} of{" "}
										{dogs.length} -{" "}
									</span>
								)}
								{matchRates[dogs[currentDogIndex].id] != null && (
									<span className="font-semibold text-highland bg-highland/10 px-1.5 py-0.5 rounded">
										{Math.round(
											matchRates[dogs[currentDogIndex].id]
										)}
										%
									</span>
								)}
							</p>
						</motion.div>

						<AnimatePresence mode="wait">
							<motion.div
								key={
									dogs[currentDogIndex].id ||
									`dog-${currentDogIndex}`
								}
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.95 }}
								transition={{
									duration: 0.4,
									ease: "easeInOut",
								}}
								className="w-full min-h-[360px]"
							>
								<AdoptionCard dog={dogs[currentDogIndex]} />
							</motion.div>
						</AnimatePresence>

						<motion.div
							className="text-center mt-8"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.6, delay: 0.5 }}
						>
							<button
								type="button"
								onClick={dismissMatch}
								className="text-oxfordBlue/70 hover:text-oxfordBlue font-poppins font-semibold underline transition-colors duration-300"
							>
								This dog has been adopted / Not available - Show
								next match
							</button>
						</motion.div>
					</motion.div>
				)}

				{error && (
					<motion.div
						ref={resultsRef}
						className="max-w-2xl mx-auto"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.6,
							delay: 0.2,
							ease: "easeOut",
						}}
					>
						<motion.div
							className="bg-gradient-to-br from-tara to-mintCream rounded-3xl shadow-xl p-8 text-center border-2 border-oxfordBlue/20"
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.5, delay: 0.3 }}
						>
							<div className="w-16 h-16 bg-gradient-to-br from-highland to-sark rounded-full flex items-center justify-center mx-auto mb-4">
								<FontAwesomeIcon
									icon={faSearch}
									className="text-2xl text-honeydew"
								/>
							</div>
							<h3 className="text-2xl font-bold text-oxfordBlue mb-3 font-delius">
								No Match Found
							</h3>
							<p className="text-oxfordBlue font-poppins text-lg mb-4">
								{error}
							</p>
							<p className="text-oxfordBlue/70 font-poppins mb-6">
								Try adjusting your search criteria or browse all
								available dogs
							</p>
							<button
								type="button"
								onClick={resetFlow}
								className="group relative overflow-hidden bg-gradient-to-r from-highland to-sark text-honeydew px-8 py-4 rounded-full font-fredoka font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:text-sunset"
							>
								<div className="flex items-center justify-center space-x-3 relative z-10">
									<span>Try Again</span>
									<FontAwesomeIcon
										icon={faArrowRight}
										className="text-lg group-hover:translate-x-1 transition-transform duration-300"
									/>
								</div>
							</button>
						</motion.div>
					</motion.div>
				)}
			</div>
		</motion.div>
	);
}

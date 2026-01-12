import React, { useState, useRef, useEffect } from "react";
import { dogAPI, Dog } from "../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, AnimatePresence } from "framer-motion";
import {
	faSearch,
	faArrowRight,
	faDog,
} from "@fortawesome/free-solid-svg-icons";
import AdoptionCard from "../../components/cards/adoptCard";
import { useToast } from "../../components/ToastContainer";
import { questions, Question } from "./adoptionCalculatorQuestions";

export default function Adoption() {
	const [hasStarted, setHasStarted] = useState(false);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

	// Store all answers in a single object
	const [answers, setAnswers] = useState<Record<string, any>>({
		size: "",
		gender: "",
		age_min: undefined,
		age_max: undefined,
		good_with_dogs: undefined,
		good_with_cats: undefined,
		good_with_children: undefined,
		breed: "",
		is_crossbreed: undefined,
	});

	const [dogs, setDogs] = useState<Dog[]>([]);
	const [matchRates, setMatchRates] = useState<Record<string, number>>({});
	const [currentDogIndex, setCurrentDogIndex] = useState(0);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const resultsRef = useRef<HTMLDivElement>(null);
	const { showToast } = useToast();

	// Auto-scroll to results when dogs are found
	useEffect(() => {
		if (dogs.length > 0 && resultsRef.current) {
			resultsRef.current.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		}
	}, [dogs]);

	const getCurrentValue = (field: string): any => {
		return answers[field];
	};

	const isQuestionAnswered = (question: Question): boolean => {
		const value = getCurrentValue(question.field);
		if (question.type === "text") {
			// Text questions are optional, always allow skipping
			return true;
		}
		if (question.type === "boolean") {
			return value !== undefined;
		}
		if (question.type === "select") {
			// For select with null option (is_crossbreed), undefined means not answered
			if (question.field === "is_crossbreed") {
				return value !== undefined;
			}
			return value !== "" && value !== undefined;
		}
		return false;
	};

	const handleAnswer = (question: Question, value: any) => {
		if (question.type === "select" && question.field2) {
			// Handle range questions (age)
			const option = question.options?.find((opt) => opt.value === value);
			if (option) {
				if (question.field === "age_min") {
					setAnswers((prev) => ({
						...prev,
						age_min: option.age_min ?? undefined,
						age_max: option.age_max ?? undefined,
					}));
				}
			}
		} else {
			// Handle regular select, boolean, and text questions
			// For empty string values (like "No preference"), set to empty string
			if (value === "") {
				setAnswers((prev) => ({
					...prev,
					[question.field]: "",
				}));
			} else {
				setAnswers((prev) => ({
					...prev,
					[question.field]: value,
				}));
			}
		}
	};

	const handleNext = () => {
		if (currentQuestionIndex < questions.length - 1) {
			setCurrentQuestionIndex(currentQuestionIndex + 1);
		} else {
			handleSubmit();
		}
	};

	const handlePrevious = () => {
		if (currentQuestionIndex > 0) {
			setCurrentQuestionIndex(currentQuestionIndex - 1);
		}
	};

	const handleSubmit = async () => {
		setLoading(true);
		setError("");

		try {
			// Build preferences object, only including non-empty/non-undefined values
			const preferences: Record<string, any> = {};

			if (answers.size) preferences.size = answers.size;
			if (answers.gender) preferences.gender = answers.gender;
			if (answers.age_min !== undefined)
				preferences.age_min = answers.age_min;
			if (answers.age_max !== undefined)
				preferences.age_max = answers.age_max;
			if (answers.good_with_dogs !== undefined)
				preferences.good_with_dogs = answers.good_with_dogs;
			if (answers.good_with_cats !== undefined)
				preferences.good_with_cats = answers.good_with_cats;
			if (answers.good_with_children !== undefined)
				preferences.good_with_children = answers.good_with_children;
			if (answers.breed) preferences.breed = answers.breed;
			if (answers.is_crossbreed !== undefined)
				preferences.is_crossbreed = answers.is_crossbreed;

			// Check if at least one preference is provided
			if (Object.keys(preferences).length === 0) {
				throw new Error("Please answer at least one question");
			}

			const response = await dogAPI.matchDogs(preferences);

			if (!response || !response.matches) {
				throw new Error("Invalid response from server");
			}

			const matchedDogs = response.matches.map((match) => match.dog);
			const rates: Record<string, number> = {};

			response.matches.forEach((match) => {
				// Use dog id as key for match rate
				rates[match.dog.id] = match.match_rate;
			});

			setDogs(matchedDogs);
			setMatchRates(rates);
			setCurrentDogIndex(0); // Reset to first dog

			if (matchedDogs.length > 0) {
				showToast({
					type: "success",
					title: "Dogs Found!",
					message: `Found ${matchedDogs.length} dog${
						matchedDogs.length === 1 ? "" : "s"
					} that match your criteria.`,
					duration: 4000,
				});
			} else {
				setError(
					"No dogs found with a match rate greater than 0%. Try adjusting your preferences to be less specific."
				);
				showToast({
					type: "info",
					title: "No Matches Found",
					message:
						"No dogs matched your criteria. Try adjusting your preferences.",
					duration: 5000,
				});
			}
		} catch (err: any) {
			console.error("Search error:", err);
			setDogs([]);
			setMatchRates({});
			const errorMessage =
				err.response?.data?.error ||
				err.message ||
				"No matching dogs found. Try adjusting your search criteria.";
			setError(errorMessage);
			showToast({
				type: "error",
				title: "Search Failed",
				message: errorMessage,
				duration: 5000,
			});
		} finally {
			setLoading(false);
		}
	};

	const currentQuestion = questions[currentQuestionIndex];
	const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

	return (
		<motion.div
			id="adopt"
			className="min-h-screen bg-gradient-to-br from-twilight to-sprout pt-16 pb-8 px-4"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.8, ease: "easeOut" }}
		>
			<div className="max-w-4xl mx-auto">
				{/* Start Screen */}
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
							ideal companion. <br></br>This will only take a few
							moments!{" "}
						</motion.p>
						<motion.button
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

				{/* Question Flow */}
				{hasStarted && !loading && dogs.length === 0 && (
					<>
						{/* Progress Bar */}
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

						{/* Question Card */}
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
									{/* Question Header */}
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

									{/* Question Help Text */}
									{currentQuestion.helpText && (
										<p className="text-sm text-tara/80 font-poppins text-center mb-6 max-w-2xl mx-auto">
											{currentQuestion.helpText}
										</p>
									)}

									{/* Question Options */}
									<div className="space-y-4">
										{currentQuestion.type === "text" ? (
											// Text input
											<div className="max-w-2xl mx-auto">
												<input
													type="text"
													value={
														getCurrentValue(
															currentQuestion.field
														) || ""
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
											// Boolean options (Yes/No)
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
											// Select options
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
														// For range questions, check if the range matches
														let isSelected = false;
														if (
															currentQuestion.field2
														) {
															// Check if age range matches
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

									{/* Navigation Buttons */}
									<div
										className={`flex ${
											currentQuestionIndex === 0
												? "justify-end"
												: "justify-between"
										} items-center mt-8`}
									>
										{currentQuestionIndex > 0 && (
											<button
												onClick={handlePrevious}
												className="px-6 py-3 rounded-full font-poppins font-semibold transition-all duration-300 bg-gradient-to-r from-tara to-mintCream text-oxfordBlue border-2 border-oxfordBlue hover:from-highland hover:to-sark hover:text-honeydew hover:border-highland"
											>
												Previous
											</button>
										)}

										<button
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

				{/* Loading State */}
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

				{/* Results Section */}
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
						{/* Results Header */}
						<motion.div
							className="text-center mb-8"
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.3 }}
						>
							<div className="w-20 h-20 bg-gradient-to-br from-highland to-sark rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
								<FontAwesomeIcon
									icon={faHeart}
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
								{matchRates[dogs[currentDogIndex].id] && (
									<span>
										{matchRates[
											dogs[currentDogIndex].id
										].toFixed(1)}
										% Match
									</span>
								)}
							</p>
						</motion.div>

						{/* Single Dog Card - Full Width */}
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
								className="w-full"
							>
								<AdoptionCard dog={dogs[currentDogIndex]} />
							</motion.div>
						</AnimatePresence>

						{/* Not Available Button */}
						<motion.div
							className="text-center mt-8"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.6, delay: 0.5 }}
						>
							<button
								onClick={() => {
									if (currentDogIndex < dogs.length - 1) {
										setCurrentDogIndex(currentDogIndex + 1);
									} else {
										// No more matches
										setDogs([]);
										setMatchRates({});
										setCurrentDogIndex(0);
										setError(
											"No more matches available. Try adjusting your preferences to see more options."
										);
										showToast({
											type: "info",
											title: "No More Matches",
											message:
												"All available matches have been shown. Try adjusting your preferences.",
											duration: 5000,
										});
									}
								}}
								className="text-oxfordBlue/70 hover:text-oxfordBlue font-poppins font-semibold underline transition-colors duration-300"
							>
								This dog has been adopted / Not available - Show
								next match
							</button>
						</motion.div>
					</motion.div>
				)}

				{/* Error Message */}
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
								onClick={() => {
									setHasStarted(false);
									setCurrentQuestionIndex(0);
									setAnswers({
										size: "",
										gender: "",
										age_min: undefined,
										age_max: undefined,
										good_with_dogs: undefined,
										good_with_cats: undefined,
										good_with_children: undefined,
										breed: "",
										is_crossbreed: undefined,
									});
									setError("");
									setDogs([]);
									setMatchRates({});
									setCurrentDogIndex(0);
								}}
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

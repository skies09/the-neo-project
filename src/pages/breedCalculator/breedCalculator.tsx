import React, { useState, useRef, useEffect } from "react";
import { breedsAPI, Breed } from "../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "../../components/ToastContainer";
import BreedDetailModal from "../../components/modals/BreedDetailModal";
import {
	faSearch,
	faArrowRight,
	faInfoCircle,
	faDog,
	faPaw,
} from "@fortawesome/free-solid-svg-icons";
import { questions, Question } from "./breedCalculatorQuestions";

export default function BreedCalculator() {
	const [hasStarted, setHasStarted] = useState(false);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

	// Store all answers in a single object
	const [answers, setAnswers] = useState<Record<string, string | number>>({
		size: "",
		apartment_dog: 0,
		can_be_alone: 0,
		good_for_busy_owners: 0,
		family_friendly: 0,
		child_friendly: 0,
		pet_friendly: 0,
		stranger_friendly: 0,
		friendliness: 0,
		energy_levels: 0,
		playfulness: 0,
		easy_to_train: 0,
		good_for_new_owners: 0,
		easy_to_groom: 0,
		shedding_amount: 0,
		barks_howls: 0,
		guard_dog: 0,
		health: 0,
	});

	const [breeds, setBreeds] = useState<Breed[]>([]);
	const [matchRates, setMatchRates] = useState<Record<string, number>>({});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [selectedBreed, setSelectedBreed] = useState<Breed | null>(null);
	const resultsRef = useRef<HTMLDivElement>(null);
	const { showToast } = useToast();
	const [isDragging, setIsDragging] = useState(false);
	const sliderRef = useRef<HTMLDivElement>(null);

	// Auto-scroll to results when breeds are found
	useEffect(() => {
		if (breeds.length > 0 && resultsRef.current) {
			resultsRef.current.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		}
	}, [breeds]);

	const getCurrentValue = (field: string): string | number => {
		return answers[field] || (field === "size" ? "" : 0);
	};

	const isQuestionAnswered = (question: Question): boolean => {
		const value = getCurrentValue(question.field);
		if (question.type === "select") {
			return value !== "" && value !== 0;
		}
		// For slider questions, 0 means not answered
		return typeof value === "number" && value > 0;
	};

	const handleAnswer = (question: Question, value: string | number) => {
		// For select questions with mapping, convert the selected value to API value
		if (
			question.type === "select" &&
			question.mapping &&
			typeof value === "string"
		) {
			const apiValue = question.mapping[value];
			if (apiValue !== undefined) {
				setAnswers((prev) => ({
					...prev,
					[question.field]: apiValue,
				}));
				return;
			}
		}

		// For select questions without mapping (like size), store the value directly
		if (
			question.type === "select" &&
			!question.mapping &&
			typeof value === "string"
		) {
			setAnswers((prev) => ({
				...prev,
				[question.field]: value,
			}));
			return;
		}

		// For reverse scale questions (shedding, barking), invert the value
		if (
			question.type === "slider" &&
			question.reverseScale &&
			typeof value === "number"
		) {
			// User selects 1-10, but we need to invert: 1 becomes 10, 10 becomes 1
			const invertedValue = 11 - value;
			setAnswers((prev) => ({
				...prev,
				[question.field]: invertedValue,
			}));
			return;
		}

		// Default: store value as-is
		setAnswers((prev) => ({
			...prev,
			[question.field]: value,
		}));
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

	// Map form values to API preferences - values are already in correct format
	const mapFormValuesToPreferences = () => {
		const preferences: Record<string, any> = {};

		// Add all non-zero/non-empty answers
		Object.entries(answers).forEach(([key, value]) => {
			if (key === "size" && value !== "") {
				preferences[key] = value;
			} else if (typeof value === "number" && value > 0) {
				preferences[key] = value;
			}
		});

		return preferences;
	};

	// Get display value for select questions (to show selected option)
	const getDisplayValue = (question: Question): string | number => {
		if (question.type === "select") {
			const currentValue = getCurrentValue(question.field);
			// For select questions with mapping, find the option that matches the API value
			if (question.mapping && typeof currentValue === "number") {
				const option = question.options?.find(
					(opt) => opt.apiValue === currentValue
				);
				return option?.value || "";
			}
			return currentValue;
		}
		// For reverse scale, show inverted value to user
		if (question.type === "slider" && question.reverseScale) {
			const currentValue = getCurrentValue(question.field) as number;
			if (currentValue > 0) {
				return 11 - currentValue; // Invert back for display
			}
		}
		return getCurrentValue(question.field);
	};

	// Slider drag handlers
	const getValueFromPosition = (
		clientX: number,
		question: Question
	): number => {
		if (!sliderRef.current) return 1;
		const rect = sliderRef.current.getBoundingClientRect();
		const x = clientX - rect.left;
		const percentage = Math.max(0, Math.min(1, x / rect.width));
		let value = Math.round(percentage * 9) + 1; // 1-10

		// For reverse scale, we'll handle inversion in handleAnswer
		return value;
	};

	const handleSliderMouseDown = (e: React.MouseEvent, question: Question) => {
		e.preventDefault();
		setIsDragging(true);
		const value = getValueFromPosition(e.clientX, question);
		handleAnswer(question, value);
	};

	const handleSliderMouseMove = (e: MouseEvent, question: Question) => {
		if (!isDragging) return;
		e.preventDefault();
		const value = getValueFromPosition(e.clientX, question);
		handleAnswer(question, value);
	};

	const handleSliderMouseUp = () => {
		setIsDragging(false);
	};

	const handleSliderTouchMove = (e: React.TouchEvent, question: Question) => {
		if (!isDragging) return;
		e.preventDefault();
		const touch = e.touches[0];
		const value = getValueFromPosition(touch.clientX, question);
		handleAnswer(question, value);
	};

	useEffect(() => {
		if (isDragging) {
			const handleMouseMove = (e: MouseEvent) => {
				const currentQuestion = questions[currentQuestionIndex];
				if (currentQuestion && currentQuestion.type === "slider") {
					handleSliderMouseMove(e, currentQuestion);
				}
			};
			const handleMouseUp = () => handleSliderMouseUp();

			document.addEventListener("mousemove", handleMouseMove);
			document.addEventListener("mouseup", handleMouseUp);

			return () => {
				document.removeEventListener("mousemove", handleMouseMove);
				document.removeEventListener("mouseup", handleMouseUp);
			};
		}
	}, [isDragging, currentQuestionIndex]);

	const handleSubmit = async () => {
		setLoading(true);
		setError("");

		try {
			const preferences = mapFormValuesToPreferences();

			// Check if at least one preference is provided
			if (Object.keys(preferences).length === 0) {
				throw new Error("Please answer at least one question");
			}

			const response = await breedsAPI.matchBreeds(preferences);

			// Handle case where matches might be undefined or null
			if (!response || !response.matches) {
				throw new Error("Invalid response from server");
			}

			const matchedBreeds = response.matches.map((match) => match.breed);
			const rates: Record<string, number> = {};

			response.matches.forEach((match) => {
				// Use breed name as key for match rate
				rates[match.breed.breed] = match.match_rate;
			});

			setBreeds(matchedBreeds);
			setMatchRates(rates);

			if (matchedBreeds.length > 0) {
				showToast({
					type: "success",
					title: "Breeds Found!",
					message: `Found ${matchedBreeds.length} breed${
						matchedBreeds.length === 1 ? "" : "s"
					} that match your criteria.`,
					duration: 4000,
				});
			} else {
				// API returned successfully but no breeds matched (all had 0% match rate)
				setError(
					"No breeds found with a match rate greater than 0%. Try adjusting your preferences to be less specific."
				);
				showToast({
					type: "info",
					title: "No Matches Found",
					message:
						"No breeds matched your criteria. Try adjusting your preferences.",
					duration: 5000,
				});
			}
		} catch (err: any) {
			console.error("Search error:", err);
			setBreeds([]);
			setMatchRates({});
			const errorMessage =
				err.response?.data?.error ||
				err.message ||
				"No matching breeds found. Try adjusting your criteria.";
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
			id="breedCalculator"
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
							Find Your Perfect Breed
						</motion.h1>
						<motion.p
							className="text-lg lg:text-xl text-highland font-fredoka max-w-3xl mx-auto mb-12"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.6, delay: 0.4 }}
						>
							Tell us about your lifestyle and we'll recommend the
							perfect breeds for you. This will only take a few
							minutes!
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
				{hasStarted && !loading && breeds.length === 0 && (
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
										{currentQuestion.type === "select" ? (
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
														const displayValue =
															getDisplayValue(
																currentQuestion
															);
														const isSelected =
															displayValue ===
															option.value;
														return (
															<label
																key={`${currentQuestion.id}-${option.value}-${optionIndex}`}
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
																	value={
																		option.value
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
										) : (
											// Slider selector (1-10)
											<div className="space-y-6">
												{/* Scale Labels at specific points */}
												{currentQuestion.scaleLabels && (
													<div className="relative">
														<div className="flex justify-between text-xs text-tara/70 font-poppins px-2 mb-2">
															{currentQuestion
																.scaleLabels[
																"1"
															] && (
																<span className="text-left max-w-[30%]">
																	{
																		currentQuestion
																			.scaleLabels[
																			"1"
																		]
																	}
																</span>
															)}
															{currentQuestion
																.scaleLabels[
																"5"
															] && (
																<span className="text-center max-w-[30%]">
																	{
																		currentQuestion
																			.scaleLabels[
																			"5"
																		]
																	}
																</span>
															)}
															{currentQuestion
																.scaleLabels[
																"10"
															] && (
																<span className="text-right max-w-[30%]">
																	{
																		currentQuestion
																			.scaleLabels[
																			"10"
																		]
																	}
																</span>
															)}
														</div>
													</div>
												)}

												{/* Draggable Slider */}
												<div className="relative py-8 px-6">
													<div
														ref={sliderRef}
														className="relative w-full h-3 bg-gradient-to-r from-tara to-mintCream rounded-full border-2 border-oxfordBlue cursor-pointer"
														onMouseDown={(e) =>
															handleSliderMouseDown(
																e,
																currentQuestion
															)
														}
														onTouchStart={(e) => {
															setIsDragging(true);
															const touch =
																e.touches[0];
															const value =
																getValueFromPosition(
																	touch.clientX,
																	currentQuestion
																);
															handleAnswer(
																currentQuestion,
																value
															);
														}}
														onTouchMove={(e) =>
															handleSliderTouchMove(
																e,
																currentQuestion
															)
														}
														onTouchEnd={() =>
															setIsDragging(false)
														}
													>
														{/* Dog Icon Slider Handle */}
														{(() => {
															const displayValue =
																getDisplayValue(
																	currentQuestion
																) as number;
															const value =
																displayValue > 0
																	? displayValue
																	: 1;
															const percentage =
																((value - 1) /
																	9) *
																100;

															return (
																<div
																	className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 cursor-grab active:cursor-grabbing z-10 select-none"
																	style={{
																		left: `${percentage}%`,
																	}}
																	onMouseDown={(
																		e
																	) => {
																		e.stopPropagation();
																		handleSliderMouseDown(
																			e,
																			currentQuestion
																		);
																	}}
																>
																	<div className="w-12 h-12 bg-gradient-to-br from-highland to-sark rounded-full flex items-center justify-center shadow-lg border-2 border-honeydew transform hover:scale-110 transition-transform pointer-events-none">
																		<FontAwesomeIcon
																			icon={
																				faPaw
																			}
																			className="text-honeydew text-xl"
																		/>
																	</div>
																</div>
															);
														})()}
													</div>
												</div>

												{/* Selected Value Display */}
												{(() => {
													const displayValue =
														getDisplayValue(
															currentQuestion
														) as number;
													if (displayValue > 0) {
														return (
															<div className="text-center">
																<p className="text-tara font-poppins font-semibold text-lg">
																	Selected:{" "}
																	<span className="text-sunset">
																		{
																			displayValue
																		}
																	</span>
																</p>
															</div>
														);
													}
													return null;
												})()}
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
														? "Find My Breeds"
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
							Finding your perfect breeds...
						</p>
					</motion.div>
				)}

				{/* Results Section */}
				<motion.div
					ref={resultsRef}
					className="max-w-7xl mx-auto py-10"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
				>
					{breeds.length > 0 && (
						<motion.div
							className="text-center mb-12"
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.7 }}
						>
							<div className="flex justify-center items-center mb-4">
								<h2 className="font-delius text-3xl lg:text-4xl font-bold text-oxfordBlue tracking-wider drop-shadow-md">
									Perfect Breeds for You
								</h2>
							</div>
							<p className="text-lg text-highland font-fredoka max-w-3xl mx-auto">
								Based on your lifestyle, here are the breeds
								that would be perfect for you
							</p>
						</motion.div>
					)}

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
						{breeds.map((breed, index) => (
							<motion.div
								key={
									breed.id || breed.breed || `breed-${index}`
								}
								className="relative group cursor-pointer w-full max-w-xs p-2"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.6,
									delay: 0.8 + index * 0.1,
								}}
							>
								<motion.div
									className="w-full min-h-80 bg-gradient-to-br from-tara to-mintCream rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl flex flex-col overflow-hidden"
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
								>
									{/* Header with icon */}
									<div className="h-36 relative rounded-t-2xl flex items-center justify-center pt-6 flex-shrink-0">
										<div className="w-16 h-16 bg-gradient-to-br from-highland to-tomThumb rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.4)]">
											<FontAwesomeIcon
												icon={faDog}
												className="text-2xl text-sunset"
											/>
										</div>
									</div>

									{/* Content */}
									<div className="px-4 sm:px-6 pt-4 sm:pt-6 pb-4 sm:pb-6 flex flex-col flex-grow min-h-0">
										<motion.h3
											className="font-delius font-bold text-lg sm:text-xl text-oxfordBlue text-center mb-4 min-h-[5rem] flex items-center justify-center flex-shrink-0"
											whileHover={{ scale: 1.02 }}
										>
											{breed.breed}
										</motion.h3>

										<div className="space-y-2 sm:space-y-3 flex-grow flex flex-col justify-center flex-shrink-0">
											<div className="flex items-center justify-between">
												<span className="text-oxfordBlue/70 font-poppins text-xs sm:text-sm font-medium">
													Group:
												</span>
												<span className="font-semibold font-poppins text-oxfordBlue bg-oxfordBlue/10 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
													{breed.group}
												</span>
											</div>
											<div className="flex items-center justify-between">
												<span className="text-oxfordBlue/70 font-poppins text-xs sm:text-sm font-medium">
													Match Score:
												</span>
												<span className="font-semibold font-poppins text-oxfordBlue bg-gradient-to-r from-highland to-sark text-honeydew px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
													{matchRates[breed.breed]
														? `${matchRates[
																breed.breed
														  ].toFixed(1)}%`
														: "N/A"}
												</span>
											</div>
										</div>

										{/* Action button */}
										<div className="flex-shrink-0 mt-4">
											<button
												onClick={(e) => {
													e.stopPropagation();
													setSelectedBreed(breed);
												}}
												className="w-full group relative overflow-hidden bg-gradient-to-r from-tara to-mintCream text-oxfordBlue border-2 border-oxfordBlue px-3 sm:px-4 py-3 rounded-full font-fredoka font-semibold text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
											>
												<div className="flex items-center justify-center space-x-2 relative z-10">
													<FontAwesomeIcon
														icon={faInfoCircle}
														className="text-sm"
													/>
													<span>Learn More</span>
												</div>
												<div className="absolute inset-0 bg-gradient-to-r from-turquoise to-skyBlue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
											</button>
										</div>
									</div>
								</motion.div>
							</motion.div>
						))}
					</div>

					{error && (
						<motion.div
							className="text-center p-8 bg-tomThumb rounded-3xl shadow-xl mt-8"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
						>
							<div className="w-16 h-16 bg-gradient-to-br from-highland to-tomThumb rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_4px_12px_rgba(0,0,0,0.4)]">
								<FontAwesomeIcon
									icon={faSearch}
									className="text-2xl text-sunset"
								/>
							</div>
							<p className="text-tara font-poppins font-semibold text-lg mb-2">
								{error}
							</p>
							<p className="text-tara/80 font-poppins text-sm">
								Try adjusting your search criteria
							</p>
						</motion.div>
					)}
				</motion.div>

				{/* Breed Detail Modal */}
				<BreedDetailModal
					selectedBreed={selectedBreed}
					onClose={() => setSelectedBreed(null)}
				/>
			</div>
		</motion.div>
	);
}

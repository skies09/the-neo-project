import React, { useState, useRef, useEffect } from "react";
import { breedsAPI, Breed } from "../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, AnimatePresence } from "framer-motion";
import { ErrorCard } from "../../components/ErrorCard";
import PawLoading from "../../components/PawLoading";
import BreedCard from "../../components/cards/breedCard";
import {
	isNetworkOrTransportFailure,
	resolveApiErrorMessage,
} from "../../helpers/apiErrorMessage";
import { faArrowRight, faDog, faPaw } from "@fortawesome/free-solid-svg-icons";
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
	const [networkError, setNetworkError] = useState(false);
	const resultsRef = useRef<HTMLDivElement>(null);
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
		const autoAdvanceIfNeeded = () => {
			if (question.type !== "slider") {
				setCurrentQuestionIndex((index) =>
					index < questions.length - 1 ? index + 1 : index,
				);
			}
		};

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
				autoAdvanceIfNeeded();
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
			autoAdvanceIfNeeded();
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
		autoAdvanceIfNeeded();
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
					(opt) => opt.apiValue === currentValue,
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
		question: Question,
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
		// eslint-disable-next-line react-hooks/exhaustive-deps -- document listeners use currentQuestionIndex when drag starts; listing handlers would rebind every render while dragging
	}, [isDragging, currentQuestionIndex]);

	const handleSubmit = async () => {
		setLoading(true);
		setError("");
		setNetworkError(false);

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

			if (matchedBreeds.length === 0) {
				setError(
					"No breeds found with a match rate greater than 0%. Try adjusting your preferences to be less specific.",
				);
			}
		} catch (err: any) {
			console.error("Search error:", err);
			setBreeds([]);
			setMatchRates({});
			const isNet = isNetworkOrTransportFailure(err);
			setNetworkError(isNet);
			const errorMessage = resolveApiErrorMessage(
				err,
				"No matching breeds found. Try adjusting your criteria.",
			);
			setError(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	const currentQuestion = questions[currentQuestionIndex];
	const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
	const resultsBackground =
		breeds.length > 0
			? "bg-gradient-to-br from-honeydew to-mintCream"
			: "bg-gradient-to-br from-twilight to-sprout";

	return (
		<motion.div
			id="breedCalculator"
			className={`min-h-screen pt-16 pb-8 px-4 ${resultsBackground}`}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.8, ease: "easeOut" }}
		>
			<div className="max-w-4xl mx-auto">
				{/* Start Screen */}
				{!hasStarted && (
					<motion.div
						className="text-center py-20"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
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
							perfect breeds for you.
						</motion.p>
						<motion.button
							type="button"
							onClick={() => setHasStarted(true)}
							className="btn-primary px-8 py-4 text-xl"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{
								duration: 0.5,
								delay: 0.55,
								ease: "easeOut",
							}}
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
							className="mb-8 mt-2"
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
						<div className="bg-tomThumb rounded-3xl shadow-xl p-8 lg:p-10 mb-4">
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
																currentQuestion,
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
																			option.value,
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
													},
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
																currentQuestion,
															)
														}
														onTouchStart={(e) => {
															setIsDragging(true);
															const touch =
																e.touches[0];
															const value =
																getValueFromPosition(
																	touch.clientX,
																	currentQuestion,
																);
															handleAnswer(
																currentQuestion,
																value,
															);
														}}
														onTouchMove={(e) =>
															handleSliderTouchMove(
																e,
																currentQuestion,
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
																	currentQuestion,
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
																		e,
																	) => {
																		e.stopPropagation();
																		handleSliderMouseDown(
																			e,
																			currentQuestion,
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
															currentQuestion,
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
												className="btn-secondary px-6 py-3"
											>
												Previous
											</button>
										)}

										<button
											onClick={handleNext}
											className="btn-primary px-8 py-4"
										>
											<div className="flex items-center justify-center space-x-3 relative z-10">
												<span>
													{currentQuestionIndex ===
													questions.length - 1
														? "Find My Breeds"
														: isQuestionAnswered(
																	currentQuestion,
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
					<PawLoading message="Finding your perfect breeds..." />
				)}
			</div>

			{/* Results — outside max-w-4xl so the grid matches the Breeds list page width */}
			<motion.div
				ref={resultsRef}
				className="mx-auto mt-2 w-full max-w-7xl"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
			>
				{breeds.length > 0 ? (
					<>
						<motion.div
							className="mb-8 text-center sm:mb-10 mt-8"
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.7 }}
						>
							<h2 className="mb-3 font-delius text-4xl font-bold text-oxfordBlue drop-shadow-md md:text-5xl">
								Perfect Breeds for You
							</h2>
							<p className="mx-auto max-w-2xl font-fredoka text-lg text-highland">
								Based on your lifestyle, here are the breeds
								that would be perfect for you
							</p>
						</motion.div>

						<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
							{breeds.map((breed, index) => {
								const match = matchRates[breed.breed];
								const calculatorMatch =
									match != null && Number.isFinite(match)
										? match
										: null;
								return (
									<motion.div
										key={
											breed.id ??
											breed.breed ??
											`breed-${index}`
										}
										className="min-w-0"
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{
											duration: 0.6,
											delay: 0.8 + index * 0.1,
										}}
									>
										<BreedCard
											breed={breed}
											calculatorMatch={calculatorMatch}
										/>
									</motion.div>
								);
							})}
						</div>
					</>
				) : null}

				{error ? (
					<div className="mt-8 flex justify-center px-2">
						<ErrorCard
							icon={faDog}
							title={
								networkError
									? "We could not load breed matches"
									: error
							}
							showSubtitle={networkError}
							subtitleClassName="text-oxfordBlue/70"
							buttons={[{ type: "home" }]}
							className="max-w-2xl"
							titleClassName="font-delius text-2xl font-bold text-oxfordBlue"
						/>
					</div>
				) : null}
			</motion.div>
		</motion.div>
	);
}

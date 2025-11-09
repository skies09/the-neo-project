import React, { useState, useRef, useEffect } from "react";
import { breedsAPI, Breed } from "../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "../../components/ToastContainer";
import BreedDetailModal from "../../components/modals/BreedDetailModal";
import {
	faSearch,
	faRuler,
	faRunning,
	faUsers,
	faDog,
	faInfoCircle,
	faBaby,
	faClock,
	faLeaf,
	faCity,
	faArrowRight,
	faShieldAlt,
	faHeartbeat,
	faVolumeUp,
	faGraduationCap,
	faSmile,
	faSprayCan,
} from "@fortawesome/free-solid-svg-icons";

interface Question {
	id: string;
	label: string;
	description?: string;
	helpText?: string;
	icon: any;
	type: "select" | "slider";
	options?: { value: string; label: string; apiValue?: number; icon?: any }[];
	field: string;
	scaleLabels?: {
		[key: string]: string;
	};
	reverseScale?: boolean;
	mapping?: Record<string, number>;
}

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

	// Questions array - matching the new questionnaire structure
	const questions: Question[] = [
		// Basic Information
		{
			id: "size",
			label: "What size dog are you looking for?",
			icon: faRuler,
			type: "select",
			field: "size",
			options: [
				{ value: "XS", label: "Extra Small (Under 10 kg / 20 lbs)" },
				{ value: "S", label: "Small (10-15 kg / 20-30 lbs)" },
				{ value: "M", label: "Medium (15-25 kg / 30-55 lbs)" },
				{ value: "L", label: "Large (25-40 kg / 55-90 lbs)" },
				{ value: "XL", label: "Extra Large (Over 40 kg / 90 lbs)" },
			],
		},
		// Living Situation & Accommodation
		{
			id: "living_situation",
			label: "What is your living situation?",
			helpText:
				"Select your current living situation. This will be converted to apartment suitability rating for matching.",
			icon: faCity,
			type: "select",
			field: "apartment_dog",
			options: [
				{
					value: "apartment",
					label: "Apartment - Small living space, limited outdoor area",
					apiValue: 9,
				},
				{
					value: "house",
					label: "House - Standard house with yard/garden",
					apiValue: 6,
				},
				{
					value: "rural_farm",
					label: "Rural/Farm - Large property, farm, or rural setting with extensive outdoor space",
					apiValue: 2,
				},
			],
			mapping: { apartment: 9, house: 6, rural_farm: 2 },
		},
		{
			id: "time_away",
			label: "How often are you out of the house?",
			helpText:
				"Select how often you're typically away from home. This will be converted to independence rating for matching.",
			icon: faClock,
			type: "select",
			field: "can_be_alone",
			options: [
				{
					value: "home_most",
					label: "Home most of the time - Rarely out, work from home, or retired",
					apiValue: 3,
				},
				{
					value: "out_occasionally",
					label: "Out occasionally - Out 2-4 hours at a time, a few times per week",
					apiValue: 6,
				},
				{
					value: "out_regularly",
					label: "Out regularly - Out 4-6 hours daily, standard work schedule",
					apiValue: 8,
				},
				{
					value: "out_frequently",
					label: "Out frequently - Out 6+ hours daily, long work days or frequent travel",
					apiValue: 9,
				},
			],
			mapping: {
				home_most: 3,
				out_occasionally: 6,
				out_regularly: 8,
				out_frequently: 9,
			},
		},
		{
			id: "good_for_busy_owners",
			label: "Are you busy?",
			helpText:
				"1-3: Not busy | 4-6: Moderately busy | 7-8: Very busy | 9-10: Extremely busy",
			icon: faClock,
			type: "slider",
			field: "good_for_busy_owners",
			scaleLabels: {
				"1": "Not busy - Plenty of time",
				"5": "Moderately busy",
				"10": "Extremely busy - Very little time",
			},
		},
		// Family & Social Compatibility
		{
			id: "family_friendly",
			label: "Do you have a family or live with others?",
			helpText:
				"1-3: Live alone | 4-6: Partner/roommate | 7-8: Have a family | 9-10: Large family",
			icon: faUsers,
			type: "slider",
			field: "family_friendly",
			scaleLabels: {
				"1": "Live alone",
				"5": "Live with partner/roommate",
				"10": "Large family",
			},
		},
		{
			id: "child_friendly",
			label: "Do you have children or will the dog be around children?",
			helpText:
				"1-3: No children | 4-6: Occasional contact | 7-8: Regular contact | 9-10: Children in household",
			icon: faBaby,
			type: "slider",
			field: "child_friendly",
			scaleLabels: {
				"1": "No children",
				"5": "Occasional contact",
				"10": "Children in household",
			},
		},
		{
			id: "pet_friendly",
			label: "Do you have other pets?",
			helpText:
				"1-3: No other pets | 4-6: Have other pets | 7-8: Multiple pets | 9-10: Many pets",
			icon: faDog,
			type: "slider",
			field: "pet_friendly",
			scaleLabels: {
				"1": "No other pets",
				"5": "Have other pets",
				"10": "Many pets",
			},
		},
		{
			id: "stranger_friendly",
			label: "Do you have many visitors or want a welcoming dog?",
			helpText:
				"1-3: Few visitors | 4-6: Some visitors | 7-8: Regular visitors | 9-10: Many visitors",
			icon: faSmile,
			type: "slider",
			field: "stranger_friendly",
			scaleLabels: {
				"1": "Few visitors",
				"5": "Some visitors",
				"10": "Many visitors",
			},
		},
		{
			id: "friendliness",
			label: "How friendly do you want your dog to be?",
			helpText:
				"1-3: Reserved/independent | 4-6: Moderately friendly | 7-8: Very friendly | 9-10: Extremely friendly",
			icon: faSmile,
			type: "slider",
			field: "friendliness",
			scaleLabels: {
				"1": "Reserved/independent",
				"5": "Moderately friendly",
				"10": "Extremely friendly",
			},
		},
		// Energy & Activity Level
		{
			id: "energy_levels",
			label: "How active are you?",
			helpText:
				"1-3: Not very active | 4-6: Moderately active | 7-8: Very active | 9-10: Extremely active",
			icon: faRunning,
			type: "slider",
			field: "energy_levels",
			scaleLabels: {
				"1": "Not very active",
				"5": "Moderately active",
				"10": "Extremely active",
			},
		},
		{
			id: "playfulness",
			label: "Do you enjoy playing with dogs?",
			helpText:
				"1-3: Prefer calm | 4-6: Some playtime | 7-8: Love playing | 9-10: Very playful",
			icon: faRunning,
			type: "slider",
			field: "playfulness",
			scaleLabels: {
				"1": "Prefer calm activities",
				"5": "Some playtime",
				"10": "Very playful",
			},
		},
		// Training & Intelligence
		{
			id: "easy_to_train",
			label: "How much time can you dedicate to training?",
			helpText:
				"1-3: Limited time | 4-6: Some time | 7-8: Regular time | 9-10: Lots of time",
			icon: faGraduationCap,
			type: "slider",
			field: "easy_to_train",
			scaleLabels: {
				"1": "Limited time - Need easy to train",
				"5": "Some time",
				"10": "Lots of time - Can handle challenging",
			},
		},
		{
			id: "good_for_new_owners",
			label: "Is this your first dog?",
			helpText:
				"1-3: Experienced | 4-6: Some experience | 7-8: First-time owner | 9-10: Complete beginner",
			icon: faUsers,
			type: "slider",
			field: "good_for_new_owners",
			scaleLabels: {
				"1": "Experienced owner",
				"5": "Some experience",
				"10": "Complete beginner",
			},
		},
		// Grooming & Maintenance
		{
			id: "easy_to_groom",
			label: "How much time can you spend on grooming?",
			helpText:
				"1-3: Very little time | 4-6: Some time | 7-8: Regular time | 9-10: Lots of time",
			icon: faSprayCan,
			type: "slider",
			field: "easy_to_groom",
			scaleLabels: {
				"1": "Very little time - Need low-maintenance",
				"5": "Some time",
				"10": "Lots of time - Can handle extensive",
			},
		},
		{
			id: "shedding_amount",
			label: "How much shedding can you tolerate?",
			helpText:
				"Note: Lower numbers = less shedding. 1-3: Minimal | 4-6: Moderate | 7-8: Heavy | 9-10: Very heavy",
			icon: faLeaf,
			type: "slider",
			field: "shedding_amount",
			scaleLabels: {
				"1": "Minimal shedding",
				"5": "Moderate shedding",
				"10": "Very heavy shedding",
			},
			reverseScale: true,
		},
		// Behavior & Characteristics
		{
			id: "barks_howls",
			label: "How much barking can you tolerate?",
			helpText:
				"Note: Lower numbers = quieter dog. 1-3: Very quiet | 4-6: Some barking | 7-8: Moderate | 9-10: Don't mind",
			icon: faVolumeUp,
			type: "slider",
			field: "barks_howls",
			scaleLabels: {
				"1": "Very quiet - Need quiet dog",
				"5": "Some barking",
				"10": "Don't mind barking",
			},
			reverseScale: true,
		},
		{
			id: "guard_dog",
			label: "Do you want a guard dog or protective dog?",
			helpText:
				"1-3: No | 4-6: Some protection | 7-8: Yes | 9-10: Very important",
			icon: faShieldAlt,
			type: "slider",
			field: "guard_dog",
			scaleLabels: {
				"1": "No - Prefer friendly",
				"5": "Some protection",
				"10": "Very important - Need strong guard",
			},
		},
		// Health & Longevity
		{
			id: "health",
			label: "How important is good health to you?",
			helpText:
				"1-3: Not a priority | 4-6: Somewhat important | 7-8: Very important | 9-10: Extremely important",
			icon: faHeartbeat,
			type: "slider",
			field: "health",
			scaleLabels: {
				"1": "Not a priority",
				"5": "Somewhat important",
				"10": "Extremely important",
			},
		},
	];

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
								<span className="text-oxfordBlue/70 font-poppins text-sm">
									{Math.round(progress)}%
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
											<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
																		: "bg-gradient-to-r from-tara to-mintCream text-oxfordBlue border-oxfordBlue hover:bg-oxfordBlue hover:text-honeydew"
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

												{/* Scale Buttons */}
												<div className="grid grid-cols-5 md:grid-cols-10 gap-2">
													{[
														1, 2, 3, 4, 5, 6, 7, 8,
														9, 10,
													].map((num) => {
														const displayValue =
															getDisplayValue(
																currentQuestion
															) as number;
														const isSelected =
															displayValue ===
															num;
														return (
															<button
																key={num}
																type="button"
																onClick={() =>
																	handleAnswer(
																		currentQuestion,
																		num
																	)
																}
																className={`p-4 rounded-xl border-2 transition-all duration-300 font-poppins font-bold text-lg ${
																	isSelected
																		? "bg-gradient-to-r from-highland to-sark text-honeydew border-highland shadow-lg transform scale-110"
																		: "bg-gradient-to-r from-tara to-mintCream text-oxfordBlue border-oxfordBlue hover:bg-oxfordBlue hover:text-honeydew hover:scale-105"
																}`}
															>
																{num}
															</button>
														);
													})}
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
									<div className="flex justify-between items-center mt-8">
										<button
											onClick={handlePrevious}
											disabled={
												currentQuestionIndex === 0
											}
											className="px-6 py-3 rounded-full font-poppins font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-tara to-mintCream text-oxfordBlue border-2 border-oxfordBlue hover:bg-oxfordBlue hover:text-honeydew disabled:hover:bg-gradient-to-r disabled:hover:from-tara disabled:hover:to-mintCream disabled:hover:text-oxfordBlue"
										>
											Previous
										</button>

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

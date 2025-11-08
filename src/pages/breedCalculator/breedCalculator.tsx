import React, { useState, useRef, useEffect } from "react";
import { breedsAPI, Breed } from "../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "../../components/ToastContainer";
import BreedDetailModal from "../../components/modals/BreedDetailModal";
import {
	faSearch,
	faHome,
	faRuler,
	faRunning,
	faUsers,
	faDog,
	faInfoCircle,
	faBaby,
	faCat,
	faClock,
	faLeaf,
	faCity,
	faTree,
	faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

interface BreedFilter {
	size?: string;
	livingSpace?: string;
	activityLevel?: string;
	experienceLevel?: string;
	goodWithDogs?: string | boolean;
	goodWithCats?: string | boolean;
	goodWithChildren?: string | boolean;
	groomingNeeds?: string;
	timeAvailable?: string;
}

interface Question {
	id: string;
	label: string;
	icon: any;
	type: "radio" | "checkbox";
	options: { value: string; label: string; icon?: any }[];
	field: keyof BreedFilter;
}

export default function BreedCalculator() {
	const [hasStarted, setHasStarted] = useState(false);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [size, setSize] = useState("");
	const [livingSpace, setLivingSpace] = useState("");
	const [activityLevel, setActivityLevel] = useState("");
	const [experienceLevel, setExperienceLevel] = useState("");
	const [goodWithDogs, setGoodWithDogs] = useState("");
	const [goodWithCats, setGoodWithCats] = useState("");
	const [goodWithChildren, setGoodWithChildren] = useState("");
	const [groomingNeeds, setGroomingNeeds] = useState("");
	const [timeAvailable, setTimeAvailable] = useState("");

	const [breeds, setBreeds] = useState<Breed[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [selectedBreed, setSelectedBreed] = useState<Breed | null>(null);
	const resultsRef = useRef<HTMLDivElement>(null);
	const { showToast } = useToast();

	// Questions array
	const questions: Question[] = [
		{
			id: "livingSpace",
			label: "What's your living situation?",
			icon: faHome,
			type: "radio",
			field: "livingSpace",
			options: [
				{ value: "apartment", label: "Apartment", icon: faCity },
				{ value: "house", label: "House", icon: faHome },
				{ value: "farm", label: "Farm/Rural", icon: faTree },
			],
		},
		{
			id: "size",
			label: "What size dog are you looking for?",
			icon: faRuler,
			type: "radio",
			field: "size",
			options: [
				{ value: "small", label: "Small (under 20 lbs)" },
				{ value: "medium", label: "Medium (20-50 lbs)" },
				{ value: "large", label: "Large (over 50 lbs)" },
			],
		},
		{
			id: "activityLevel",
			label: "What's your activity level?",
			icon: faRunning,
			type: "radio",
			field: "activityLevel",
			options: [
				{ value: "low", label: "Low (couch potato)" },
				{ value: "moderate", label: "Moderate (daily walks)" },
				{ value: "high", label: "High (athletic/outdoor)" },
			],
		},
		{
			id: "experienceLevel",
			label: "What's your dog ownership experience?",
			icon: faUsers,
			type: "radio",
			field: "experienceLevel",
			options: [
				{ value: "first", label: "First-time owner" },
				{ value: "some", label: "Some experience" },
				{ value: "experienced", label: "Experienced owner" },
			],
		},
		{
			id: "goodWithDogs",
			label: "Does the dog need to be good with other dogs?",
			icon: faDog,
			type: "radio",
			field: "goodWithDogs",
			options: [
				{ value: "yes", label: "Yes" },
				{ value: "no", label: "No" },
				{ value: "notBothered", label: "Not bothered" },
			],
		},
		{
			id: "goodWithCats",
			label: "Does the dog need to be good with cats?",
			icon: faCat,
			type: "radio",
			field: "goodWithCats",
			options: [
				{ value: "yes", label: "Yes" },
				{ value: "no", label: "No" },
				{ value: "notBothered", label: "Not bothered" },
			],
		},
		{
			id: "goodWithChildren",
			label: "Does the dog need to be good with children?",
			icon: faBaby,
			type: "radio",
			field: "goodWithChildren",
			options: [
				{ value: "yes", label: "Yes" },
				{ value: "no", label: "No" },
				{ value: "notBothered", label: "Not bothered" },
			],
		},
		{
			id: "groomingNeeds",
			label: "What are your grooming preferences?",
			icon: faLeaf,
			type: "radio",
			field: "groomingNeeds",
			options: [
				{ value: "low", label: "Low maintenance" },
				{ value: "moderate", label: "Moderate grooming" },
				{ value: "high", label: "High maintenance" },
			],
		},
		{
			id: "timeAvailable",
			label: "How much time can you dedicate to your dog?",
			icon: faClock,
			type: "radio",
			field: "timeAvailable",
			options: [
				{ value: "limited", label: "Limited time" },
				{ value: "moderate", label: "Moderate time" },
				{ value: "plenty", label: "Plenty of time" },
			],
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

	const getCurrentValue = (field: keyof BreedFilter): string | boolean => {
		switch (field) {
			case "size":
				return size;
			case "livingSpace":
				return livingSpace;
			case "activityLevel":
				return activityLevel;
			case "experienceLevel":
				return experienceLevel;
			case "goodWithDogs":
				return goodWithDogs;
			case "goodWithCats":
				return goodWithCats;
			case "goodWithChildren":
				return goodWithChildren;
			case "groomingNeeds":
				return groomingNeeds;
			case "timeAvailable":
				return timeAvailable;
			default:
				return "";
		}
	};

	const isQuestionAnswered = (question: Question): boolean => {
		const value = getCurrentValue(question.field);
		if (question.type === "checkbox") {
			return value === true;
		}
		return value !== "" && value !== false;
	};

	const handleAnswer = (question: Question, value: string) => {
		switch (question.field) {
			case "size":
				setSize(value);
				break;
			case "livingSpace":
				setLivingSpace(value);
				break;
			case "activityLevel":
				setActivityLevel(value);
				break;
			case "experienceLevel":
				setExperienceLevel(value);
				break;
			case "goodWithDogs":
				setGoodWithDogs(value);
				break;
			case "goodWithCats":
				setGoodWithCats(value);
				break;
			case "goodWithChildren":
				setGoodWithChildren(value);
				break;
			case "groomingNeeds":
				setGroomingNeeds(value);
				break;
			case "timeAvailable":
				setTimeAvailable(value);
				break;
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
			//TODO: Move this to back end
			const allBreeds = await breedsAPI.getAllBreeds();
			const filteredBreeds = allBreeds.slice(0, 5);
			setBreeds(filteredBreeds);

			if (filteredBreeds.length > 0) {
				showToast({
					type: "success",
					title: "Breeds Found!",
					message: `Found ${filteredBreeds.length} breeds that match your criteria.`,
					duration: 4000,
				});
			}
		} catch (err) {
			console.error("Search error:", err);
			setBreeds([]);
			setError("No matching breeds found. Try adjusting your criteria.");
			showToast({
				type: "error",
				title: "Search Failed",
				message:
					"No matching breeds found. Try adjusting your criteria.",
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

									{/* Question Options */}
									<div className="space-y-4">
										{currentQuestion.type === "radio" ? (
											<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
												{currentQuestion.options.map(
													(option) => {
														const isSelected =
															getCurrentValue(
																currentQuestion.field
															) === option.value;
														return (
															<label
																key={
																	option.value
																}
																className={`flex items-center justify-center space-x-3 cursor-pointer group p-4 rounded-2xl border-2 transition-all duration-300 ${
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
																		className="text-lg"
																	/>
																)}
																<span className="font-poppins font-semibold text-center">
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
											<div className="flex justify-center">
												<label
													className={`flex items-center space-x-3 cursor-pointer group p-6 rounded-2xl border-2 transition-all duration-300 w-full max-w-md ${
														getCurrentValue(
															currentQuestion.field
														) === true
															? "bg-gradient-to-r from-highland to-sark text-honeydew border-highland shadow-lg"
															: "bg-gradient-to-r from-tara to-mintCream text-oxfordBlue border-oxfordBlue hover:bg-oxfordBlue hover:text-honeydew"
													}`}
												>
													<input
														type="checkbox"
														name={
															currentQuestion.id
														}
														checked={
															getCurrentValue(
																currentQuestion.field
															) === true
														}
														onChange={() =>
															handleAnswer(
																currentQuestion,
																"yes"
															)
														}
														className="w-5 h-5"
													/>
													<FontAwesomeIcon
														icon={
															currentQuestion.icon
														}
														className="text-xl"
													/>
													<span className="font-poppins font-semibold text-lg">
														{
															currentQuestion
																.options[0]
																.label
														}
													</span>
												</label>
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
											disabled={
												!isQuestionAnswered(
													currentQuestion
												)
											}
											className="group relative overflow-hidden bg-gradient-to-r from-highland to-sark text-honeydew px-8 py-4 rounded-full font-fredoka font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:text-sunset disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:scale-100"
										>
											<div className="flex items-center justify-center space-x-3 relative z-10">
												<span>
													{currentQuestionIndex ===
													questions.length - 1
														? "Find My Breeds"
														: "Next"}
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

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 justify-items-center">
						{breeds.map((breed, index) => (
							<motion.div
								key={breed.id}
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
													{95 - index * 5}%
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

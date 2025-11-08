import React, { useState, useRef, useEffect } from "react";
import { dogAPI, Dog } from "../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, AnimatePresence } from "framer-motion";
import {
	faSearch,
	faVenusMars,
	faHeart,
	faCat,
	faBaby,
	faDog,
	faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import AdoptionCard from "../../components/cards/adoptCard";

interface DogFilter {
	gender?: string;
	goodWithDogs?: string | boolean;
	goodWithCats?: string | boolean;
	goodWithChildren?: string | boolean;
}

interface Question {
	id: string;
	label: string;
	icon: any;
	type: "radio";
	options: { value: string; label: string; icon?: any }[];
	field: keyof DogFilter;
}

export default function Adoption() {
	const [hasStarted, setHasStarted] = useState(false);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [gender, setGender] = useState("");
	const [goodWithDogs, setGoodWithDogs] = useState("");
	const [goodWithCats, setGoodWithCats] = useState("");
	const [goodWithChildren, setGoodWithChildren] = useState("");
	const [dog, setDog] = useState<Dog | null>(null);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const resultsRef = useRef<HTMLDivElement>(null);

	// Questions array
	const questions: Question[] = [
		{
			id: "gender",
			label: "What gender are you looking for?",
			icon: faVenusMars,
			type: "radio",
			field: "gender",
			options: [
				{ value: "Male", label: "Male" },
				{ value: "Female", label: "Female" },
				{ value: "notBothered", label: "Not bothered" },
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
	];

	// Auto-scroll to results when dog is found
	useEffect(() => {
		if (dog && resultsRef.current) {
			resultsRef.current.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		}
	}, [dog]);

	const getCurrentValue = (field: keyof DogFilter): string => {
		switch (field) {
			case "gender":
				return gender;
			case "goodWithDogs":
				return goodWithDogs;
			case "goodWithCats":
				return goodWithCats;
			case "goodWithChildren":
				return goodWithChildren;
			default:
				return "";
		}
	};

	const isQuestionAnswered = (question: Question): boolean => {
		const value = getCurrentValue(question.field);
		return value !== "";
	};

	const handleAnswer = (question: Question, value: string) => {
		switch (question.field) {
			case "gender":
				setGender(value === "notBothered" ? "" : value);
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
			const filters = {
				gender: gender || undefined,
				goodWithDogs:
					goodWithDogs === "yes"
						? true
						: goodWithDogs === "no"
						? false
						: undefined,
				goodWithCats:
					goodWithCats === "yes"
						? true
						: goodWithCats === "no"
						? false
						: undefined,
				goodWithChildren:
					goodWithChildren === "yes"
						? true
						: goodWithChildren === "no"
						? false
						: undefined,
			};
			const matchedDog = await dogAPI.filterDogs(filters);

			if (!matchedDog) {
				throw new Error("No dog returned from API");
			}

			setDog(matchedDog);
		} catch (err) {
			console.error("Search error:", err);
			setDog(null);
			setError(
				"No matching dog found. Try adjusting your search criteria."
			);
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
							moments!
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
				{hasStarted && !loading && !dog && (
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
										<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
											{currentQuestion.options.map(
												(option) => {
													const isSelected =
														getCurrentValue(
															currentQuestion.field
														) === option.value ||
														(currentQuestion.field ===
															"gender" &&
															option.value ===
																"notBothered" &&
															getCurrentValue(
																currentQuestion.field
															) === "");
													return (
														<label
															key={option.value}
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
																{option.label}
															</span>
														</label>
													);
												}
											)}
										</div>
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
														? "Find My Dog"
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
							Finding your perfect dog...
						</p>
					</motion.div>
				)}

				{/* Results Section */}
				{dog && (
					<motion.div
						ref={resultsRef}
						className="max-w-4xl mx-auto py-10"
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
								Your Chosen One!
							</h2>
							<p className="text-lg text-highland font-fredoka max-w-2xl mx-auto">
								We found your perfect dog.
							</p>
						</motion.div>

						{/* Dog Card */}
						<motion.div
							className="flex justify-center"
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.6, delay: 0.4 }}
						>
							<AdoptionCard dog={dog} />
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
									setGender("");
									setGoodWithDogs("");
									setGoodWithCats("");
									setGoodWithChildren("");
									setError("");
									setDog(null);
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

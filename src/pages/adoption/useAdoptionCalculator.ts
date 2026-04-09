import { useState, useRef, useEffect, useCallback } from "react";
import { dogAPI, Dog, breedsAPI } from "../../services/api";
import { useToast } from "../../components/ToastContainer";
import type { BreedSearchOption } from "../../components/forms/BreedSearchSelect";
import { questions, Question } from "./adoptionCalculatorQuestions";

const initialAnswers: Record<string, unknown> = {
	size: "",
	gender: "",
	age_min: null,
	age_max: null,
	good_with_dogs: undefined,
	good_with_cats: undefined,
	good_with_children: undefined,
	breed: "",
	is_crossbreed: undefined,
};

export function useAdoptionCalculator() {
	const [hasStarted, setHasStarted] = useState(false);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [answers, setAnswers] =
		useState<Record<string, unknown>>(initialAnswers);
	const [dogs, setDogs] = useState<Dog[]>([]);
	const [matchRates, setMatchRates] = useState<Record<string, number>>({});
	const [currentDogIndex, setCurrentDogIndex] = useState(0);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [breedOptions, setBreedOptions] = useState<BreedSearchOption[]>([]);
	const resultsRef = useRef<HTMLDivElement>(null);
	const { showToast } = useToast();

	useEffect(() => {
		breedsAPI
			.getAllBreeds()
			.then((breeds) => {
				const options = breeds
					.map((b) => ({
						value: b.breed,
						label: b.breed,
						group: b.group?.trim() || "Other",
					}))
					.sort((a, b) => {
						const byGroup = a.group.localeCompare(b.group);
						if (byGroup !== 0) return byGroup;
						return a.label.localeCompare(b.label);
					});
				setBreedOptions(options);
			})
			.catch((err) => {
				console.error("Failed to fetch breeds:", err);
			});
	}, []);

	useEffect(() => {
		if (dogs.length > 0 && resultsRef.current) {
			resultsRef.current.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		}
	}, [dogs]);

	const getCurrentValue = useCallback(
		(field: string): unknown => answers[field],
		[answers]
	);

	const isQuestionAnswered = useCallback(
		(question: Question): boolean => {
			const value = getCurrentValue(question.field);
			if (question.type === "text") {
				return true;
			}
			if (question.type === "boolean") {
				return value !== undefined;
			}
			if (question.type === "select") {
				if (question.field === "is_crossbreed") {
					return value !== undefined;
				}
				if (question.field === "breed") {
					return true;
				}
				return value !== "" && value !== undefined;
			}
			return false;
		},
		[getCurrentValue]
	);

	const handleAnswer = useCallback((question: Question, value: unknown) => {
		if (question.type === "select" && question.field2) {
			const option = question.options?.find((opt) => opt.value === value);
			if (option && question.field === "age_min") {
				setAnswers((prev) => ({
					...prev,
					age_min: option.age_min ?? undefined,
					age_max: option.age_max ?? undefined,
				}));
			}
		} else if (value === "") {
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

		// Auto-advance only for option-style questions (not sliders).
		if (question.type !== "slider") {
			setCurrentQuestionIndex((index) =>
				index < questions.length - 1 ? index + 1 : index
			);
		}
	}, []);

	const handleSubmit = useCallback(async () => {
		setLoading(true);
		setError("");

		try {
			const preferences: Record<string, unknown> = {
				size: answers.size ?? null,
				gender: answers.gender || null,
				age_min: answers.age_min ?? null,
				age_max: answers.age_max ?? null,
				breed: answers.breed || null,
				good_with_dogs: answers.good_with_dogs ?? false,
				good_with_cats: answers.good_with_cats ?? false,
				good_with_children: answers.good_with_children ?? false,
				is_crossbreed: answers.is_crossbreed === false ? false : true,
			};

			const response = await dogAPI.matchDogs(
				preferences as Parameters<typeof dogAPI.matchDogs>[0]
			);

			if (!response || !response.matches) {
				throw new Error("Invalid response from server");
			}

			const matchedDogs = response.matches.map((match) => match.dog);
			const rates: Record<string, number> = {};
			response.matches.forEach((match) => {
				rates[match.dog.id] = match.match_rate;
			});

			setDogs(matchedDogs);
			setMatchRates(rates);
			setCurrentDogIndex(0);

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
		} catch (err: unknown) {
			console.error("Search error:", err);
			setDogs([]);
			setMatchRates({});
			const axiosErr = err as {
				response?: { data?: { error?: string } };
				message?: string;
			};
			const errorMessage =
				axiosErr.response?.data?.error ||
				axiosErr.message ||
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
	}, [answers, showToast]);

	const handleNext = useCallback(() => {
		if (currentQuestionIndex < questions.length - 1) {
			setCurrentQuestionIndex((i) => i + 1);
		} else {
			void handleSubmit();
		}
	}, [currentQuestionIndex, handleSubmit]);

	const handlePrevious = useCallback(() => {
		setCurrentQuestionIndex((i) => (i > 0 ? i - 1 : i));
	}, []);

	const resetFlow = useCallback(() => {
		setHasStarted(false);
		setCurrentQuestionIndex(0);
		setAnswers({ ...initialAnswers });
		setError("");
		setDogs([]);
		setMatchRates({});
		setCurrentDogIndex(0);
	}, []);

	const dismissMatch = useCallback(() => {
		if (currentDogIndex < dogs.length - 1) {
			setCurrentDogIndex((i) => i + 1);
		} else {
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
	}, [currentDogIndex, dogs.length, showToast]);

	const currentQuestion = questions[currentQuestionIndex];
	const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

	return {
		hasStarted,
		setHasStarted,
		currentQuestionIndex,
		answers,
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
		handleSubmit,
		resetFlow,
		dismissMatch,
		currentQuestion,
		progress,
	};
}

export type AdoptionCalculatorModel = ReturnType<
	typeof useAdoptionCalculator
>;

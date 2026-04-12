import { useState, useRef, useEffect, useCallback } from "react";
import { dogAPI, Dog, breedsAPI } from "../../services/api";
import {
	isNetworkOrTransportFailure,
	resolveApiErrorMessage,
} from "../../helpers/apiErrorMessage";
import type { BreedSearchOption } from "../../components/forms/BreedSearchSelect";
import { questions, Question } from "./adoptionCalculatorQuestions";

export type AdoptionMatchFlowError =
	| null
	| { mode: "network" }
	| { mode: "criteria"; message: string };

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
	const [matchFlowError, setMatchFlowError] =
		useState<AdoptionMatchFlowError>(null);
	const [loading, setLoading] = useState(false);
	const [breedOptions, setBreedOptions] = useState<BreedSearchOption[]>([]);
	const resultsRef = useRef<HTMLDivElement>(null);

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

	useEffect(() => {
		if (matchFlowError != null && resultsRef.current) {
			resultsRef.current.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		}
	}, [matchFlowError]);

	const getCurrentValue = useCallback(
		(field: string): unknown => answers[field],
		[answers],
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
		[getCurrentValue],
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

		// Auto-advance after discrete answers only (text uses Next).
		if (question.type === "select" || question.type === "boolean") {
			setCurrentQuestionIndex((index) =>
				index < questions.length - 1 ? index + 1 : index,
			);
		}
	}, []);

	const handleSubmit = useCallback(async () => {
		setLoading(true);
		setMatchFlowError(null);

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
				preferences as Parameters<typeof dogAPI.matchDogs>[0],
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

			if (matchedDogs.length === 0) {
				setMatchFlowError({
					mode: "criteria",
					message:
						"No dogs found with a match rate greater than 0%. Try adjusting your preferences to be less specific.",
				});
			}
		} catch (err: unknown) {
			console.error("Search error:", err);
			setDogs([]);
			setMatchRates({});
			if (isNetworkOrTransportFailure(err)) {
				setMatchFlowError({ mode: "network" });
			} else {
				const errorMessage = resolveApiErrorMessage(
					err,
					"No matching dogs found. Try adjusting your search criteria.",
				);
				setMatchFlowError({ mode: "criteria", message: errorMessage });
			}
		} finally {
			setLoading(false);
		}
	}, [answers]);

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
		setMatchFlowError(null);
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
			setMatchFlowError({
				mode: "criteria",
				message: "No more matches available.",
			});
		}
	}, [currentDogIndex, dogs.length]);

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
		matchFlowError,
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

export type AdoptionCalculatorModel = ReturnType<typeof useAdoptionCalculator>;

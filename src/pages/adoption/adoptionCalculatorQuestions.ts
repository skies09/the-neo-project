import {
	faVenusMars,
	faBaby,
	faDog,
	faRuler,
	faCalendarAlt,
	faDna,
	faCat,
} from "@fortawesome/free-solid-svg-icons";

export interface Question {
	id: string;
	label: string;
	helpText?: string;
	icon: any;
	type: "select" | "boolean" | "text";
	options?: {
		value: string | boolean | null;
		label: string;
		age_min?: number | null;
		age_max?: number | null;
		weight_min?: number | null;
		weight_max?: number | null;
		icon?: any;
	}[];
	field: string;
	field2?: string; // For age/weight ranges
	placeholder?: string;
}

export const questions: Question[] = [
	// Section 1: Basic Preferences
	{
		id: "size",
		label: "What size dog would best fit your living situation and lifestyle?",
		icon: faRuler,
		type: "select",
		field: "size",
		options: [
			{
				value: "XS",
				label: "XS - Extra Small (Under 10 kg)",
			},
			{ value: "S", label: "S - Small (10-15 kg)" },
			{ value: "M", label: "M - Medium (15-25 kg)" },
			{ value: "L", label: "L - Large (25-40 kg)" },
			{
				value: "XL",
				label: "XL - Extra Large (Over 40 kg)",
			},
		],
	},
	{
		id: "gender",
		label: "Do you have a preference for a male or female dog?",
		helpText: "",
		icon: faVenusMars,
		type: "select",
		field: "gender",
		options: [
			{ value: "Male", label: "Male" },
			{ value: "Female", label: "Female" },
			{ value: "", label: "No preference" },
		],
	},
	// Section 2: Age
	{
		id: "age_range",
		label: "What age range are you interested in?",
		helpText: "",
		icon: faCalendarAlt,
		type: "select",
		field: "age_min",
		field2: "age_max",
		options: [
			{
				value: "puppy",
				label: "Puppy (0-1 years)",
				age_min: 0,
				age_max: 1,
			},
			{
				value: "young",
				label: "Young (1-3 years)",
				age_min: 1,
				age_max: 3,
			},
			{
				value: "adult",
				label: "Adult (3-7 years)",
				age_min: 3,
				age_max: 7,
			},
			{
				value: "senior",
				label: "Senior (7+ years)",
				age_min: 7,
				age_max: 30,
			},
			{
				value: "any",
				label: "Any age",
				age_min: null,
				age_max: null,
			},
		],
	},
	// Section 3: Compatibility
	{
		id: "good_with_dogs",
		label: "Do you have other dogs? Do you need a dog that gets along with other dogs?",
		icon: faDog,
		type: "boolean",
		field: "good_with_dogs",
		options: [
			{ value: true, label: "Yes" },
			{ value: false, label: "No" },
		],
	},
	{
		id: "good_with_cats",
		label: "Do you have cats? Do you need a dog that gets along with cats?",
		icon: faCat,
		type: "boolean",
		field: "good_with_cats",
		options: [
			{ value: true, label: "Yes" },
			{ value: false, label: "No" },
		],
	},
	{
		id: "good_with_children",
		label: "Will the dog be around children? Do you need a dog that's good with children?",
		icon: faBaby,
		type: "boolean",
		field: "good_with_children",
		options: [
			{
				value: true,
				label: "Yes",
			},
			{ value: false, label: "No" },
		],
	},
	// Section 4: Breed Preferences
	{
		id: "breed",
		label: "Do you have a specific breed in mind?",
		helpText: "Select a breed from the list, or choose “No preference” to see all dogs.",
		icon: faDog,
		type: "select",
		field: "breed",
		options: [
			{ value: "", label: "No preference" },
		],
	},
	{
		id: "is_crossbreed",
		label: "Are you open to crossbreeds (mixed breeds), or do you prefer purebred dogs?",
		icon: faDna,
		type: "select",
		field: "is_crossbreed",
		options: [
			{ value: null, label: "Yes, open to crossbreeds" },
			{ value: false, label: "Prefer purebred only" },
			{ value: true, label: "Prefer crossbreeds only" },
		],
	},
];











import {
	faRuler,
	faRunning,
	faUsers,
	faDog,
	faBaby,
	faClock,
	faLeaf,
	faCity,
	faShieldAlt,
	faVolumeUp,
	faGraduationCap,
	faSmile,
	faSprayCan,
} from "@fortawesome/free-solid-svg-icons";

export interface Question {
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

export const questions: Question[] = [
	// Basic Information
	{
		id: "size",
		label: "What size dog would be preferable for you?",
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
		helpText: "",
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
		helpText: "",
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
		label: "How busy is your lifestyle?",
		helpText: "",
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
		helpText: "",
		icon: faUsers,
		type: "select",
		field: "family_friendly",
		options: [
			{ value: "1", label: "Live alone", apiValue: 1 },
			{
				value: "5",
				label: "Live with partner/roommate",
				apiValue: 5,
			},
			{ value: "10", label: "Large family", apiValue: 10 },
		],
		mapping: {
			"1": 1,
			"5": 5,
			"10": 10,
		},
	},
	{
		id: "child_friendly",
		label: "Do you have children or will the dog be around children?",
		helpText: "",
		icon: faBaby,
		type: "select",
		field: "child_friendly",
		options: [
			{ value: "1", label: "No children", apiValue: 1 },
			{ value: "5", label: "Occasional contact", apiValue: 5 },
			{ value: "10", label: "Children in household", apiValue: 10 },
		],
		mapping: {
			"1": 1,
			"5": 5,
			"10": 10,
		},
	},
	{
		id: "pet_friendly",
		label: "Do you have other pets?",
		helpText: "",
		icon: faDog,
		type: "select",
		field: "pet_friendly",
		options: [
			{ value: "1", label: "No other pets", apiValue: 1 },
			{ value: "4", label: "Have one pet", apiValue: 4 },
			{ value: "6", label: "Have two pets", apiValue: 6 },
			{ value: "10", label: "Many 3+ pets", apiValue: 10 },
		],
		mapping: {
			"1": 1,
			"5": 5,
			"10": 10,
		},
	},
	{
		id: "stranger_friendly",
		label: "Do you have many visitors or want a welcoming dog?",
		helpText: "",
		icon: faSmile,
		type: "select",
		field: "stranger_friendly",
		options: [
			{ value: "1", label: "Few visitors", apiValue: 1 },
			{ value: "5", label: "Some visitors", apiValue: 5 },
			{ value: "10", label: "Many visitors", apiValue: 10 },
		],
		mapping: {
			"1": 1,
			"5": 5,
			"10": 10,
		},
	},
	{
		id: "friendliness",
		label: "How friendly do you want your dog to be?",
		helpText: "",
		icon: faSmile,
		type: "slider",
		field: "friendliness",
		scaleLabels: {
			"1": "Prefer independent",
			"5": "Moderately friendly",
			"10": "Extremely friendly",
		},
	},
	// Energy & Activity Level
	{
		id: "energy_levels",
		label: "How active are you?",
		helpText: "",
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
		helpText: "",
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
		helpText: "",
		icon: faGraduationCap,
		type: "slider",
		field: "easy_to_train",
		scaleLabels: {
			"1": "Limited time",
			"5": "Some time",
			"10": "Lots of time",
		},
	},
	{
		id: "good_for_new_owners",
		label: "Have you had a dog before?",
		helpText: "",
		icon: faUsers,
		type: "select",
		field: "good_for_new_owners",
		options: [
			{ value: "1", label: "Experienced owner", apiValue: 1 },
			{ value: "5", label: "Some experience", apiValue: 5 },
			{ value: "10", label: "Complete beginner", apiValue: 10 },
		],
		mapping: {
			"1": 1,
			"5": 5,
			"10": 10,
		},
	},
	// Grooming & Maintenance
	{
		id: "easy_to_groom",
		label: "How much time can you spend on grooming?",
		helpText: "",
		icon: faSprayCan,
		type: "slider",
		field: "easy_to_groom",
		scaleLabels: {
			"1": "Very little time",
			"5": "Some time",
			"10": "Lots of time",
		},
	},
	{
		id: "shedding_amount",
		label: "How much shedding can you tolerate?",
		helpText: "",
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
		helpText: "",
		icon: faVolumeUp,
		type: "slider",
		field: "barks_howls",
		scaleLabels: {
			"1": "Very quiet",
			"5": "Some barking",
			"10": "Don't mind barking",
		},
		reverseScale: true,
	},
	{
		id: "guard_dog",
		label: "Do you want a guard dog or protective dog?",
		helpText: "",
		icon: faShieldAlt,
		type: "slider",
		field: "guard_dog",
		scaleLabels: {
			"1": "Prefer friendly",
			"5": "Some protection",
			"10": "Very important",
		},
	},
	// Health & Longevity
	// {
	// 	id: "health",
	// 	label: "How important is good health to you?",
	// 	helpText: "",
	// 	icon: faHeartbeat,
	// 	type: "slider",
	// 	field: "health",
	// 	scaleLabels: {
	// 		"1": "Not a priority",
	// 		"5": "Somewhat important",
	// 		"10": "Extremely important",
	// 	},
	// },
];


import axiosService from "../helpers/axios";

// Types
export interface Dog {
	id: string;
	public_id: string;
	name: string;
	gender: string;
	age: number;
	size: string;
	weight: number;
	good_with_dogs: boolean | null;
	good_with_cats: boolean | null;
	good_with_children: boolean | null;
	breed: string;
	is_crossbreed: boolean | null;
	extra_information?: string;
	image?: string;
	kennel: {
		id: string;
		public_id: string;
		username: string;
		name: string;
		email: string;
	};
	created: string;
	updated: string;
}

export interface Kennel {
	id: string;
	public_id: string;
	username: string;
	name: string;
	email: string;
	address_line_1?: string;
	town?: string;
	city?: string;
	postcode?: string;
	contact_number?: string;
	is_active: boolean;
	reset_password: boolean;
	created: string;
	updated: string;
}

export interface Breed {
	id?: string;
	breed: string;
	group: string;
	size: string | null;
	lifespan?: string | null;
	height?: string | null;
	weight?: string | null;
	friendliness?: string | null;
	family_friendly?: string | null;
	child_friendly?: string | null;
	pet_friendly?: string | null;
	stranger_friendly?: string | null;
	easy_to_groom?: string | null;
	energy_levels?: string | null;
	health?: string | null;
	shedding_amount?: string | null;
	barks_howls?: string | null;
	easy_to_train?: string | null;
	guard_dog?: string | null;
	playfulness?: string | null;
	apartment_dog?: string | null;
	can_be_alone?: string | null;
	good_for_busy_owners?: string | null;
	good_for_new_owners?: string | null;
	health_concerns?: string | null;
	short_description?: string | null;
	long_description?: string | null;
	portrait_image?: string | null;
	landscape_image?: string | null;
}

export interface DogFilter {
	gender?: string;
	goodWithDogs?: boolean;
	goodWithCats?: boolean;
	goodWithChildren?: boolean;
}

// Kennel API
export const kennelAPI = {
	// Get kennel profile
	getProfile: (kennelPublicId: string): Promise<Kennel> => {
		return axiosService.get(`/api/kennels/${kennelPublicId}/`);
	},

	// Update kennel profile
	updateProfile: (
		kennelPublicId: string,
		data: Partial<Kennel>
	): Promise<Kennel> => {
		return axiosService.patch(`/api/kennels/${kennelPublicId}/`, data);
	},

	// Change kennel password
	changePassword: (data: {
		old_password: string;
		new_password: string;
		confirm_password: string;
	}): Promise<any> => {
		return axiosService.post(`/api/kennels/change-password/`, data);
	},
};

// Dog API
export const dogAPI = {
	// Get all dogs (public)
	getAllDogs: (): Promise<Dog[]> => {
		return axiosService
			.get(`/api/dogs/`)
			.then((response) => response.data.results);
	},

	// Get up to three dogs of the day (public)
	getDogOfTheDay: (): Promise<Dog[]> => {
		return axiosService.get(`/api/dogs/dog-of-the-day/`).then((response) => {
			// Endpoint may return an array or a paginated object
			return response.data.results || response.data;
		});
	},

	// Filter dogs to find a match
	filterDogs: (filters: DogFilter): Promise<Dog> => {
		return axiosService
			.post(`/api/dogs/filter/`, filters)
			.then((response) => {
				return response.data;
			});
	},

	// Match dogs based on preferences (returns up to 20 dogs with match rates)
	matchDogs: (preferences: {
		size?: string;
		gender?: string;
		age_min?: number;
		age_max?: number;
		good_with_dogs?: boolean;
		good_with_cats?: boolean;
		good_with_children?: boolean;
		breed?: string;
		is_crossbreed?: boolean;
	}): Promise<{
		matches: Array<{ dog: Dog; match_rate: number }>;
		total_dogs_compared: number;
		preferences_used: Record<string, any>;
	}> => {
		return axiosService.post(`/api/dogs/match/`, preferences).then((response) => response.data);
	},

	// Get kennel's own dogs
	getMyDogs: (): Promise<Dog[]> => {
		return axiosService.get(`/api/kennel-dogs/`).then((response) => {
			// Handle both paginated and non-paginated responses
			return response.data.results || response.data;
		});
	},

	// Create new dog
	createDog: (dogData: Partial<Dog>): Promise<Dog> => {
		return axiosService.post(`/api/kennel-dogs/`, dogData);
	},

	// Get specific dog
	getDog: (dogId: string): Promise<Dog> => {
		return axiosService.get(`/api/kennel-dogs/${dogId}/`);
	},

	// Update dog
	updateDog: (dogId: string, dogData: Partial<Dog>): Promise<Dog> => {
		return axiosService.patch(`/api/kennel-dogs/${dogId}/`, dogData);
	},

	// Delete dog
	deleteDog: (dogId: string): Promise<void> => {
		return axiosService.delete(`/api/kennel-dogs/${dogId}/`);
	},

	// NEW: Kennel-dogs API endpoints
	// List dogs for kennel
	getKennelDogs: (kennelId: string): Promise<Dog[]> => {
		return axiosService
			.get(`/api/kennels/${kennelId}/dogs/`)
			.then((response) => {
				// Handle both paginated and non-paginated responses
				return response.data.results || response.data;
			});
	},

	// Create dog for kennel
	createKennelDog: (
		kennelId: string,
		dogData: Partial<Dog>
	): Promise<Dog> => {
		return axiosService.post(`/api/kennels/${kennelId}/dogs/`, dogData);
	},

	// Get specific dog for kennel
	getKennelDog: (kennelId: string, dogId: string): Promise<Dog> => {
		return axiosService.get(`/api/kennels/${kennelId}/dogs/${dogId}/`);
	},

	// Update dog for kennel
	updateKennelDog: (
		kennelId: string,
		dogId: string,
		dogData: Partial<Dog>
	): Promise<Dog> => {
		return axiosService.put(
			`/api/kennels/${kennelId}/dogs/${dogId}/`,
			dogData
		);
	},

	// Partially update dog for kennel
	patchKennelDog: (
		kennelId: string,
		dogId: string,
		dogData: Partial<Dog>
	): Promise<Dog> => {
		return axiosService.patch(
			`/api/kennels/${kennelId}/dogs/${dogId}/`,
			dogData
		);
	},

	// Delete dog for kennel
	deleteKennelDog: (kennelId: string, dogId: string): Promise<void> => {
		return axiosService.delete(`/api/kennels/${kennelId}/dogs/${dogId}/`);
	},
};

// Breeds API
export const breedsAPI = {
	// Get all breeds
	getAllBreeds: (): Promise<Breed[]> => {
		return axiosService.get(`/api/breeds/`).then((response) => {
			return response.data;
		});
	},

	// Get breed groups
	getBreedGroups: (): Promise<string[]> => {
		return axiosService.get(`/api/breeds/groups/`).then((response) => {
			return response.data;
		});
	},

	// Get breeds by group
	getBreedsByGroup: (group: string): Promise<Breed[]> => {
		return axiosService
			.get(`/api/breeds/groups/${group}/`)
			.then((response) => {
				return response.data;
			});
	},

	// Get breed details
	getBreedDetails: (breedName: string): Promise<Breed> => {
		return axiosService.post(`/api/breeds/detail/`, { breed: breedName });
	},

	// Match breeds based on preferences
	matchBreeds: (preferences: {
		size?: string;
		pet_friendly?: number;
		apartment_dog?: number;
		easy_to_groom?: number;
		family_friendly?: number;
		child_friendly?: number;
		energy_levels?: number;
		easy_to_train?: number;
		can_be_alone?: number;
		good_for_busy_owners?: number;
		good_for_new_owners?: number;
		shedding_amount?: number;
		barks_howls?: number;
		playfulness?: number;
		friendliness?: number;
		stranger_friendly?: number;
		guard_dog?: number;
		health?: number;
	}): Promise<{
		matches: Array<{ breed: Breed; match_rate: number }>;
		total_breeds_compared: number;
		preferences_used: Record<string, any>;
	}> => {
		return axiosService.post(`/api/breeds/match/`, preferences).then((response) => response.data);
	},
};

// Auth API
export const authAPI = {
	// Login
	login: (credentials: { username: string; password: string }) => {
		return axiosService.post(`/api/auth/login/`, credentials);
	},

	// Logout
	logout: (refreshToken: string) => {
		return axiosService.post(`/api/auth/logout/`, {
			refresh: refreshToken,
		});
	},

	// Refresh token
	refreshToken: (refreshToken: string) => {
		return axiosService.post(`/api/auth/refresh/`, {
			refresh: refreshToken,
		});
	},

	// First time password reset
	resetPassword: (data: {
		new_password: string;
		confirm_password: string;
	}) => {
		return axiosService.post(`/api/auth/first-time-password-reset/`, data);
	},

	// Change password
	changePassword: (data: {
		old_password: string;
		new_password: string;
		confirm_password: string;
	}) => {
		return axiosService.post(`/api/auth/change-password/`, data);
	},
};

export default {
	kennel: kennelAPI,
	dog: dogAPI,
	breeds: breedsAPI,
	auth: authAPI,
};

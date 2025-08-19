import axiosService from "../helpers/axios.tsx";

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
	id: string;
	breed: string;
	group: string;
	size: string;
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
};

// Dog API
export const dogAPI = {
	// Get all dogs (public)
	getAllDogs: (): Promise<Dog[]> => {
		return axiosService
			.get(`/api/dogs/`)
			.then((response) => response.data.results);
	},

	// Filter dogs to find a match
	filterDogs: (filters: DogFilter): Promise<Dog> => {
		return axiosService.post(`/api/dogs/filter/`, filters).then((response) => {
			console.log("Filter API Response:", response);
			return response.data;
		});
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
};

// Breeds API
export const breedsAPI = {
	// Get all breeds
	getAllBreeds: (): Promise<Breed[]> => {
		return axiosService.get(`/api/breeds/list_all/`).then((response) => {
			console.log("API Response for getAllBreeds:", response);
			return response.data;
		});
	},

	// Get breed groups
	getBreedGroups: (): Promise<string[]> => {
		return axiosService.get(`/api/breeds/groups/`).then((response) => {
			console.log("API Response for getBreedGroups:", response);
			return response.data;
		});
	},

	// Get breeds by group
	getBreedsByGroup: (group: string): Promise<Breed[]> => {
		return axiosService
			.get(`/api/breeds/groups/${group}/`)
			.then((response) => {
				console.log("API Response for getBreedsByGroup:", response);
				return response.data;
			});
	},

	// Get breed details
	getBreedDetails: (breedName: string): Promise<Breed> => {
		return axiosService.post(`/api/breeds/detail/`, { breed: breedName });
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

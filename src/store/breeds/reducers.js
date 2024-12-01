const initialState = {
	selectedGroup: null,
	selectedBreed: null,
};

const breedReducer = (state = initialState, action) => {
	switch (action.type) {
		case "SET_SELECTED_GROUP":
			return {
				...state,
				selectedGroup: action.payload,
			};
		case "SET_SELECTED_BREED":
			return {
				...state,
				selectedBreed: action.payload,
			};
		default:
			return state;
	}
};

export default breedReducer;

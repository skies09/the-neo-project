const initialState = {
	kennel: null,
};

const kennelReducer = (state = initialState, action) => {
	switch (action.type) {
		case "SET_KENNEL":
			return {
				...state,
				kennel: action.payload,
			};

		default:
			return state;
	}
};

export default kennelReducer;

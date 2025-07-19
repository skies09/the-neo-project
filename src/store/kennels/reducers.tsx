interface KennelState {
	kennel: string | number | null;
}

interface KennelAction {
	type: string;
	payload: string | number;
}

const initialState: KennelState = {
	kennel: null,
};

const kennelReducer = (
	state = initialState,
	action: KennelAction
): KennelState => {
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

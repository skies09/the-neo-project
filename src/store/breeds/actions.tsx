// BREED ACTIONS

export const setSelectedGroup = (selectedGroup: string) => ({
	type: "SET_SELECTED_GROUP",
	payload: selectedGroup,
});

export const setSelectedBreed = (selectedBreed: string) => ({
	type: "SET_SELECTED_BREED",
	payload: selectedBreed,
});

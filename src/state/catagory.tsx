import type { catactions, catagorylist, catDetail } from "../types/TaskTypes";

export const catInitialState: catagorylist = [
	{ catName: "All Tasks", id: "all" },
	{ catName: "Default", id: "1234567890" },
];

export const saveCatToLocalStorage = (
	catState: catagorylist = catInitialState
): boolean => {
	try {
		localStorage.setItem("cat", JSON.stringify(catState));
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
};

export const getCatFromLocal = (): catagorylist => {
	try {
		let catState = localStorage.getItem("cat");
		if (catState !== null) {
			return JSON.parse(catState);
		} else {
			return catInitialState;
		}
	} catch (error) {
		console.error(error);
		return catInitialState;
	}
};

const catagoryReducer = (
	state: catagorylist = catInitialState,
	actions: catactions
) => {
	switch (actions.type) {
		case "create_cat":
			return [...state, { ...actions.payload }];
		case "edit_cat":
			return state.map((cat) => {
				if (cat.id === actions.payload.id) {
					return { ...cat, ...actions.payload };
				} else {
					return cat;
				}
			});
		case "delete_cat":
			return state.filter((cat) => {
				return cat.id !== actions.payload;
			});
	}
};

export default catagoryReducer;

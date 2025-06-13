import { useEffect, useReducer } from "react";
import taskReducer, { initialState } from "../state/state";
import type { state } from "../types/TaskTypes";

export const saveToLocalStorage = (state: state): boolean => {
	try {
		localStorage.setItem("state", JSON.stringify(state));
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
};

export const getFromLocalStorage = (): state => {
	try {
		let state = localStorage.getItem("state");
		if (state !== null) {
			return JSON.parse(state);
		} else {
			return initialState;
		}
	} catch (error) {
		console.log(error);
		return initialState;
	}
};

const useReducerHook = () => {
	const [state, dispatch] = useReducer(taskReducer, initialState, () => {
		return getFromLocalStorage();
	});

	return { state: state, dispatch: dispatch };
};

export default useReducerHook;

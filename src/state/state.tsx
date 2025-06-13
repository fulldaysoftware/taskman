import type { actions, state } from "../types/TaskTypes";

export const initialState: state = [];

const taskReducer = (state: state, action: actions): state => {
	switch (action.type) {
		case "complete_task":
			return state.map((tsk) => {
				if (tsk.id === action.payload) {
					return { ...tsk, isDone: true };
				} else {
					return tsk;
				}
			});
		case "create_task":
			return [...state, action.payload];
		case "delete_task":
			return state.filter((tsk) => tsk.id !== action.payload);
		case "edit_task":
			return state.map((tsk) => {
				if (tsk.id === action.payload.id) {
					return { ...tsk, ...action.payload };
				} else {
					return tsk;
				}
			});
		default:
			return state;
	}
};

export default taskReducer;

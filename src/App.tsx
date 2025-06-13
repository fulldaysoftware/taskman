import { useEffect, useReducer } from "react";
import Header from "./Components/Header";
import TaskCreate from "./Components/TaskCreate";
import taskReducer, { initialState } from "./state/state";
import TaskContext from "./state/context";
import TaskView from "./Components/TaskView";
import { getFromLocalStorage, saveToLocalStorage } from "./hooks/useReducer";


function App() {
	const [state, dispatch] = useReducer(taskReducer, initialState, () => {
		return getFromLocalStorage();
	});
	useEffect(() => {
		saveToLocalStorage(state);
	}, [state]);
	// const context = { state, dispatch };
	return (
		<TaskContext.Provider value={{ state, dispatch }}>
			<Header />
			<TaskCreate />
			
			<TaskView />
		</TaskContext.Provider>
	);
}

export default App;

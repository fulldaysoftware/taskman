import { useEffect, useReducer } from "react";
import Header from "./Components/Header";
import TaskCreate from "./Components/TaskCreate";
import taskReducer, { initialState } from "./state/state";
import TaskContext, { CatContext } from "./state/context";
import TaskView from "./Components/TaskView";
import { getFromLocalStorage, saveToLocalStorage } from "./hooks/useReducer";
import catagoryReducer, {
	catInitialState,
	getCatFromLocal,
} from "./state/catagory";

function App() {
	const [catState, catDispatch] = useReducer(
		catagoryReducer,
		catInitialState,
		() => {
			return getCatFromLocal();
		}
	);
	const [state, dispatch] = useReducer(taskReducer, initialState, () => {
		return getFromLocalStorage();
	});
	useEffect(() => {
		saveToLocalStorage(state);
	}, [state]);
	// const context = { state, dispatch };
	return (
		<TaskContext.Provider value={{ state, dispatch }}>
			<CatContext.Provider value={{ catState, catDispatch }}>
				<Header />
				<TaskCreate />
				<TaskView />
			</CatContext.Provider>
		</TaskContext.Provider>
	);
}

export default App;

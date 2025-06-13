import {
	useContext,
	useEffect,
	useReducer,
	useState,
	type ReactNode,
	type SyntheticEvent,
} from "react";
import type { task } from "../types/TaskTypes";
import useReducerHook from "../hooks/useReducer";
import TaskContext from "../state/context";
import { initialState } from "../state/state";
import EditTask from "./EditTask";

const SingleList: React.FC<task> = (task): ReactNode => {
	const [diag, setDiag] = useState<boolean>(false);
	const toggleDiag = () => {
		setDiag((prv) => {
			return !prv;
		});
	};
	let { priority, name, start, end, id, isDone } = task;
	const [status, setStatus] = useState("Pending");
	let context = useContext(TaskContext);
	const checker = () => {
		if (context !== null) {
			let { dispatch } = context;
			return dispatch;
		} else {
			throw Error;
		}
	};
	useEffect(() => {
		setStatus(() => {
			if (isDone) {
				return "Done";
			} else {
				return "Pending";
			}
		});
	}, [isDone]);

	let profiler = () => {
		switch (priority) {
			case "Low":
				return "bg-lime-300 hover:shadow-lime-300/25";
			case "Medium":
				return "bg-green-500 hover:shadow-green-500/25";
			case "High":
				return "bg-amber-500 hover:shadow-amber-500/25";
			case "Critical":
				return "bg-red-500 hover:shadow-red-500/25";
			default:
				return "bg-teal-500 hover:shadow-teal-500/25";
		}
	};
	let style = `w-[90%] shadow-xl font-medium text-teal-950 rounded-md flex px-2 my-4 py-2 mx-auto ${profiler()}`;
	return (
		<>
			<EditTask editTask={task} open={diag} func={toggleDiag} />
			<div draggable className={style}>
				<span className="w-[40%]">{name}</span>
				<span className="w-[15%]">{start}</span>
				<span className="w-[15%]">{end}</span>
				<span className="w-[15%]">{status}</span>
				<span className="w-[15%]">
					<div className="flex w-full justify-evenly">
						<button
							onClick={(e: SyntheticEvent) => {
								let dispatch = checker();
								dispatch({ type: "complete_task", payload: id });
							}}
							className="bg-white text-green-500 text-sm px-1 py-1 rounded hover:cursor-pointer">
							Done
						</button>
						<button
							onClick={() => {
								setDiag(true);
							}}
							className="bg-white text-amber-500 text-sm px-2 py-1 rounded hover:cursor-pointer">
							Edit
						</button>
						<button
							onClick={() => {
								let dispatch = checker();
								dispatch({ type: "delete_task", payload: id });
							}}
							className="bg-white text-sm text-red-500 px-1 py-1 rounded hover:cursor-pointer">
							Delete
						</button>
					</div>
				</span>
			</div>
		</>
	);
};

export default SingleList;

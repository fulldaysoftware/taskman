import { useContext, type ReactNode } from "react";
import TaskContext from "../state/context";
import { initialState } from "../state/state";
import SingleList from "./List";
import type { task } from "../types/TaskTypes";

const TaskView: React.FC = (): ReactNode => {
	let context = useContext(TaskContext);
	const checker = () => {
		if (context !== null) {
			let { state } = context;
			return state;
		} else {
			return initialState;
		}
	};
	const state = checker();
	return (
		<div className="w-full px-2 py-2">
			<div className="px-2 py-2"></div>
			<div>
				<ul>
					{state.length > 0 ? (
						state.map((tsk: task) => {
							return (
								<li key={tsk.id}>
									<SingleList {...tsk} />
								</li>
							);
						})
					) : (
						<p className="text-2xl text-teal-950 text-center font-medium">
							No Tasks Yet.
						</p>
					)}
				</ul>
			</div>
		</div>
	);
};

export default TaskView;

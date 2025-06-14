import React, { useContext, useEffect, useState, type ReactNode } from "react";
import TaskContext, { CatContext } from "../state/context";
import { initialState } from "../state/state";
import SingleList from "./List";
import type { state, task } from "../types/TaskTypes";
import { catInitialState } from "../state/catagory";

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
	const [disp, setDisp] = useState<state>(state);
	let catContext = useContext(CatContext);
	let catList = () => {
		if (catContext !== null) {
			let { catState } = catContext;
			return catState;
		} else {
			return catInitialState;
		}
	};
	const [filt, setFilt] = useState("all");
	useEffect(() => {
		setDisp(() => {
			if (filt === "all") {
				return state;
			} else {
				return state.filter((st) => filt === st.groupId);
			}
		});
	}, [filt]);
	return (
		<div>
			<div className="w-[85%] mx-auto">
				<p className="text-md font-semibold p-2">
					Choose Catagory
					<select
						onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
							setFilt(e.target.value);
						}}
						className="mx-2 focus: outline-none w-[30%]">
						{catList().map((cat) => {
							return (
								<option key={cat.id} value={cat.id}>
									{cat.catName}
								</option>
							);
						})}
					</select>
				</p>
			</div>
			<div className="w-full px-2">
				<div className="px-2 py-2"></div>
				<div>
					<ul>
						{disp.length > 0 ? (
							disp.map((tsk: task) => {
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
		</div>
	);
};

export default TaskView;

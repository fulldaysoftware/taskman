import React, {
	useState,
	type FormEvent,
	type ReactNode,
	type SyntheticEvent,
} from "react";
import type { task } from "../types/TaskTypes";

const TaskCreate: React.FC = (): ReactNode => {
	let init: task = {
		name: "",
		end: "",
		start: "",
		isDone: false,
		id: "",
		priority: "Backlog",
		description: "",
	};

	const [task, setTask] = useState<task>(init);
	const [diag, setDiag] = useState<boolean>(false);
	const diagHandler = () => {
		setDiag((prv) => !prv);
	};
	const fieldHandler = (
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>
			| React.ChangeEvent<HTMLSelectElement>,
		name: string
	) => {
		if (name === "name") {
			console.log(e.target.value);
			setTask((prv) => {
				return { ...prv, name: e.target.value };
			});
		}
		if (name === "start") {
			console.log(e.target.value);
			setTask((prv) => {
				return { ...prv, start: e.target.value };
			});
		}
		if (name === "end") {
			console.log(e.target.value);
			setTask((prv) => {
				return { ...prv, end: e.target.value };
			});
		}
		if (name === "desc") {
			console.log(e.target.value);
			setTask((prv) => {
				return { ...prv, description: e.target.value };
			});
		}
		if (name === "priority") {
			console.log(e.target.value);
			setTask((prv) => {
				return {
					...prv,
					priority: e.target.value,
				};
			});
		}
	};

	return (
		<div className="w-full justify-end flex px-8 py-2">
			{!diag && (
				<button
					onClick={diagHandler}
					className="justify-self-end bg-teal-600 font-medium p-2 m-2 rounded-md text-white hover:cursor-pointer hover:bg-teal-900">
					Add task
				</button>
			)}
			<dialog className="bg-teal-50 w-[40%] mx-auto shadow-lg" open={diag}>
				<div>
					<p className="font-medium text-teal-950 text-center">
						Create your Task
					</p>
					<div className="p-2">
						<form>
							<input
								className="w-full my-2 font-medium text-teal-950 border-b-1 focus:border-b-2 focus:outline-none"
								type="text"
								name="name"
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									fieldHandler(e, "name");
								}}
								value={task.name}
								placeholder="What is the Task name?"
								id="name"
							/>
							<div className="w-full flex justify-evenly">
								<div className="w-[30%]">
									<p className="text-center">
										<label
											htmlFor="start"
											className="text-teal-950 font-medium">
											Start Date
										</label>
									</p>
									<input
										className="font-medium text-teal-950 border-b-1 focus:border-b-2 focus:outline-none"
										type="date"
										name="start"
										onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
											fieldHandler(e, "start");
										}}
										value={task.start}
										id="start"
									/>
								</div>
								<div className="w-[30%]">
									<p className="text-center">
										<label htmlFor="end" className="text-teal-950 font-medium">
											End Date
										</label>
									</p>
									<input
										className="font-medium text-teal-950 border-b-1 focus:border-b-2 focus:outline-none"
										type="date"
										name="end"
										onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
											fieldHandler(e, "end");
										}}
										value={task.end}
										id="end"
									/>
								</div>
								<div className="w-[30%]">
									<p className="text-center">
										<label htmlFor="prio" className="text-teal-950 font-medium">
											Priority
										</label>
									</p>
									<select
										className="w-full bg-teal-50 font-medium text-teal-950 border-b-1 focus:border-b-2 focus:outline-none"
										name="priority"
										onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
											fieldHandler(e, "priority");
										}}
										id="prio">
										<option selected value={"Backlog"}>
											Backlog
										</option>
										<option value={"Low"}>Low</option>
										<option value={"Medium"}>Medium</option>
										<option value={"High"}>High</option>
										<option value={"Critical"}>Critical</option>
									</select>
								</div>
							</div>
							<div>
								<textarea
									className="mt-2 text-teal-950 w-full focus:outline-none border-b-1"
									name="Description"
									placeholder="Any Notes ..."
									id="desc"
									onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
										fieldHandler(e, "desc");
									}}
									value={task.description}
									cols={30}
									rows={5}></textarea>
							</div>
						</form>
					</div>
				</div>
				<div className="w-full flex justify-end">
					<button
						onClick={diagHandler}
						className="bg-teal-50 border-2 font-medium p-2 m-2 rounded-md text-teal-950 hover:cursor-pointer hover:bg-teal-100">
						Close
					</button>
					<button
						onClick={diagHandler}
						className="bg-teal-600 font-medium p-2 m-2 rounded-md text-white hover:cursor-pointer hover:bg-teal-900">
						Create
					</button>
				</div>
			</dialog>
		</div>
	);
};

export default TaskCreate;

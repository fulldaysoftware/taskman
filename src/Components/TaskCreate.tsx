import React, {
	useContext,
	useRef,
	useState,
	type FormEvent,
	type ReactNode,
	type SyntheticEvent,
} from "react";
import { v4 } from "uuid";
import type { catDetail, task } from "../types/TaskTypes";
import TaskContext, { CatContext } from "../state/context";
import { catInitialState } from "../state/catagory";

const TaskCreate: React.FC = (): ReactNode => {
	const xcat = useRef(null);
	let catContext2 = useContext(CatContext);
	let init: task = {
		name: "",
		end: "",
		start: "",
		isDone: false,
		id: "",
		groupId: "123456789",
		priority: "Backlog",
		description: "",
	};

	let catList = () => {
		if (catContext2 !== null) {
			let { catState } = catContext2;
			return catState;
		} else {
			return catInitialState;
		}
	};
	let initCat: catDetail = { catName: "", id: "" };
	const context = useContext(TaskContext);
	const [task, setTask] = useState<task>(init);
	const [diag, setDiag] = useState<boolean>(false);
	const [cat, setCat] = useState<boolean>(false);
	const [catDetails, setcatDetails] = useState<catDetail>(initCat);
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
			setTask((prv) => {
				return { ...prv, name: e.target.value };
			});
		}
		if (name === "start") {
			setTask((prv) => {
				return { ...prv, start: e.target.value };
			});
		}
		if (name === "end") {
			setTask((prv) => {
				return { ...prv, end: e.target.value };
			});
		}
		if (name === "catId") {
			console.log("Val", xcat.current);
			setTask((prv) => {
				return { ...prv, groupId: e.target.value };
			});
		}
		if (name === "desc") {
			setTask((prv) => {
				return { ...prv, description: e.target.value };
			});
		}
		if (name === "priority") {
			setTask((prv) => {
				return {
					...prv,
					priority: e.target.value,
				};
			});
		}
	};
	const handleCreation = () => {
		let newTask = { ...task, id: v4() };
		if (context !== null) {
			const { dispatch } = context;
			dispatch({ type: "create_task", payload: newTask });
			setTask(init);
		}
	};
	let catContext = useContext(CatContext);
	const handleTaskCat = () => {
		let gid = () => {
			if (xcat !== null) {
				return xcat.current;
			} else {
				return "1234567890";
			}
		};
		let newCat = { ...catDetails, id: v4() };
		if (catContext !== null) {
			const { catDispatch } = catContext;
			catDispatch({ type: "create_cat", payload: newCat });
			setCat((prv) => {
				return !prv;
			});
			setcatDetails(initCat);
		}
	};

	return (
		<div className="w-full flex px-8 py-2">
			{!diag && (
				<div className="w-full justify-end flex px-8 py-2">
					<div>
						<button
							onClick={() => {
								setCat((prv) => {
									return !prv;
								});
							}}
							className="justify-self-end bg-teal-600 font-medium p-2 m-2 rounded-md text-white hover:cursor-pointer hover:bg-teal-900">
							Add Catagory
						</button>
						<button
							onClick={diagHandler}
							className="justify-self-end bg-teal-600 font-medium p-2 m-2 rounded-md text-white hover:cursor-pointer hover:bg-teal-900">
							Add task
						</button>
					</div>
				</div>
			)}
			<dialog className="w-full " open={cat}>
				<div className="w-[40%] rounded-md shadow-xl p-4 mx-auto">
					<div className="w-full">
						<p className="text-center text-teal-950 font-bold">Add Catagory</p>
					</div>
					<div className="w-full">
						<form>
							<input
								required
								className="w-full text-md font-medium py-1 my-2 text-teal-900 px-4 border-teal-900 border-b-2 focus:outline-none"
								type="text"
								name="catagory"
								value={catDetails.catName}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									setcatDetails((det) => {
										return { ...det, catName: e.target.value };
									});
								}}
								id="catagory"
								placeholder="Create new Task Catagory"
							/>
						</form>
					</div>
					<div className="flex w-full justify-end">
						<button
							onClick={() => {
								setCat((prv) => {
									return !prv;
								});
							}}
							className="bg-white mx-4 hover:bg-teal-100 font-semibold border-2 border-teal-500 p-2 rounded-md hover:cursor-pointer text-teal-950">
							Cancel
						</button>
						<button
							onClick={handleTaskCat}
							className="bg-teal-500 hover:bg-teal-700 font-semibold p-2 rounded-md hover:cursor-pointer  text-white">
							Create
						</button>
					</div>
				</div>
			</dialog>
			<dialog className="bg-teal-50 w-[40%] mx-auto shadow-2xl" open={diag}>
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
								required
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
										required
										name="start"
										onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
											fieldHandler(e, "start");
										}}
										max={task.start}
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
										required
										min={task.start}
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
										required
										onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
											fieldHandler(e, "priority");
										}}
										id="prio">
										<option defaultValue={"Backlog"}>Backlog</option>
										<option value={"Low"}>Low</option>
										<option value={"Medium"}>Medium</option>
										<option value={"High"}>High</option>
										<option value={"Critical"}>Critical</option>
									</select>
								</div>
							</div>
							<div>
								<p className="my-2">
									<label className="text-teal-950 font-medium">
										What is the catagory
									</label>
								</p>
								<select
									ref={xcat}
									onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
										fieldHandler(e, "catId");
									}}
									className="w-full bg-teal-50 font-medium text-teal-950 border-b-1 focus:border-b-2 focus:outline-none">
									{catList().map((cat) => {
										if (cat.catName !== "All Tasks") {
											return (
												<option
													selected={cat.catName === "Default" && true}
													key={cat.id}
													value={cat.id}>
													{cat.catName}
												</option>
											);
										}
									})}
								</select>
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
						onClick={handleCreation}
						className="bg-teal-600 font-medium p-2 m-2 rounded-md text-white hover:cursor-pointer hover:bg-teal-900">
						Create
					</button>
				</div>
			</dialog>
		</div>
	);
};

export default TaskCreate;

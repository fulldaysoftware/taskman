import { createContext } from "react";
import { initialState } from "./state";
import type { contextType } from "../types/TaskTypes";

const TaskContext = createContext<contextType | null>(null);
export default TaskContext;

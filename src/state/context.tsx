import { createContext } from "react";
import { initialState } from "./state";
import type { CatContextType, contextType } from "../types/TaskTypes";

const TaskContext = createContext<contextType | null>(null);
export default TaskContext;

export const CatContext = createContext<CatContextType | null>(null);

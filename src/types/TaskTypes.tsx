import type React from "react";

export interface task {
	name: string;
	description?: string;
	start: string;
	end: string;
	id: string;
	priority: "Backlog" | "Low" | "Medium" | "High" | "Critical" | string;
	isDone: boolean;
}

export type actions =
	| { type: "create_task"; payload: task }
	| { type: "edit_task"; payload: task }
	| { type: "delete_task"; payload: string }
	| { type: "complete_task"; payload: string };
export type state = task[];

export type contextType = {
	state: state;
	dispatch: React.Dispatch<actions>;
};

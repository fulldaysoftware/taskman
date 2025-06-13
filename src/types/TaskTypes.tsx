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

export interface catDetail {
	catName: string;
	id: string;
}

export type catagorylist = catDetail[];
export type catactions =
	| { type: "create_cat"; payload: catDetail }
	| { type: "edit_cat"; payload: catDetail }
	| { type: "delete_cat"; payload: string };

export type CatDispatch = React.Dispatch<catactions>;
export type CatContextType = {
	catState: catagorylist;
	catDispatch: CatDispatch;
};

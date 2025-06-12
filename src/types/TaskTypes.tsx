export interface task {
	name: string;
	description?: string;
	start: string;
	end: string;
	id: string;
	priority: "Backlog" | "Low" | "Medium" | "High" | "Critical" | string;
	isDone: boolean;
}

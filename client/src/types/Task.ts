export type Task = {
	id: string;
	themeId: string;

	text: string;
	difficulty: string;
};

export type TaskEditModel = {
	id: string;
	text: string;
	difficulty?: string;
};

export type TaskAddModel = {
	themeId: string;
	text: string;
	difficulty?: string;
};
